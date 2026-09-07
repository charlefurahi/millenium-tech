import { ref } from 'vue'

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'millenium-theme'

const getSystemTheme = (): Theme =>
  window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark'

  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored

  return getSystemTheme()
}

/*
 * Module-level ref = a single shared, reactive theme
 * state across every component that calls useTheme(),
 * with no store library needed.
 */
const theme = ref<Theme>(
  typeof window !== 'undefined' ? getInitialTheme() : 'dark'
)

const applyTheme = (value: Theme) => {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('data-theme', value)
}

export function useTheme() {
  const setTheme = (value: Theme) => {
    theme.value = value
    applyTheme(value)

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, value)
    }
  }

  const toggleTheme = () => {
    setTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  /*
   * Call once, as early as possible, to paint the
   * correct theme and keep following the system
   * preference until the user makes an explicit choice.
   */
  const initTheme = () => {
    applyTheme(theme.value)

    if (typeof window === 'undefined' || !window.matchMedia) return

    const media = window.matchMedia('(prefers-color-scheme: light)')

    const handleSystemChange = (event: MediaQueryListEvent) => {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored) return // user already chose manually, don't override

      setTheme(event.matches ? 'light' : 'dark')
    }

    media.addEventListener('change', handleSystemChange)
  }

  return {
    theme,
    setTheme,
    toggleTheme,
    initTheme
  }
}