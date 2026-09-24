# Millenium Tech — Website

A rebuilt, modern marketing website for Millenium Tech (Vue 3 + Vite + TypeScript), plus the
existing Django backend for the MilleBot chat assistant.

## What this build includes

- **Full information architecture**: Home, About, Services (overview + one detail page per
  service), Solutions (business systems), Portfolio + case studies, Packages & Pricing, Contact,
  Privacy policy, and a helpful 404 page.
- **A real design system** — one set of colours, type, spacing and components shared across every
  page (`src/styles`, `src/components/ui`) instead of page-by-page one-off styling.
- **Contact form wired to Formspree** (`src/components/LeadForm.vue`), form ID `xkokypwg`,
  submitting with `FormData` per Formspree's documented AJAX method (this avoids a CORS-preflight
  failure that a JSON `Content-Type` header can trigger on some Formspree setups). Configure the
  notification email inside the Formspree dashboard for the form itself.
- **MilleBot chat widget** (`src/components/Chatbot`) — unchanged backend contract. The widget
  only renders when `VITE_API_BASE_URL` is set (or in local `npm run dev`), so visitors never see
  a chat button that can't actually respond.
- **Real photography and artwork only** — every product photo was cropped/optimised from the
  assets you provided; the one weak stock screenshot (the old "Online Services" image, which had
  phone UI chrome baked into it) was replaced with an original brand-styled illustration
  (`src/assets/img/svc-online.svg`).
- **SEO basics**: per-page `<title>`/description via `src/utils/seo.ts`, Open Graph + Twitter
  card image (`public/og-image.jpg`), `sitemap.xml`, `robots.txt`, favicons.
- **Accessibility**: semantic landmarks, skip link, visible focus states, labelled form fields,
  reduced-motion support. Scanned with axe-core (WCAG2 A/AA) with zero violations across the main
  pages.
- **No invented facts.** Real testimonials, verified client names/results and approved prices are
  intentionally left out until you provide them — see "Before you launch" below.

## Recent changes in this package

- **Removed 4 fragile npm dependencies** (`@fontsource-variable/manrope`, `@fontsource-variable/dm-sans`,
  `@lucide/vue`, `simple-icons`) after they failed to resolve on a Windows machine despite a
  successful `npm install`/`npm ci`. The exact font files and icon artwork are now self-hosted
  inside the repo (`src/assets/fonts`, `src/components/ui/icons.ts`) with zero runtime dependency
  on those packages — this removes an entire class of "works on my machine" install failures.
  The project now depends on only `vue`, `vue-router` and `axios`.
- **Founder's photo now appears on the About page only**, captioned "Founder, Millenium Tech" (no
  name was invented — add one in `AboutView.vue` if you'd like it credited by name). The homepage
  hero no longer uses a personal photo.
- **New homepage hero visual**: an original browser + phone "device showcase" illustration (pure
  CSS, no stock photo) showing the site itself in miniature, which keeps the hero authentic and
  on-brand without relying on anyone's portrait.

## Before you launch — please confirm

A few details were carried over from your own materials (the MilleBot prompt / the flyer) and
should be double-checked. They're flagged with `CONFIRM` comments in `src/config/site.ts`:

1. **WhatsApp number** — the site currently uses `+255 755 794 664` everywhere (matches MilleBot
   and the current live site). Your flyer's WhatsApp icon sits next to `+255 616 533 644`. Confirm
   which number should be the WhatsApp one — it's a single value to change in `src/config/site.ts`.
2. **Business hours** — `Sunday – Friday, 8:00am – 6:00pm`, taken from the MilleBot prompt.
3. **Headline numbers** ("50+ projects · 30+ clients · 6 core services") — these come verbatim
   from your own MilleBot system prompt (`backend/ai/openai_client.py`), not invented. Confirm
   they're still accurate, or set `stats.show = false` in `src/config/site.ts` to hide the strip
   until you have verified numbers.
4. **Social links** — Facebook/Instagram/TikTok/Threads are left empty on purpose (no fake/broken
   links). Add real URLs in `src/config/site.ts` → `site.social` and they'll appear in the footer
   automatically.
5. **Portfolio** — currently shows three real, verifiable projects (this website itself, the
   MilleBot assistant, and the promotional flyer). Add real client projects the same way in
   `src/data/projects.ts` as you complete them.
6. **Testimonials** — the section is built and ready but stays hidden (`src/data/content.ts` →
   `testimonials`) until you add real, permissioned quotes.
7. **Production domain** — `sitemap.xml`, `robots.txt` and `VITE_SITE_URL` currently point at
   `https://millenium-tech-ucqa.vercel.app`. Update these once your final domain is confirmed.

## Local setup

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build      # outputs to dist/
npm run preview    # sanity-check the production build locally
```

### Environment variables (frontend)

Create a `.env` (or set these in Vercel's dashboard) if you want to override the defaults in
`src/config/site.ts`:

```
VITE_SITE_URL=https://your-domain.com
VITE_FORMSPREE_ID=xkokypwg
VITE_API_BASE_URL=https://your-backend-domain.com/api   # enables the MilleBot widget
```

If `VITE_API_BASE_URL` is not set in production, the MilleBot chat button is hidden automatically
(the WhatsApp button still always shows).

### Backend (MilleBot)

The Django backend is unchanged and lives in `backend/`. The real `.env` was **not** included in
this package because it previously contained a live Groq API key — copy `backend/.env.example` to
`backend/.env` and fill in your own values:

```bash
cd backend
cp .env.example .env      # then edit .env with real values
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Never commit `backend/.env` — it's already in `.gitignore`.

## Project structure

```
src/
  components/       Shared UI (buttons, cards, forms, nav, footer, chatbot)
  components/ui/    Design-system primitives (Icon, SectionHeader, PageHero, cards…)
  config/site.ts    Single source of truth for contact details, Formspree ID, feature flags
  data/             Content: services, packages, projects, FAQs, about-page copy
  styles/           Design tokens, base reset, shared UI CSS
  utils/            SEO tag updates, click tracking hook, scroll-reveal directive
  views/            One component per route
  router.ts         Routes + per-page SEO metadata
backend/            Existing Django REST + MilleBot (Groq) API — unchanged contract
```

## Analytics (optional)

`src/utils/track.ts` fires events (`whatsapp_click`, `call_click`, `email_click`, `cta_click`,
`project_click`, `form_submit`) to `window.plausible`, `window.gtag` or `window.dataLayer` if any
of those are present. Add your analytics script of choice to `index.html` and these events start
flowing with no code changes needed.
