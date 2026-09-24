/**
 * Packages.
 *
 * Prices are intentionally NOT invented. To publish an approved price, set
 * `price` on a package, e.g.:
 *
 *   price: { amount: 500000, prefix: 'From', note: 'One-time project' }
 *
 * While `price` is null the card shows "Quotation on request".
 */

export interface Package {
  id: string
  name: string
  audience: string
  billing: 'One-time project' | 'Project + support' | 'Custom quotation'
  featured?: boolean
  price: null | { amount: number; prefix?: string; note?: string }
  includes: string[]
  cta: string
  formValue: string
}

export const packages: Package[] = [
  {
    id: 'starter',
    name: 'Starter',
    audience: 'For small businesses taking their first confident step online.',
    billing: 'One-time project',
    price: null,
    includes: [
      'Professional business website',
      'Mobile-responsive design',
      'WhatsApp & contact integration',
      'Lead / enquiry form',
      'Basic search-friendly structure'
    ],
    cta: 'Ask about Starter',
    formValue: 'Website development'
  },
  {
    id: 'growth',
    name: 'Growth',
    audience: 'For businesses that want a stronger, more consistent digital presence.',
    billing: 'Project + support',
    featured: true,
    price: null,
    includes: [
      'Everything in Starter',
      'Brand & social-media design support',
      'Search-friendly improvements',
      'Website updates after launch',
      'Ongoing support options'
    ],
    cta: 'Ask about Growth',
    formValue: 'Website development'
  },
  {
    id: 'business',
    name: 'Business',
    audience: 'For organisations that need a custom system, web app or integrations.',
    billing: 'Custom quotation',
    price: null,
    includes: [
      'Discovery and solution planning',
      'Custom systems or web applications',
      'Database functionality',
      'Integrations & automation',
      'Maintenance and support planning'
    ],
    cta: 'Request a quotation',
    formValue: 'Business systems / custom software'
  }
]

/** What affects the price of a custom project. */
export const priceFactors = [
  { icon: 'layers', title: 'Scope', text: 'What needs to be built, and how big it is.' },
  { icon: 'file-text', title: 'Number of pages', text: 'More pages and content types mean more design and build work.' },
  { icon: 'zap', title: 'Features', text: 'Forms, ordering, dashboards, user accounts and other functionality.' },
  { icon: 'workflow', title: 'Integrations', text: 'Connecting payments, messaging or other tools you already use.' },
  { icon: 'image', title: 'Content', text: 'Whether we write text and prepare images, or you supply them.' },
  { icon: 'lifebuoy', title: 'Maintenance', text: 'How much support and updating you want after launch.' },
  { icon: 'clock', title: 'Timeline', text: 'Tighter deadlines can affect scheduling and cost.' }
] as const

export const quoteSteps = [
  { title: 'Send a short brief', text: 'Use the form, WhatsApp or a call to tell us what you need.' },
  { title: 'We ask the right questions', text: 'We clarify scope and give you a clear quotation.' },
  { title: 'Approve and start', text: 'When you are happy with the plan, we begin work.' }
]
