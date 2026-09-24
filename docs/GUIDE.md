# Millenium Tech — how to work with each section

## Run it
1. Frontend: `npm install` then `npm run dev` (needs `.env` — copy `.env.example`, fill `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_API_BASE_URL`).
2. Backend (chatbot + WhatsApp): in `backend/`, create/activate a venv, `pip install -r requirements.txt`, create `backend/.env` with
   `GROQ_API_KEY=...` and `BOT_TOKEN=...` (same token in `whatsapp-bot/.env`), then `python manage.py migrate` and `python manage.py runserver`.
   Open http://localhost:8000/api/health/ — it must say `"ai_configured": true`.

## Colours & gradients (src/styles)
- `tokens.css` — base colours, spacing, radius.
- `modern.css` — the polish layer. The **"COLOUR SYSTEM v2"** block defines
  `--grad-brand` (vivid blue, for feature bands / home hero / featured cards),
  `--grad-hero-soft` (light sky hero for inner pages), `--grad-section` (alternating section wash).
  Change those three variables and the whole site updates. No very-dark navy is used in heroes or cards.
- Tip: scoped Vue styles (`.x[data-v]`) beat `body .x`. To override one, repeat the class (`.x.x`).

## Pages & components (src)
- `views/` one file per page. `components/ui/` shared cards, hero (`PageHero.vue` = light hero), CTA band.
- Data/text lives in `data/` (services, packages, projects, faqs) and `config/site.ts` (phones, WhatsApp, socials).

## Auth (login / register / forgot / reset / account)
- Pages: `views/LoginView.vue`, `RegisterView.vue`, `ForgotPasswordView.vue`, `ResetPasswordView.vue`, `AccountView.vue`.
- Layout: `components/auth/AuthShell.vue` (no hero/nav/footer — only the copyright line). Styles: `styles/auth.css`.
- Logic: `services/authService.ts` (Supabase), `composables/useAuth.ts`. Routes with `meta.layout: 'auth'` use the standalone layout.
- Supabase dashboard: Authentication → URL Configuration → add your site URL and `/account`, `/reset-password` to Redirect URLs.

## Chatbot (MilleBot)
- UI: `components/Chatbot/Chatbot.vue`; API client: `services/chatbotService.ts`.
- Backend: `backend/ai/openai_client.py` (company facts + system prompt — edit here), `views.py`, `urls.py`.
- Endpoints: `/api/chat/`, `/api/chat/history/`, `/api/whatsapp/message/`, `/api/health/`.
- Shown on the site only when `VITE_API_BASE_URL` is set (or in dev).

## Database (Supabase) — manual, never automatic
- `database/supabase_schema.sql` is run **by hand, once**, in Supabase → SQL Editor. Nothing in `npm run dev`, `npm run build`, Vercel or the `.bat` scripts executes it.
- Vue mounts immediately on page load; the only database/auth call at startup is a non-blocking session check (it gives up waiting after 4 s so pages still render).
- Django tables for the chatbot: run `python manage.py migrate` once by hand in `backend/`.
