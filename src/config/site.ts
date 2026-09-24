/**
 * Millenium Tech — single source of truth for company details.
 *
 * Everything the website shows about the company (phone numbers, email,
 * hours, statistics, social links) lives here, so updating a detail means
 * changing ONE place.
 *
 * Items marked "CONFIRM" came from the owner's own materials (the MilleBot
 * prompt and the company flyer) and should be double-checked before launch.
 */

const env = import.meta.env

export const site = {
  name: 'Millenium Tech',
  tagline: 'IT Solutions Point',
  url: (env.VITE_SITE_URL as string | undefined) || 'https://millenium-tech-ucqa.vercel.app',
  description:
    'Millenium Tech builds websites, digital brands and practical technology solutions for businesses in Tanzania — plus computer repair, laptop sales, photo editing and online services.',
  founded: 2022,

  location: {
    city: 'Dar es Salaam',
    country: 'Tanzania',
    countryCode: 'TZ'
  },

  /** Phone numbers shown on the site (first one is the primary call number). */
  phones: [
    { display: '+255 755 794 664', tel: '+255755794664' },
    { display: '+255 616 533 644', tel: '+255616533644' }
  ],

  /**
   * WhatsApp number, digits only, with country code.
   * CONFIRM: the current site and MilleBot use 255755794664, but the company
   * flyer shows the WhatsApp icon next to +255 616 533 644. Change this one
   * value if the other number is the right one.
   */
  whatsapp: {
    number: '255755794664',
    display: '+255 755 794 664'
  },

  email: 'milleniumtech572@gmail.com',

  /** CONFIRM: taken from the MilleBot prompt. */
  hours: 'Sunday – Friday, 8:00am – 6:00pm',
  replyPromise: 'We aim to reply within 24 hours.',

  /**
   * Formspree form ID. The endpoint is public by design (it is not a secret),
   * so it is safe in frontend code. Override with VITE_FORMSPREE_ID if needed.
   * Notification emails are configured in the Formspree dashboard.
   */
  formspreeId: (env.VITE_FORMSPREE_ID as string | undefined) || 'xkokypwg',

  /**
   * Social profiles. Leave a value empty ('') until the real account exists —
   * empty entries are simply not shown (no broken or fake links).
   */
  social: {
    facebook: '',
    instagram: '',
    tiktok: '',
    threads: ''
  },

  /**
   * Company numbers. CONFIRM: these come from the MilleBot prompt
   * ("3+ years · 50+ projects · 30+ clients · 6 services").
   * Set `show` to false to hide the whole proof strip until verified.
   */
  stats: {
    show: true,
    items: [
      { value: '2022', label: 'Founded in Tanzania' },
      { value: '50+', label: 'Projects delivered' },
      { value: '30+', label: 'Clients served' },
      { value: '6', label: 'Core services' }
    ]
  },

  /**
   * Chatbot (MilleBot) is only shown when its backend URL is configured
   * (VITE_API_BASE_URL) or while developing locally — so visitors never
   * see a chat button that cannot answer.
   */
  chatbotEnabled: Boolean(env.VITE_API_BASE_URL) || Boolean(env.DEV)
} as const

export type SocialKey = keyof typeof site.social

/** Build a WhatsApp link with an optional prefilled message. */
export function waLink(message = 'Hello Millenium Tech, I would like to discuss a project.'): string {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`
}

export const mailtoLink = (subject = 'Enquiry from the Millenium Tech website') =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}`

export const telLink = (tel: string) => `tel:${tel}`

export const absoluteUrl = (path = '/') => `${site.url.replace(/\/$/, '')}${path === '/' ? '/' : path}`
