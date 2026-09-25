<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AuthShell from '@/components/auth/AuthShell.vue'
import PasswordField from '@/components/auth/PasswordField.vue'
import Icon from '@/components/ui/Icon.vue'
import { useAuth } from '@/composables/useAuth'
import { AuthError } from '@/services/authService'
import { isEmail, safeRedirect } from '@/utils/redirect'

const router = useRouter()
const route = useRoute()
const { login, resendConfirmation } = useAuth()

const form = reactive({ email: '', password: '' })
const errors = reactive({ email: '', password: '' })
const sending = ref(false)
const formError = ref('')
const notice = ref('')
const needsConfirm = ref(false)
const resent = ref(false)

const redirectTo = safeRedirect(route.query.redirect)

// The /contact page requires login; explain why we've sent someone here
// instead of leaving them to guess what the redirect was for.
const subtitle = computed(() =>
  route.query.redirect === '/contact'
    ? 'Log in so we can track your enquiry for you.'
    : 'Log in to track the project requests you’ve sent to Millenium Tech.'
)

onMounted(() => {
  // Email-link failures arrive in the URL hash, e.g. #error_description=Email+link+is+invalid+or+has+expired
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''))
  const hashError = hash.get('error_description')
  if (hashError) formError.value = hashError.replace(/\+/g, ' ')
  if (route.query.reset === '1') notice.value = 'Password updated. Log in with your new password.'
  if (route.query.registered === '1') notice.value = 'Email confirmed. You can log in now.'
})

function validate() {
  errors.email = !form.email.trim() ? 'Enter your email address.' : !isEmail(form.email) ? 'That email doesn’t look right.' : ''
  errors.password = form.password ? '' : 'Enter your password.'
  return !errors.email && !errors.password
}

async function submit() {
  if (sending.value) return
  formError.value = ''
  needsConfirm.value = false
  notice.value = ''
  if (!validate()) {
    document.getElementById(errors.email ? 'login-email' : 'login-password')?.focus()
    return
  }
  sending.value = true
  try {
    await login({ email: form.email, password: form.password })
    await router.replace(redirectTo)
  } catch (err) {
    formError.value = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
    needsConfirm.value = err instanceof AuthError && err.code === 'email_not_confirmed'
  } finally {
    sending.value = false
  }
}

async function resend() {
  try {
    await resendConfirmation(form.email)
    resent.value = true
    formError.value = ''
    notice.value = 'Confirmation email sent. Check your inbox (and spam folder).'
  } catch (err) {
    formError.value = err instanceof Error ? err.message : 'Could not resend the email.'
  }
}
</script>

<template>
  <AuthShell title="Welcome back" :subtitle="subtitle">
    <form class="auth-form" novalidate @submit.prevent="submit">
      <div v-if="notice" class="auth-alert auth-alert--success" role="status">
        <Icon name="check-circle" :size="18" /><span>{{ notice }}</span>
      </div>
      <div v-if="formError" class="auth-alert auth-alert--error" role="alert">
        <Icon name="alert" :size="18" />
        <span>
          {{ formError }}
          <template v-if="needsConfirm && !resent">
            <button type="button" class="auth-link" @click="resend">Resend confirmation email</button>
          </template>
        </span>
      </div>

      <div class="auth-field">
        <label class="label" for="login-email">Email</label>
        <input
          id="login-email"
          v-model="form.email"
          class="input"
          type="email"
          inputmode="email"
          autocomplete="email"
          autocapitalize="none"
          spellcheck="false"
          placeholder="you@example.com"
          :aria-invalid="errors.email ? 'true' : undefined"
          :aria-describedby="errors.email ? 'login-email-error' : undefined"
          :disabled="sending"
        />
        <p v-if="errors.email" id="login-email-error" class="field-error" role="alert">{{ errors.email }}</p>
      </div>

      <PasswordField
        id="login-password"
        v-model="form.password"
        label="Password"
        autocomplete="current-password"
        :error="errors.password"
        :disabled="sending"
      >
        <template #aside>
          <router-link class="auth-link" to="/forgot-password">Forgot password?</router-link>
        </template>
      </PasswordField>

      <div class="auth-actions">
        <button class="btn btn--accent btn--block" type="submit" :disabled="sending">
          <span v-if="sending" class="auth-spinner" aria-hidden="true"></span>
          {{ sending ? 'Logging in…' : 'Log in' }}
        </button>
        <div class="auth-divider">or</div>
        <router-link class="btn btn--secondary btn--block" to="/">Continue as guest</router-link>
      </div>
    </form>

    <template #below>
      New here?
      <router-link :to="route.query.redirect ? { path: '/register', query: { redirect: String(route.query.redirect) } } : '/register'">
        Create an account
      </router-link>
    </template>
  </AuthShell>
</template>
