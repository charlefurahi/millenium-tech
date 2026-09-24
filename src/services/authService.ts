import type { AuthChangeEvent, Session } from '@supabase/supabase-js'
import { isSupabaseConfigured, supabase } from './supabaseClient'

/** Shape the app uses everywhere, independent of Supabase's own user object. */
export interface AppUser {
  id: string
  email: string
  name: string
}

/** An Error with a stable `code` the UI can branch on (e.g. show "resend email"). */
export class AuthError extends Error {
  code: string
  constructor(message: string, code = 'unknown') {
    super(message)
    this.name = 'AuthError'
    this.code = code
  }
}

function toAppUser(session: Session | null): AppUser | null {
  if (!session?.user) return null
  const { user } = session
  return {
    id: user.id,
    email: user.email ?? '',
    name: (user.user_metadata?.name as string | undefined) || user.email || 'there'
  }
}

interface SupabaseLikeError {
  message?: string
  status?: number
  code?: string
}

/** Turn Supabase/network errors into short, human messages. */
function friendlyError(error: SupabaseLikeError | null, fallback: string): AuthError {
  if (!error) return new AuthError(fallback)
  const msg = (error.message || '').toLowerCase()
  const code = (error.code || '').toLowerCase()

  if (msg.includes('failed to fetch') || msg.includes('network') || msg.includes('load failed')) {
    return new AuthError('We can’t reach the server. Check your internet connection and try again.', 'network')
  }
  if (msg.includes('invalid login credentials') || code === 'invalid_credentials') {
    return new AuthError('Incorrect email or password.', 'invalid_credentials')
  }
  if (msg.includes('email not confirmed') || code === 'email_not_confirmed') {
    return new AuthError('Please confirm your email first — check your inbox for the link.', 'email_not_confirmed')
  }
  if (msg.includes('already registered') || code === 'user_already_exists') {
    return new AuthError('An account with this email already exists. Try logging in instead.', 'user_exists')
  }
  if (msg.includes('password should be') || code === 'weak_password') {
    return new AuthError('Password is too weak. Use at least 6 characters.', 'weak_password')
  }
  if (msg.includes('different from the old password') || code === 'same_password') {
    return new AuthError('Choose a password different from your current one.', 'same_password')
  }
  if (error.status === 429 || msg.includes('rate limit') || code === 'over_email_send_rate_limit') {
    return new AuthError('Too many attempts. Please wait a minute and try again.', 'rate_limited')
  }
  if (msg.includes('session missing') || msg.includes('expired') || msg.includes('invalid token')) {
    return new AuthError('This link has expired. Please request a new one.', 'link_expired')
  }
  if (msg.includes('signups not allowed') || code === 'signup_disabled') {
    return new AuthError('New sign-ups are currently disabled. Please contact us.', 'signup_disabled')
  }
  return new AuthError(error.message || fallback)
}

function assertConfigured() {
  if (!isSupabaseConfigured) {
    throw new AuthError(
      'Accounts aren’t set up on this site yet. You can still continue as a guest.',
      'not_configured'
    )
  }
}

const origin = () => (typeof window !== 'undefined' ? window.location.origin : '')

/** Create an account. `needsConfirmation` is true when Supabase requires the email link first. */
export async function register(input: { name: string; email: string; password: string }) {
  assertConfigured()
  const { data, error } = await supabase.auth.signUp({
    email: input.email.trim().toLowerCase(),
    password: input.password,
    options: {
      data: { name: input.name.trim() },
      emailRedirectTo: `${origin()}/account`
    }
  })
  if (error) throw friendlyError(error, 'We could not create your account. Please try again.')

  // With "Confirm email" ON, Supabase returns a fake user with no identities
  // (instead of an error) when the address is already registered.
  if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
    throw new AuthError('An account with this email already exists. Try logging in instead.', 'user_exists')
  }
  return { user: toAppUser(data.session), needsConfirmation: !data.session }
}

export async function login(input: { email: string; password: string }): Promise<AppUser> {
  assertConfigured()
  const { data, error } = await supabase.auth.signInWithPassword({
    email: input.email.trim().toLowerCase(),
    password: input.password
  })
  if (error) throw friendlyError(error, 'We could not log you in. Please check your details and try again.')
  const user = toAppUser(data.session)
  if (!user) throw new AuthError('We could not log you in. Please try again.')
  return user
}

export async function logout() {
  // Even if the network call fails, clear the local session so the user is logged out here.
  const { error } = await supabase.auth.signOut({ scope: 'local' })
  if (error) console.warn('[auth] sign-out warning:', error.message)
}

/** Send a password-reset email. Always resolves the same way to avoid revealing which emails exist. */
export async function requestPasswordReset(email: string) {
  assertConfigured()
  const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
    redirectTo: `${origin()}/reset-password`
  })
  if (error && (error.status === 429 || /rate limit/i.test(error.message))) {
    throw friendlyError(error, 'Too many attempts. Please wait a minute and try again.')
  }
  if (error && /fetch|network/i.test(error.message)) throw friendlyError(error, 'Network error.')
}

/** Set a new password (used on the reset page, with the recovery session from the email link). */
export async function updatePassword(password: string) {
  assertConfigured()
  const { error } = await supabase.auth.updateUser({ password })
  if (error) throw friendlyError(error, 'We could not update your password. Please try again.')
}

export async function resendConfirmation(email: string) {
  assertConfigured()
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: email.trim().toLowerCase(),
    options: { emailRedirectTo: `${origin()}/account` }
  })
  if (error) throw friendlyError(error, 'We could not resend the email. Please try again.')
}

/** Current session, if any — used on app load to restore a logged-in state. */
export async function fetchCurrentUser(): Promise<AppUser | null> {
  try {
    const { data } = await supabase.auth.getSession()
    return toAppUser(data.session)
  } catch {
    return null
  }
}

/** Fires on every login/logout/token refresh/password recovery (also across tabs). */
export function onAuthStateChange(callback: (user: AppUser | null, event: AuthChangeEvent) => void) {
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    callback(toAppUser(session), event)
  })
  return data.subscription
}
