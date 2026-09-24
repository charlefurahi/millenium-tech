/**
 * Light / dark theme.
 *
 * The actual value lives as `data-theme="light" | "dark"` on <html>, set as
 * early as possible by the inline script in index.html (so there's no flash
 * of the wrong theme). This module just keeps a reactive mirror of that
 * attribute, persists explicit choices, and exposes a toggle for the UI.
 */
import { ref, watchEffect } from 'vue'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'mt-theme'

function systemPrefersDark() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
}

function initial(): Theme {
  if (typeof document !== 'undefined') {
    const attr = document.documentElement.getAttribute('data-theme')
    if (attr === 'light' || attr === 'dark') return attr
  }
  return systemPrefersDark() ? 'dark' : 'light'
}

const theme = ref<Theme>(initial())

watchEffect(() => {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('data-theme', theme.value)
})

/** Follow the system theme until the person picks one explicitly. */
if (typeof window !== 'undefined' && !localStorage.getItem(STORAGE_KEY)) {
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener?.('change', (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) theme.value = e.matches ? 'dark' : 'light'
    })
}

export function useTheme() {
  function setTheme(next: Theme) {
    theme.value = next
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* private browsing / storage disabled — theme still applies for this session */
    }
  }

  function toggleTheme() {
    setTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  return { theme, setTheme, toggleTheme }
}
