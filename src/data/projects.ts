import imgWebsite from '@/assets/img/project-website.webp'
import imgFlyer from '@/assets/img/flyer.webp'
import imgAmalya from '@/assets/img/amalya-rice-packaging.png'
import imgAmalya1 from '@/assets/img/brand.png'
import nyumbaa from '@/assets/img/nyumba.png'
import golani from '@/assets/img/golanii.png'
import mille from '@/assets/img/millebot.png'


/**
 * Portfolio
 *
 * Only real, verified work belongs here.
 *
 * Each project explains:
 * - what the project was
 * - the client
 * - the challenge
 * - what was built/designed
 * - what was delivered
 *
 * Add project images to:
 * src/assets/img/
 */

export type ProjectCategory = 'websites' | 'branding' | 'technology'

export interface Project {
  slug: string
  category: ProjectCategory
  categoryLabel: string
  title: string
  client: string
  industry: string
  summary: string
  challenge: string
  solution: string
  delivered: string[]
  tech?: string[]
  result?: string
  image: string
  imageAlt: string
  href?: { label: string; url: string }
}

export const projectCategories: {
  key: 'all' | ProjectCategory
  label: string
}[] = [
  { key: 'all', label: 'All work' },
  { key: 'websites', label: 'Websites' },
  { key: 'branding', label: 'Branding & design' },
  { key: 'technology', label: 'Business technology' }
]

export const projects: Project[] = [
  /* ================================================================
     MILLENIUM TECH WEBSITE
     ================================================================ */
  {
    slug: 'millenium-tech-website',
    category: 'websites',
    categoryLabel: 'Website',
    title: 'Millenium Tech website',
    client: 'Millenium Tech',
    industry: 'Technology services',

    summary:
      'Our own website, rebuilt to explain the business clearly and turn visitors into enquiries.',

    challenge:
      'The site did not explain our services quickly, offered few ways to get in touch, and showed little real work.',

    solution:
      'We restructured the site around what customers need, added clear service and package pages, a proper enquiry form, WhatsApp shortcuts on every page, and a fast mobile-first design.',

    delivered: [
      'Homepage, services, packages, portfolio and contact pages',
      'Enquiry form with validation and email notifications',
      'WhatsApp and call shortcuts across the site',
      'Search-friendly metadata and structure'
    ],

    tech: [
      'Vue 3',
      'Vite',
      'TypeScript',
      'Formspree'
    ],

    image: imgWebsite,

    imageAlt:
      'Screenshot of the Millenium Tech website homepage',

    href: {
      label: 'Visit the website',
      url: '/'
    }
  },


  /* ================================================================
     NYUMBALINK
     ================================================================ */
  {
    slug: 'nyumbalink-room-finding-platform',
    category: 'websites',
    categoryLabel: 'Website & platform',
    title: 'NyumbaLink room-finding platform',
    client: 'NyumbaLink',
    industry: 'Property & accommodation',

    summary:
      'A web platform designed to make it easier for people to discover and find rooms and accommodation.',

    challenge:
      'Finding suitable rooms can be difficult when property information is scattered across different channels and potential tenants have limited ways to compare available options.',

    solution:
      'We built NyumbaLink as a dedicated room-finding platform focused on presenting accommodation information clearly and helping users move from searching to finding a suitable room.',

    delivered: [
      'Room and accommodation discovery experience',
      'Property information and listing presentation',
      'Responsive website interface',
      'User-focused search and browsing experience',
      'Mobile-friendly platform design'
    ],

    tech: [
      'Web application',
      'Responsive UI'
    ],

    /*
     * Replace this with a NyumbaLink screenshot when you place one
     * inside src/assets/img/.
     *
     * For now the existing website image keeps the build working.
     */
    image: nyumbaa,

    imageAlt:
      'NyumbaLink room-finding platform website'
  },


  /* ================================================================
     GOLANI SDA CHURCH WEBSITE
     ================================================================ */
  {
    slug: 'golani-sda-church-website',
    category: 'websites',
    categoryLabel: 'Website',
    title: 'Golani SDA Church website',
    client: 'Golani SDA Church',
    industry: 'Church & community',

    summary:
      'A modern church website created to present church information, announcements, services and community activities online.',

    challenge:
      'The church needed a central online presence where members and visitors could easily discover information about the church, activities, announcements and ways to connect.',

    solution:
      'We designed and developed a responsive church website with clear navigation, structured content sections, announcements, events and a visual identity suited to the church.',

    delivered: [
      'Responsive church website',
      'Church information and pages',
      'Announcements and event presentation',
      'Sermon and content sections',
      'Mobile and desktop layouts',
      'Church branding and visual design'
    ],

    tech: [
      'Vue 3',
      'Vite',
      'TypeScript',
      'Responsive UI'
    ],

    /*
     * Replace with the actual Golani website screenshot when available.
     */
    image: golani,

    imageAlt:
      'Golani SDA Church website homepage'
  },


  /* ================================================================
     AMALYA MILLS BRANDING + PACKAGING
     ================================================================ */
  {
    slug: 'amalya-mills-branding-packaging',
    category: 'branding',
    categoryLabel: 'Branding & packaging',
    title: 'Amalya Mills branding & rice packaging',
    client: 'Amalya Mills and Food Products',
    industry: 'Food & agriculture',

    summary:
      'Branding and packaging graphics created for Amalya Mills to present its rice product clearly and professionally on retail packaging.',

    challenge:
      'The product needed packaging artwork that could communicate the brand, rice product information, product details and contact information while remaining visually strong for physical packaging.',

    solution:
      'We developed the visual packaging composition around the Amalya Mills identity, combining the product imagery, logo, green and orange brand colours, product information, packaging details and company contacts into one clear design.',

    delivered: [
      'Rice packaging graphic design',
      'Product branding composition',
      'Amalya Mills logo placement and visual treatment',
      'Product information layout',
      'Packaging contact-information section',
      'Social media and company information treatment',
      'Print-ready visual composition'
    ],

    image: imgAmalya,

    imageAlt:
      'Amalya Mills Chunguza Rice packaging design featuring the Amalya Mills logo, rice imagery and product information'
  },


  /* ================================================================
     AMALYA MILLS — LOGO / BRANDING
     ================================================================ */
  {
    slug: 'amalya-mills-brand-identity',
    category: 'branding',
    categoryLabel: 'Branding & design',
    title: 'Amalya Mills brand identity',
    client: 'Amalya Mills and Food Products',
    industry: 'Food & agriculture',

    summary:
      'Visual branding work developed for Amalya Mills and Food Products, including the use of its agricultural-inspired identity across product communication.',

    challenge:
      'The brand needed a recognizable visual direction that could work across agricultural products, packaging and promotional communication.',

    solution:
      'We developed and applied a distinctive visual identity using the Amalya Mills logo, agricultural imagery and a consistent green, orange and red colour language.',

    delivered: [
      'Brand identity design',
      'Logo application',
      'Colour direction',
      'Product branding',
      'Packaging visual system',
      'Marketing graphics'
    ],

    /*
     * The packaging artwork is used as the visual case-study cover
     * until a standalone logo image is added.
     */
    image: imgAmalya1,

    imageAlt:
      'Amalya Mills brand identity and product packaging design'
  },


  /* ================================================================
     MILLEBOT
     ================================================================ */
  {
    slug: 'millebot-assistant',
    category: 'technology',
    categoryLabel: 'Business technology',
    title: 'MilleBot website assistant',
    client: 'Millenium Tech',
    industry: 'Technology services',

    summary:
      'A chat assistant that answers visitor questions in English or Swahili and points people to a human on WhatsApp.',

    challenge:
      'Visitors often have simple questions about services and contact options, and not every question arrives during office hours.',

    solution:
      'We built a chat assistant that answers common questions about the company’s services, replies in the language the visitor uses, and directs people to WhatsApp or the enquiry form when a human is needed.',

    delivered: [
      'Chat widget for the website',
      'Backend API with saved conversation history',
      'Answers grounded in company information',
      'English and Swahili replies'
    ],

    tech: [
      'Django REST Framework',
      'Vue 3',
      'AI language model API'
    ],

    image: mille,

    imageAlt:
      'The MilleBot chat window open on the Millenium Tech website'
  },


  /* ================================================================
     MILLENIUM TECH PROMOTIONAL FLYER
     ================================================================ */
  {
    slug: 'company-promotional-flyer',
    category: 'branding',
    categoryLabel: 'Branding & design',
    title: 'Company promotional flyer',
    client: 'Millenium Tech',
    industry: 'Technology services',

    summary:
      'A promotional design presenting six core services, contact details and reasons to choose the company.',

    challenge:
      'We needed one shareable design that explains everything the company offers and makes it easy to get in touch.',

    solution:
      'We designed a clear, brand-consistent flyer that groups the services with simple icons and puts phone and WhatsApp contact details front and centre.',

    delivered: [
      'Marketing flyer layout for social media and print',
      'Service icon set',
      'Consistent brand colours and typography'
    ],

    image: imgFlyer,

    imageAlt:
      'Millenium Tech promotional flyer with the headline “Your Technology Partner in Tanzania”'
  }
]


export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug)