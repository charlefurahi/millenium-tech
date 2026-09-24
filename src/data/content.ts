import type { IconName } from '@/components/ui/icons'

/* -------------------------------------------------------------------------
 * Problems we solve (homepage)
 * ---------------------------------------------------------------------- */
export const problems: { icon: IconName; title: string; text: string; cta: string; to: string }[] = [
  {
    icon: 'search',
    title: 'Your business is hard to find online.',
    text: 'A clear, mobile-friendly website gives customers one reliable place to learn about you and get in touch.',
    cta: 'See website development',
    to: '/services/website-development'
  },
  {
    icon: 'palette',
    title: 'Your brand looks different everywhere.',
    text: 'A consistent logo and design style makes every post, flyer and shopfront look like the same business.',
    cta: 'See design services',
    to: '/services/graphic-design'
  },
  {
    icon: 'monitor-phone',
    title: 'Your website doesn’t bring in enquiries.',
    text: 'Clear pages with an obvious next step — a form, a call or a WhatsApp message — turn visitors into customers.',
    cta: 'Improve your website',
    to: '/services/website-development'
  },
  {
    icon: 'wrench',
    title: 'Your computers keep slowing you down.',
    text: 'Practical repair and support gets your team back to work, and tells you plainly what went wrong.',
    cta: 'Get IT support',
    to: '/services/computer-repair'
  }
]

/* -------------------------------------------------------------------------
 * Why Millenium Tech — only claims the company can stand behind
 * ---------------------------------------------------------------------- */
export const reasons: { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'map-pin',
    title: 'Built for Tanzanian businesses',
    text: 'A young Tanzanian team that combines global best practice with local market knowledge.'
  },
  {
    icon: 'languages',
    title: 'Swahili and English',
    text: 'Talk to us in the language you are most comfortable with.'
  },
  {
    icon: 'smartphone',
    title: 'Mobile-first by default',
    text: 'Your customers are on their phones, so we design for the small screen first.'
  },
  {
    icon: 'handshake',
    title: 'Clear pricing and communication',
    text: 'You get a quotation before work starts, and honest answers about timelines and scope.'
  },
  {
    icon: 'lifebuoy',
    title: 'Support after delivery',
    text: 'We stay available once the work is done, so you always know who to call.'
  }
]

/* -------------------------------------------------------------------------
 * Process — five simple steps
 * ---------------------------------------------------------------------- */
export const process: { icon: IconName; title: string; text: string }[] = [
  { icon: 'compass', title: 'Discover', text: 'We listen to your goals, customers and constraints.' },
  { icon: 'clipboard', title: 'Plan', text: 'We agree the scope, timeline and a clear quotation.' },
  { icon: 'hammer', title: 'Build', text: 'We create the work with review points along the way.' },
  { icon: 'rocket', title: 'Launch', text: 'We prepare the result for its real users and go live.' },
  { icon: 'lifebuoy', title: 'Support', text: 'We stay available for updates and practical help.' }
]

/* -------------------------------------------------------------------------
 * Who we serve
 * ---------------------------------------------------------------------- */
export const audiences: { icon: IconName; title: string; text: string; points: string[] }[] = [
  {
    icon: 'store',
    title: 'Small businesses',
    text: 'Shops, salons, workshops and service providers who want customers to find them and contact them easily.',
    points: ['A simple professional website', 'A consistent look on social media']
  },
  {
    icon: 'sprout',
    title: 'Startups',
    text: 'New ventures that need a brand, a website and a first working product without overspending.',
    points: ['Logo and brand basics', 'A focused launch website or web app']
  },
  {
    icon: 'users',
    title: 'Organisations',
    text: 'Schools, associations and teams that manage people, records or events and want to work more smoothly.',
    points: ['Custom systems and web apps', 'Practical IT support']
  },
  {
    icon: 'building',
    title: 'Established businesses',
    text: 'Companies with an outdated website or manual processes that hold the team back.',
    points: ['Website redesign', 'Process automation and integrations']
  }
]

/* -------------------------------------------------------------------------
 * "Which service do I need?" helper (services page)
 * ---------------------------------------------------------------------- */
export const needsGuide: { need: string; service: string; to: string }[] = [
  { need: 'I want customers to find me online', service: 'Website development', to: '/services/website-development' },
  { need: 'I need a logo, flyers or social-media designs', service: 'Graphic design & branding', to: '/services/graphic-design' },
  { need: 'My computer is slow, damaged or infected', service: 'Computer repair & IT support', to: '/services/computer-repair' },
  { need: 'I want to buy a dependable laptop', service: 'Laptop sales', to: '/services/laptop-sales' },
  { need: 'My photos need retouching or a clean background', service: 'Photo editing', to: '/services/photo-editing' },
  { need: 'I need help with NIDA, a certificate or a job application', service: 'Online services', to: '/services/online-services' },
  { need: 'My team is stuck with spreadsheets and manual work', service: 'Business systems & custom software', to: '/solutions' }
]

/* -------------------------------------------------------------------------
 * About page
 * ---------------------------------------------------------------------- */
export const about = {
  story: [
    'Millenium Tech was founded to bridge Tanzania’s digital gap. Too many local businesses were struggling with outdated websites, inconsistent design and slow computer repairs.',
    'We are a young, Tanzanian team that combines global best practice with local market knowledge — and we keep the technology practical, so it actually helps a business grow.'
  ],
  motto: 'Technology should not be a luxury. Our mission is to make it a tool for every Tanzanian business, big or small.',
  mission:
    'To make technology a practical tool for every Tanzanian business, big or small.',
  values: [
    { icon: 'badge-check', title: 'Quality', text: 'Premium results without premium prices — we give every project our full attention.' },
    { icon: 'handshake', title: 'Integrity', text: 'We are honest about timelines, pricing and what can realistically be delivered.' },
    { icon: 'map-pin', title: 'Local pride', text: 'Built in Tanzania, with a real understanding of the local market.' },
    { icon: 'clock', title: 'Reliability', text: 'We respect deadlines and tell you early if something changes.' },
    { icon: 'lightbulb', title: 'Staying current', text: 'We keep up with new tools and trends, and use them where they genuinely help you.' },
    { icon: 'lifebuoy', title: 'Support', text: 'We stay available after delivery, so you always know who to ask.' }
  ] as { icon: IconName; title: string; text: string }[],
  differences: [
    'One team for websites, design, IT support and online services',
    'Swahili and English support',
    'Mobile-first design as standard',
    'A quotation and clear scope before work starts'
  ],
  /**
   * Team members are shown only when real details are added here.
   * Example:
   * { name: 'Full name', role: 'Founder', photo: importedImage }
   */
  team: [] as { name: string; role: string; photo?: string }[],
  /** Verified milestones only. Add more when you have real dates. */
  timeline: [
    { year: '2022', title: 'Millenium Tech founded', text: 'Started in Tanzania to help local businesses use technology with confidence.' },
    { year: 'Today', title: 'Six core services', text: 'Websites, design, computer repair, photo editing, online services and laptop sales — with business systems for larger needs.' }
  ]
}

/* -------------------------------------------------------------------------
 * Testimonials — leave empty until real quotes and permission exist.
 * The section is hidden automatically while this list is empty.
 * ---------------------------------------------------------------------- */
export const testimonials: { quote: string; name: string; business?: string }[] = []
