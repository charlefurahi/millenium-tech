# Millenium Tech Website — Updated Build

This package contains the updated Millenium Tech Vue/Vite website and existing Django backend.

## Main updates
- Added Solutions, Pricing/Packages and Website Development routes.
- Added responsive layouts for mobile, tablet, laptop and large desktop.
- Preserved the existing Millenium Tech dark-blue/cyan/gold brand palette and gradients.
- Strengthened light/dark theme support using the existing shared theme system.
- Added reusable SVG `Icon.vue` and replaced remaining decorative emoji/glyph icons.
- Reused the project's existing real imagery for hero/service visuals.
- Improved lead-generation flow, CTA hierarchy and quotation paths.
- Expanded the Contact form with business/organization, preferred contact method and Formspree-friendly email/phone fields.
- Kept Formspree endpoint `https://formspree.io/f/xkokypwg` in the frontend.
- Added robots.txt, sitemap.xml and Open Graph metadata.
- Added responsive/accessibility polish and reduced-motion handling.
- Removed unverified homepage/about numeric statistics from the UI rather than presenting them as verified facts.

## Formspree
The frontend submits to the existing Formspree form endpoint:
`https://formspree.io/f/xkokypwg`

For notifications to arrive at `milleniumtech5722@gmail.com`, the Formspree form's Target Email/notification workflow must be configured to that verified address in the Formspree dashboard. The website itself does not expose any private Formspree credentials.

## Local setup
```bash
npm ci
npm run dev
```
On Windows you can simply run `setup-windows.bat` from cmd. It deletes any old `node_modules`, reinstalls cleanly and starts the dev server.

**Do not zip or copy `node_modules`.** Copying it between folders/machines can corrupt files (e.g. `axios/index.js`) and cause `Could not resolve "./classes/URLSearchParams.js"` errors. Always run `npm ci` in the new location instead.

Production build:
```bash
npm run build
```

The uploaded project's original backend remains included. The real `.env` file was intentionally not packaged because it contained a live Groq API key. Use `backend/.env.example` to create your own local environment file and configure production secrets in the hosting platform.

## Important owner inputs still needed
Per the transformation specification, final approved phone/WhatsApp details, verified project/client information, real testimonials, approved prices, approved location and official social URLs should replace any placeholders before production. The specification explicitly says not to invent these facts.
