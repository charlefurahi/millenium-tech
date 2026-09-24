import { reactive, readonly } from 'vue'
import {
  fetchCurrentUser,
  login as apiLogin,
  logout as apiLogout,
  onAuthStateChange,
  register as apiRegister,
  requestPasswordReset as apiRequestReset,
  resendConfirmation as apiResend,
  updatePassword as apiUpdatePassword,
  type AppUser
} from '@/services/authService'

export type AuthUser = AppUser

const state = reactive({
  user: null as AuthUser | null,
  ready: false, // true once the current Supabase session has been checked
  recovering: false // true while the user arrived via a password-reset email link
})

const INIT_TIMEOUT_MS = 4000

let listening = false
let initPromise: Promise<void> | null = null

/** Safe to call many times (router guard, main.ts, pages) — only does the work once. */
function init(): Promise<void> {
  if (!initPromise) {
    initPromise = (async () => {
      if (!listening) {
        listening = true
        onAuthStateChange((user, event) => {
          state.user = user
          state.ready = true
          if (event === 'PASSWORD_RECOVERY') state.recovering = true
          if (event === 'SIGNED_OUT') state.recovering = false
        })
      }
      // Never let a slow/unreachable auth server hold pages hostage: give the
      // session check a few seconds, then carry on. If it answers late, the
      // listener above still updates state.user when it arrives.
      const result = await Promise.race([
        fetchCurrentUser().then((user) => ({ user, done: true })),
        new Promise<{ user: null; done: false }>((resolve) =>
          setTimeout(() => resolve({ user: null, done: false }), INIT_TIMEOUT_MS)
        )
      ])
      if (result.done) state.user = result.user
      state.ready = true
    })()
  }
  return initPromise
}

export function useAuth() {
  return {
    // Readonly so state only changes through the actions below.
    state: readonly(state),
    init,
    async login(payload: { email: string; password: string }) {
      const user = await apiLogin(payload)
      state.user = user
      return user
    },
    async register(payload: { name: string; email: string; password: string }) {
      const result = await apiRegister(payload)
      if (result.user) state.user = result.user
      return result
    },
    async logout() {
      await apiLogout()
      state.user = null
      state.recovering = false
    },
    requestPasswordReset: apiRequestReset,
    resendConfirmation: apiResend,
    async updatePassword(password: string) {
      await apiUpdatePassword(password)
      state.recovering = false
    }
  }
}
