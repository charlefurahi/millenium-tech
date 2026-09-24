/**
 * Millenium Tech — WhatsApp auto-reply bot
 * ------------------------------------------
 * Connects to WhatsApp Web via Baileys (no Meta API key needed), and for
 * every inbound customer message, asks the existing Django/Groq backend
 * for a reply (same brain as the website chat widget), then sends that
 * reply back on WhatsApp.
 *
 * Runs as a long-lived Node process on this PC. See README.md for how to
 * keep it running 24/7 (start.bat + Windows Startup folder).
 */

require('dotenv').config()

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

const DJANGO_API_URL =
  process.env.DJANGO_API_URL || 'http://127.0.0.1:8000/api/whatsapp/message/'

const BOT_TOKEN = process.env.BOT_TOKEN || ''

const ONLY_PRIVATE_CHATS =
  (process.env.ONLY_PRIVATE_CHATS || 'true').toLowerCase() !== 'false'

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

/**
 * Ask the Django backend for an AI reply to this customer message.
 * `from` is the bare phone number (no @s.whatsapp.net suffix).
 */
async function askDjango(from, message) {
  const response = await axios.post(
    DJANGO_API_URL,
    { from, message },
    {
      headers: BOT_TOKEN ? { 'X-Bot-Token': BOT_TOKEN } : {},
      timeout: 30000
    }
  )
  return response.data.reply
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

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('./auth_info')
  const { version } = await fetchLatestBaileysVersion()

  const sock = makeWASocket({
    version,
    auth: state,
    logger: pino({ level: 'silent' }),
    printQRInTerminal: false
  })

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update

    if (qr) {
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
      const loggedOut = statusCode === DisconnectReason.loggedOut

      if (loggedOut) {
        console.log(
          'Logged out from WhatsApp. Delete the auth_info folder and run ' +
            'again to link a new session.'
        )
      } else {
        console.log('Connection closed, reconnecting...')
        startBot()
      }
    } else if (connection === 'open') {
      console.log('Connected. MilleBot is live on WhatsApp.')
    }
  })

  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return

    for (const msg of messages) {
      const jid = msg?.key?.remoteJid

      try {
        if (!msg.message || msg.key.fromMe || !jid) continue

        const isGroup = jid.endsWith('@g.us')
        if (isGroup && ONLY_PRIVATE_CHATS) continue

        const text = extractText(msg.message).trim()
        if (!text) continue

        const phone = jid.split('@')[0]

        await sock.sendPresenceUpdate('composing', jid)

        const reply = await askDjango(phone, text)

        await sock.sendMessage(jid, { text: reply })
      } catch (err) {
        console.error('Failed to handle a message:', err.message)

        if (jid) {
          try {
            await sock.sendMessage(jid, { text: FALLBACK_REPLY })
          } catch (_) {
            /* nothing more we can do */
          }
        }
      }
    }
  })
}

startBot().catch((err) => {
  console.error('Fatal error starting the bot:', err)
  process.exit(1)
})