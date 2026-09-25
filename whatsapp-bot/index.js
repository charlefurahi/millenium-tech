/**
 * Millenium Tech — WhatsApp auto-reply bot
 * ------------------------------------------
 * Connects to WhatsApp Web via Baileys (no Meta API key needed), and for
 * every inbound customer message, asks the existing Django/Groq backend
 * for a reply (same brain as the website chat widget), then sends that
 * reply back on WhatsApp.
 *
 * Runs as a long-lived Node process. See README.md for the exact commands
 * (Windows start.bat, or pm2 on a server).
 *
 * What changed in this version (behaviour of the AI reply is unchanged):
 *  - ignores WhatsApp Status updates / broadcast lists / channels (it used to
 *    be able to answer people's status posts);
 *  - optional phone-number pairing code instead of a QR (WA_PAIRING_NUMBER),
 *    handy on a remote server where you can't scan a QR;
 *  - reconnects with a back-off instead of hammering WhatsApp, and stops
 *    cleanly if the number is logged out or the session is replaced;
 *  - one message at a time per customer, and a per-customer rate limit so one
 *    person can't burn the Groq quota;
 *  - one automatic retry when the Django backend is briefly unreachable;
 *  - marks messages as read.
 */

require('dotenv').config()

const fs = require('fs')
const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion
} = require('@whiskeysockets/baileys')
const { Boom } = require('@hapi/boom')
const qrcode = require('qrcode-terminal')
const axios = require('axios')
const pino = require('pino')

const AUTH_DIR = './auth_info'

const DJANGO_API_URL =
  process.env.DJANGO_API_URL || 'http://127.0.0.1:8000/api/whatsapp/message/'

const BOT_TOKEN = process.env.BOT_TOKEN || ''

const ONLY_PRIVATE_CHATS =
  (process.env.ONLY_PRIVATE_CHATS || 'true').toLowerCase() !== 'false'

// Digits only, with country code, no "+"  e.g. 255755794664
const PAIRING_NUMBER = (process.env.WA_PAIRING_NUMBER || '').replace(/\D/g, '')

const AUTO_RESET_ON_LOGOUT =
  (process.env.AUTO_RESET_ON_LOGOUT || 'true').toLowerCase() !== 'false'

const MAX_MSGS_PER_MINUTE = parseInt(process.env.MAX_MSGS_PER_MINUTE || '12', 10)

const FALLBACK_REPLY =
  "Sorry, I'm having a technical issue right now. Please try again in a " +
  'moment, or reach the team directly at +255 755 794 664.'

if (!BOT_TOKEN) {
  console.warn(
    '[warn] BOT_TOKEN is empty — the Django webhook will accept the request ' +
      'anyway if WHATSAPP_BOT_TOKEN is also unset on that side, but it is ' +
      'safer to set matching tokens on both sides. See .env.example.'
  )
}

process.on('unhandledRejection', (err) => {
  console.error('Unhandled promise rejection:', err && err.message ? err.message : err)
})

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/**
 * Ask the Django backend for an AI reply to this customer message.
 * `from` is the bare phone number (no @s.whatsapp.net suffix).
 * Retries once if the backend is briefly unreachable / returns a 5xx.
 */
async function askDjango(from, message) {
  const call = () =>
    axios.post(
      DJANGO_API_URL,
      { from, message },
      {
        headers: BOT_TOKEN ? { 'X-Bot-Token': BOT_TOKEN } : {},
        timeout: 30000
      }
    )

  try {
    const response = await call()
    return response.data.reply
  } catch (err) {
    const status = err.response && err.response.status
    const retryable = !status || status >= 500
    if (!retryable) throw err
    await sleep(1500)
    const response = await call()
    return response.data.reply
  }
}

function extractText(message) {
  if (!message) return ''
  return (
    message.conversation ||
    message.extendedTextMessage?.text ||
    message.imageMessage?.caption ||
    message.videoMessage?.caption ||
    ''
  )
}

/** Status posts, broadcast lists and channels are not customer chats. */
function isIgnoredJid(jid) {
  return (
    jid === 'status@broadcast' ||
    jid.endsWith('@broadcast') ||
    jid.endsWith('@newsletter')
  )
}

// ---- per-customer rate limit + serial queue -------------------------------
const hits = new Map() // phone -> [timestamps]
function overLimit(phone) {
  const now = Date.now()
  const recent = (hits.get(phone) || []).filter((t) => now - t < 60000)
  recent.push(now)
  hits.set(phone, recent)
  return recent.length > MAX_MSGS_PER_MINUTE
}

const queues = new Map() // phone -> promise chain
function enqueue(phone, task) {
  const prev = queues.get(phone) || Promise.resolve()
  const next = prev.then(task, task).finally(() => {
    if (queues.get(phone) === next) queues.delete(phone)
  })
  queues.set(phone, next)
  return next
}

// ---- connection lifecycle --------------------------------------------------
let attempts = 0
let pairingRequested = false

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR)
  const { version } = await fetchLatestBaileysVersion()

  const sock = makeWASocket({
    version,
    auth: state,
    logger: pino({ level: 'silent' }),
    printQRInTerminal: false
  })

  sock.ev.on('creds.update', saveCreds)

  // Optional: link with a pairing code instead of scanning a QR.
  if (PAIRING_NUMBER && !sock.authState.creds.registered && !pairingRequested) {
    pairingRequested = true
    setTimeout(async () => {
      try {
        const code = await sock.requestPairingCode(PAIRING_NUMBER)
        console.log(
          '\nPairing code: ' + code + '\n' +
            'On the phone: WhatsApp > Settings > Linked Devices > Link a device >\n' +
            '"Link with phone number instead" and type this code.\n'
        )
      } catch (err) {
        pairingRequested = false
        console.error('Could not request a pairing code:', err.message)
      }
    }, 3000)
  }

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update

    if (qr && !PAIRING_NUMBER) {
      console.log(
        '\nScan this QR code from WhatsApp on your phone:\n' +
          'Settings > Linked Devices > Link a device\n'
      )
      qrcode.generate(qr, { small: true })
    }

    if (connection === 'close') {
      const statusCode =
        lastDisconnect?.error instanceof Boom
          ? lastDisconnect.error.output?.statusCode
          : undefined

      if (statusCode === DisconnectReason.loggedOut) {
        console.log('Logged out from WhatsApp (the linked device was removed on the phone).')
        if (AUTO_RESET_ON_LOGOUT) {
          fs.rmSync(AUTH_DIR, { recursive: true, force: true })
          console.log('Old session cleared. Start the bot again to link a new one.')
        } else {
          console.log('Delete the auth_info folder and run again to link a new session.')
        }
        process.exit(1)
      }

      if (statusCode === DisconnectReason.connectionReplaced) {
        console.log(
          'This WhatsApp session was opened somewhere else (connection replaced). ' +
            'Not reconnecting, to avoid two bots fighting over one number.'
        )
        process.exit(0)
      }

      // 515 = "restart required" right after pairing: reconnect immediately.
      const delay =
        statusCode === DisconnectReason.restartRequired
          ? 0
          : Math.min(30000, 2000 * 2 ** attempts)
      attempts += 1
      console.log(`Connection closed (code ${statusCode ?? 'n/a'}), reconnecting in ${Math.round(delay / 1000)}s...`)
      setTimeout(() => startBot().catch((e) => console.error('Reconnect failed:', e.message)), delay)
    } else if (connection === 'open') {
      attempts = 0
      console.log('Connected. MilleBot is live on WhatsApp.')
    }
  })

  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return

    for (const msg of messages) {
      const jid = msg?.key?.remoteJid

      try {
        if (!msg.message || msg.key.fromMe || !jid) continue
        if (isIgnoredJid(jid)) continue

        const isGroup = jid.endsWith('@g.us')
        if (isGroup && ONLY_PRIVATE_CHATS) continue

        const text = extractText(msg.message).trim()
        if (!text) continue

        // Newer WhatsApp may address people by an opaque "@lid" id; prefer the
        // real phone-number JID when Baileys provides one.
        const phone = String(msg.key.senderPn || msg.key.remoteJidAlt || jid).split('@')[0]

        if (overLimit(phone)) {
          console.warn(`[rate-limit] ignoring a burst of messages from ${phone}`)
          continue
        }

        enqueue(phone, async () => {
          try {
            sock.readMessages([msg.key]).catch(() => {})
            await sock.sendPresenceUpdate('composing', jid)
            const reply = await askDjango(phone, text)
            await sock.sendMessage(jid, { text: reply })
          } catch (err) {
            console.error('Failed to handle a message:', err.message)
            try {
              await sock.sendMessage(jid, { text: FALLBACK_REPLY })
            } catch (_) {
              /* nothing more we can do */
            }
          }
        })
      } catch (err) {
        console.error('Failed to read a message:', err.message)
      }
    }
  })
}

startBot().catch((err) => {
  console.error('Fatal error starting the bot:', err)
  process.exit(1)
})