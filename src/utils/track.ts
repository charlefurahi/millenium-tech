/**
 * Privacy-conscious conversion tracking.
 *
 * No analytics script is loaded by default. If you later add a privacy-friendly
 * tool (Plausible, Google Analytics, …) its global function is picked up here
 * automatically, so the same events start flowing with no code changes.
 *
 * Tracked events (via data-track attributes, plus the form):
 *   whatsapp_click · call_click · email_click · cta_click · project_click · form_submit
 */

type Params = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Params }) => void
    gtag?: (command: string, event: string, params?: Params) => void
    dataLayer?: Array<Record<string, unknown>>
  }
}

export function track(event: string, params: Params = {}) {
  try {
    window.plausible?.(event, { props: params })
    window.gtag?.('event', event, params)
    window.dataLayer?.push({ event, ...params })
    if (import.meta.env.DEV) console.debug('[track]', event, params)
  } catch {
    /* analytics must never break the site */
  }
}

/** One delegated listener: any element with data-track="event_name" is tracked. */
export function initClickTracking() {
  document.addEventListener('click', (e) => {
    const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-track]')
    if (!el) return
    track(el.dataset.track as string, {
      label: el.dataset.trackLabel,
      page: window.location.pathname
    })
  })
}
