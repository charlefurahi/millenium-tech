<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import AuthShell from '@/components/auth/AuthShell.vue'
import Icon from '@/components/ui/Icon.vue'
import { useAuth } from '@/composables/useAuth'
import { isEmail } from '@/utils/redirect'

const { requestPasswordReset } = useAuth()

const email = ref('')
const emailError = ref('')
const formError = ref('')
const sending = ref(false)
const sentTo = ref('')
const cooldown = ref(0)
let timer: ReturnType<typeof setInterval> | undefined

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
  if (sending.value || cooldown.value > 0) return
  formError.value = ''
  emailError.value = !email.value.trim() ? 'Enter your email address.' : !isEmail(email.value) ? 'That email doesn’t look right.' : ''
  if (emailError.value) return
  sending.value = true
  try {
    await requestPasswordReset(email.value)
    sentTo.value = email.value.trim()
    startCooldown()
  } catch (err) {
    formError.value = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <AuthShell
    :title="sentTo ? 'Check your email' : 'Reset your password'"
    :subtitle="sentTo ? '' : 'Enter the email you signed up with and we’ll send you a link to choose a new password.'"
  >
    <div v-if="sentTo" class="auth-status">
      <span class="auth-status__icon"><Icon name="mail" :size="26" /></span>
      <p>
        If an account exists for <strong>{{ sentTo }}</strong>, a reset link is on its way. It can take a minute — check
        your spam folder too.
      </p>
      <div class="auth-actions" style="width: 100%">
        <button class="btn btn--secondary btn--block" type="button" :disabled="cooldown > 0 || sending" @click="submit">
          {{ cooldown > 0 ? `Send again in ${cooldown}s` : 'Send again' }}
        </button>
      </div>
    </div>

    <form v-else class="auth-form" novalidate @submit.prevent="submit">
      <div v-if="formError" class="auth-alert auth-alert--error" role="alert">
        <Icon name="alert" :size="18" /><span>{{ formError }}</span>
      </div>
      <div class="auth-field">
        <label class="label" for="forgot-email">Email</label>
        <input
          id="forgot-email"
          v-model="email"
          class="input"
          type="email"
          inputmode="email"
          autocomplete="email"
          autocapitalize="none"
          spellcheck="false"
          placeholder="you@example.com"
          :aria-invalid="emailError ? 'true' : undefined"
          :aria-describedby="emailError ? 'forgot-email-error' : undefined"
          :disabled="sending"
        />
        <p v-if="emailError" id="forgot-email-error" class="field-error" role="alert">{{ emailError }}</p>
      </div>
      <div class="auth-actions">
        <button class="btn btn--accent btn--block" type="submit" :disabled="sending">
          <span v-if="sending" class="auth-spinner" aria-hidden="true"></span>
          {{ sending ? 'Sending…' : 'Send reset link' }}
        </button>
      </div>
    </form>

    <template #below>
      Remembered it? <router-link to="/login">Back to log in</router-link>
    </template>
  </AuthShell>
</template>
