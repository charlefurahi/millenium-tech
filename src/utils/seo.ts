import { absoluteUrl, site } from '@/config/site'

export interface PageMeta {
  title: string
  description: string
  /** Path of a social-sharing image (defaults to the site-wide one). */
  image?: string
  noindex?: boolean
}

const DEFAULT_IMAGE = '/og-image.jpg'

function upsert(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

const meta = (attr: 'name' | 'property', key: string, value: string) =>
  upsert(
    `meta[${attr}="${key}"]`,
    () => {
      const m = document.createElement('meta')
      m.setAttribute(attr, key)
      return m
    },
    'content',
    value
  )

/** Update title, description, canonical, Open Graph and Twitter tags for the current page. */
export function applyMeta(page: PageMeta, path: string) {
  const url = absoluteUrl(path)
  const image = absoluteUrl(page.image || DEFAULT_IMAGE)

  document.title = page.title
  meta('name', 'description', page.description)
  meta('name', 'robots', page.noindex ? 'noindex, follow' : 'index, follow')

  upsert(
    'link[rel="canonical"]',
    () => {
      const l = document.createElement('link')
      l.setAttribute('rel', 'canonical')
      return l
    },
    'href',
    url
  )

  meta('property', 'og:type', 'website')
  meta('property', 'og:site_name', site.name)
  meta('property', 'og:title', page.title)
  meta('property', 'og:description', page.description)
  meta('property', 'og:url', url)
  meta('property', 'og:image', image)

  meta('name', 'twitter:card', 'summary_large_image')
  meta('name', 'twitter:title', page.title)
  meta('name', 'twitter:description', page.description)
  meta('name', 'twitter:image', image)
}
