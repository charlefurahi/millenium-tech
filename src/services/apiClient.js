import axios from 'axios'

// This client now talks to the Django backend ONLY for the AI chatbot
// (it has to hold the Groq key server-side). Auth and project requests
// go straight to Supabase — see supabaseClient.js, authService.js and
// projectRequestService.js.
//
// Set VITE_API_BASE_URL in your .env for production (e.g.
// https://api.millenium-tech.example/api). Falls back to the local
// Django dev server so `npm run dev` works out of the box.
export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000
})
