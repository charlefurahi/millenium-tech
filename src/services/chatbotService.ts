import axios from 'axios'

// In production the backend URL must be provided with VITE_API_BASE_URL.
// Locally (npm run dev) it falls back to the Django dev server.
const API_BASE: string =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/+$/, '') ||
  (import.meta.env.DEV ? 'http://localhost:8000/api' : '')

/** Error whose message is always safe to show to a visitor. */
export class ChatError extends Error {
  code: string
  constructor(message: string, code = 'unknown') {
    super(message)
    this.name = 'ChatError'
    this.code = code
  }
}

const SESSION_KEY = 'millebot_session'

/** Persistent per-browser session id (letters, digits, _ and - only — the backend validates this). */
export function getSessionId(): string {
  try {
    let id = localStorage.getItem(SESSION_KEY)
    if (!id) {
      id = `sess_${Math.random().toString(36).slice(2, 12)}${Date.now().toString(36)}`
      localStorage.setItem(SESSION_KEY, id)
    }
    return id
  } catch {
    return 'sess_anonymous'
  }
}

export function resetSession() {
  try {
    localStorage.removeItem(SESSION_KEY)
  } catch {
    /* storage unavailable — nothing to reset */
  }
}

const client = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 35000
})

export async function sendMessage(message: string, signal?: AbortSignal): Promise<string> {
  if (!API_BASE) {
    throw new ChatError('MilleBot is not connected yet.', 'not_configured')
  }
  try {
    const { data } = await client.post('/chat/', { message, session_id: getSessionId() }, { signal })
    const reply = typeof data?.response === 'string' ? data.response.trim() : ''
    if (!reply) throw new ChatError('MilleBot sent an empty reply. Please try again.', 'empty')
    return reply
  } catch (err) {
    if (err instanceof ChatError) throw err
    if (axios.isCancel(err)) throw new ChatError('Request cancelled.', 'cancelled')
    if (axios.isAxiosError(err)) {
      if (!err.response) {
        const timedOut = err.code === 'ECONNABORTED'
        throw new ChatError(
          timedOut
            ? 'That took too long. Please try again.'
            : 'I can’t reach the server right now. Check your connection and try again.',
          timedOut ? 'timeout' : 'network'
        )
      }
      if (err.response.status === 429) {
        throw new ChatError('You’re sending messages quickly. Please wait a few seconds and try again.', 'rate_limited')
      }
      const serverMessage = err.response.data?.error
      throw new ChatError(
        typeof serverMessage === 'string' ? serverMessage : 'Something went wrong on our side. Please try again.',
        err.response.data?.code || 'server'
      )
    }
    throw new ChatError('Something went wrong. Please try again.')
  }
}
