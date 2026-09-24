/**
 * Only allow redirects to paths inside this site (blocks open-redirect
 * links like /login?redirect=https://evil.example or //evil.example).
 */
export function safeRedirect(value: unknown, fallback = '/account'): string {
  if (typeof value !== 'string') return fallback
  if (!value.startsWith('/') || value.startsWith('//') || value.includes('\\')) return fallback
  return value
}

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
