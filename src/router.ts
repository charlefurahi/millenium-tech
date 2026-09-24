import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { nextTick } from 'vue'
import { getService } from '@/data/services'
import { getProject } from '@/data/projects'
import { applyMeta, type PageMeta } from '@/utils/seo'
import { useAuth } from '@/composables/useAuth'
import { safeRedirect } from '@/utils/redirect'

const seo = (title: string, description: string, extra: Partial<PageMeta> = {}) => ({
  seo: { title, description, ...extra } as PageMeta
})

/** Send unknown slugs to the 404 page while keeping the URL. */
const notFound = (path: string) => ({
  name: 'not-found',
  params: { pathMatch: path.replace(/^\//, '').split('/') }
})

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: seo(
      'Millenium Tech | Websites, Design & IT Solutions in Tanzania',
      'Millenium Tech builds websites, digital brands and practical technology solutions for businesses in Tanzania — plus computer repair, laptop sales, photo editing and online services.'
    )
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: seo(
      'About Millenium Tech | Practical Technology for Tanzanian Businesses',
      'Millenium Tech is a young Tanzanian team helping local businesses use websites, design and technology with confidence.'
    )
  },
  {
    path: '/services',
    name: 'services',
    component: () => import('@/views/ServicesView.vue'),
    meta: seo(
      'Services | Websites, Design, IT Support & More | Millenium Tech',
      'Website development, graphic design, computer repair, laptop sales, photo editing, online services and custom business systems in Tanzania.'
    )
  },
  {
    path: '/services/:slug',
    name: 'service',
    component: () => import('@/views/ServiceDetailView.vue'),
    props: true,
    beforeEnter: (to) => (getService(String(to.params.slug)) ? true : notFound(to.path))
  },
  {
    path: '/solutions',
    name: 'solutions',
    component: () => import('@/views/ServiceDetailView.vue'),
    props: { slug: 'business-technology' }
  },
  { path: '/website-development', redirect: '/services/website-development' },
  {
    path: '/portfolio',
    name: 'portfolio',
    component: () => import('@/views/PortfolioView.vue'),
    meta: seo(
      'Portfolio | Websites, Branding & Business Technology | Millenium Tech',
      'See Millenium Tech projects: what the challenge was, what we built and what was delivered.'
    )
  },
  {
    path: '/portfolio/:slug',
    name: 'project',
    component: () => import('@/views/CaseStudyView.vue'),
    props: true,
    beforeEnter: (to) => (getProject(String(to.params.slug)) ? true : notFound(to.path))
  },
  {
    path: '/pricing',
    name: 'pricing',
    component: () => import('@/views/PricingView.vue'),
    meta: seo(
      'Packages & Pricing | Millenium Tech',
      'Clear Starter, Growth and Business packages, what affects the price of a project, and how to request a quotation from Millenium Tech.'
    )
  },
  { path: '/packages', redirect: '/pricing' },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/ContactView.vue'),
    meta: seo(
      'Contact & Free Consultation | Millenium Tech',
      'Contact Millenium Tech by WhatsApp, phone, email or enquiry form for websites, design, IT support and business systems in Tanzania.'
    )
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('@/views/PrivacyView.vue'),
    meta: seo('Privacy Policy | Millenium Tech', 'How Millenium Tech handles the information you share through this website.')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: {
      layout: 'auth',
      guestOnly: true,
      ...seo('Log in | Millenium Tech', 'Log in to your Millenium Tech account, or continue as a guest.', { noindex: true })
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterView.vue'),
    meta: {
      layout: 'auth',
      guestOnly: true,
      ...seo('Create an account | Millenium Tech', 'Create a Millenium Tech account to track your project requests, or continue as a guest.', { noindex: true })
    }
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('@/views/ForgotPasswordView.vue'),
    meta: {
      layout: 'auth',
      guestOnly: true,
      ...seo('Reset your password | Millenium Tech', 'Request a link to reset your Millenium Tech password.', { noindex: true })
    }
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: () => import('@/views/ResetPasswordView.vue'),
    meta: {
      layout: 'auth',
      ...seo('Choose a new password | Millenium Tech', 'Choose a new password for your Millenium Tech account.', { noindex: true })
    }
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('@/views/AccountView.vue'),
    meta: {
      requiresAuth: true,
      layout: 'auth',
      ...seo('My account | Millenium Tech', 'Track the project requests you have sent to Millenium Tech.', { noindex: true })
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: seo('Page not found | Millenium Tech', 'The page you are looking for could not be found.', { noindex: true })
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, saved) {
    if (saved) return saved
    if (to.hash) return { el: to.hash, top: 96, behavior: 'smooth' }
    return { top: 0 }
  }
})

// Guest browsing is the default everywhere. Only /account (a person's own
// requests) requires a login. Login/register pages bounce signed-in users
// straight to their account so they never see a pointless login form.
router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth && !to.meta.guestOnly) return true
  const { state, init } = useAuth()
  await init()
  if (to.meta.requiresAuth && !state.user) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }
  if (to.meta.guestOnly && state.user && !state.recovering) {
    const target = typeof to.query.redirect === 'string' ? safeRedirect(to.query.redirect) : '/account'
    return target
  }
  return true
})

function metaFor(to: (typeof router)['currentRoute']['value']): PageMeta {
  if (to.name === 'service' || to.name === 'solutions') {
    const slug = to.name === 'solutions' ? 'business-technology' : String(to.params.slug)
    const s = getService(slug)
    if (s) return s.seo
  }
  if (to.name === 'project') {
    const p = getProject(String(to.params.slug))
    if (p) {
      return {
        title: `${p.title} | Case Study | Millenium Tech`,
        description: `${p.summary} Challenge, solution and what we delivered.`
      }
    }
  }
  return (to.meta.seo as PageMeta) || (routes[0].meta!.seo as PageMeta)
}

let first = true
router.afterEach((to) => {
  applyMeta(metaFor(to), to.path)
  if (first) {
    first = false
    return
  }
  // Move focus to the new page content for keyboard and screen-reader users.
  nextTick(() => document.getElementById('main-content')?.focus({ preventScroll: true }))
})
