import axios from 'axios'

// This client now talks to the Django backend ONLY for the AI chatbot
// (it has to hold the Groq key server-side). Auth and project requests
// go straight to Supabase — see supabaseClient.js, authService.js and
// projectRequestService.js.
//
// Set VITE_API_BASE_URL in your .env (and as a Vercel Environment
// Variable) to your deployed backend, e.g.
// https://millenium-tech-api.onrender.com/api. Only falls back to the
// local Django dev server during `npm run dev` — a production build
// (Vercel) with the variable missing gets an empty base instead of
// silently pointing at localhost.
export const API_BASE =
  import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? 'http://localhost:8000/api' : '')

if (!API_BASE && !import.meta.env.DEV) {
  // Loud in the console, but must NOT throw — a throw here would
  // white-screen the whole app.
  console.error(
    '[apiClient] Missing VITE_API_BASE_URL in production.\n' +
      '→ Set it as an Environment Variable on Vercel (Project → Settings\n' +
      '  → Environment Variables) to your deployed backend URL, e.g.\n' +
      '  https://millenium-tech-api.onrender.com/api'
  )
}

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000
})