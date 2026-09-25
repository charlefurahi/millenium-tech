<script setup lang="ts">
import { computed, onBeforeUnmount, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AuthShell from '@/components/auth/AuthShell.vue'
import PasswordField from '@/components/auth/PasswordField.vue'
import Icon from '@/components/ui/Icon.vue'
import { useAuth } from '@/composables/useAuth'
import { AuthError } from '@/services/authService'
import { isEmail } from '@/utils/redirect'

const router = useRouter()
const route = useRoute()
const { register, resendConfirmation } = useAuth()

const form = reactive({ name: '', email: '', password: '' })
const errors = reactive({ name: '', email: '', password: '' })
const sending = ref(false)
const formError = ref('')
const existing = ref(false)
const sentTo = ref('')
const cooldown = ref(0)
const resendMsg = ref('')
let timer: ReturnType<typeof setInterval> | undefined

// The /contact page requires login; explain why we've sent someone here
// instead of leaving them to guess what the redirect was for.
const subtitle = computed(() =>
  sentTo.value
    ? ''
    : route.query.redirect === '/contact'
      ? 'Create an account so we can track your enquiry for you.'
      : 'Optional — an account just lets you track your requests. Guests are always welcome.'
)

function validate() {
  errors.name = form.name.trim().length < 2 ? 'Please enter your name.' : ''
  errors.email = !form.email.trim() ? 'Enter your email address.' : !isEmail(form.email) ? 'That email doesn’t look right.' : ''
  errors.password = form.password.length < 6 ? 'Use at least 6 characters.' : ''
  return !errors.name && !errors.email && !errors.password
}

function startCooldown() {
  cooldown.value = 30
  clearInterval(timer)
  timer = setInterval(() => {
    cooldown.value -= 1
    if (cooldown.value <= 0) clearInterval(timer)
  }, 1000)
}
onBeforeUnmount(() => clearInterval(timer))

async function submit() {
  if (sending.value) return
  formError.value = ''
  existing.value = false
  if (!validate()) {
    const first = errors.name ? 'register-name' : errors.email ? 'register-email' : 'register-password'
    document.getElementById(first)?.focus()
    return
  }
  sending.value = true
  try {
    const { user, needsConfirmation } = await register({ ...form })
    if (user && !needsConfirmation) {
      await router.replace('/account')
      return
    }
    sentTo.value = form.email.trim()
    startCooldown()
  } catch (err) {
    formError.value = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
    existing.value = err instanceof AuthError && err.code === 'user_exists'
  } finally {
    sending.value = false
  }
}

async function resend() {
  if (cooldown.value > 0) return
  resendMsg.value = ''
  try {
    await resendConfirmation(sentTo.value)
    resendMsg.value = 'Sent again. Check your inbox and spam folder.'
    startCooldown()
  } catch (err) {
    resendMsg.value = err instanceof Error ? err.message : 'Could not resend the email.'
  }
}
</script>

<template>
  <AuthShell
    :title="sentTo ? 'Check your email' : 'Create your account'"
    :subtitle="subtitle"
  >
    <div v-if="sentTo" class="auth-status">
      <span class="auth-status__icon"><Icon name="mail" :size="26" /></span>
      <p>
        We sent a confirmation link to <strong>{{ sentTo }}</strong>. Open it to activate your account, then log in.
      </p>
      <p v-if="resendMsg" class="hint" role="status">{{ resendMsg }}</p>
      <div class="auth-actions" style="width: 100%">
        <router-link class="btn btn--accent btn--block" to="/login">Go to log in</router-link>
        <button class="btn btn--secondary btn--block" type="button" :disabled="cooldown > 0" @click="resend">
          {{ cooldown > 0 ? `Resend email in ${cooldown}s` : 'Resend email' }}
        </button>
      </div>
    </div>

    <form v-else class="auth-form" novalidate @submit.prevent="submit">
      <div v-if="formError" class="auth-alert auth-alert--error" role="alert">
        <Icon name="alert" :size="18" />
        <span>
          {{ formError }}
          <router-link v-if="existing" class="auth-link" to="/login">Log in</router-link>
        </span>
      </div>

      <div class="auth-field">
        <label class="label" for="register-name">Full name</label>
        <input
          id="register-name"
          v-model="form.name"
          class="input"
          type="text"
          autocomplete="name"
          placeholder="Your name"
          :aria-invalid="errors.name ? 'true' : undefined"
          :aria-describedby="errors.name ? 'register-name-error' : undefined"
          :disabled="sending"
        />
        <p v-if="errors.name" id="register-name-error" class="field-error" role="alert">{{ errors.name }}</p>
      </div>

      <div class="auth-field">
        <label class="label" for="register-email">Email</label>
        <input
          id="register-email"
          v-model="form.email"
          class="input"
          type="email"
          inputmode="email"
          autocomplete="email"
          autocapitalize="none"
          spellcheck="false"
          placeholder="you@example.com"
          :aria-invalid="errors.email ? 'true' : undefined"
          :aria-describedby="errors.email ? 'register-email-error' : undefined"
          :disabled="sending"
        />
        <p v-if="errors.email" id="register-email-error" class="field-error" role="alert">{{ errors.email }}</p>
      </div>

      <PasswordField
        id="register-password"
        v-model="form.password"
        label="Password"
        autocomplete="new-password"
        hint="At least 6 characters. A longer mix of letters, numbers and symbols is stronger."
        show-strength
        :error="errors.password"
        :disabled="sending"
      />

      <div class="auth-actions">
        <button class="btn btn--accent btn--block" type="submit" :disabled="sending">
          <span v-if="sending" class="auth-spinner" aria-hidden="true"></span>
          {{ sending ? 'Creating account…' : 'Create account' }}
        </button>
        <router-link class="btn btn--secondary btn--block" to="/">Continue as guest</router-link>
      </div>
      <p class="hint" style="text-align: center">
        By creating an account you agree to our <router-link class="auth-link" to="/privacy">Privacy Policy</router-link>.
      </p>
    </form>

    <template v-if="!sentTo" #below>
      Already have an account?
      <router-link :to="route.query.redirect ? { path: '/login', query: { redirect: String(route.query.redirect) } } : '/login'">
        Log in
      </router-link>
    </template>
  </AuthShell>
</template>
