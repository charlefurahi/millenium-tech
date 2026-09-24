import type { Directive } from 'vue'

/**
 * v-reveal — a subtle fade/slide-in when a block scrolls into view.
 * Respects prefers-reduced-motion and simply shows content if
 * IntersectionObserver is unavailable, so content is never hidden.
 */
const prefersReduced =
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

let observer: IntersectionObserver | null = null

function getObserver() {
  if (observer) return observer
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return null
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer?.unobserve(entry.target)
        }
      })
    },
    { rootMargin: '0px 0px -6% 0px', threshold: 0.06 }
  )
  return observer
}

export const reveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    const io = getObserver()
    if (prefersReduced || !io) return
    el.classList.add('reveal')
    if (binding.value) el.style.transitionDelay = `${binding.value}ms`
    io.observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  }
}
