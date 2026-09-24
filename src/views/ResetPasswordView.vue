<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthShell from '@/components/auth/AuthShell.vue'
import PasswordField from '@/components/auth/PasswordField.vue'
import Icon from '@/components/ui/Icon.vue'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { state, init, updatePassword } = useAuth()

const checking = ref(true)
const hasSession = ref(false)
const form = reactive({ password: '', confirm: '' })
const errors = reactive({ password: '', confirm: '' })
const formError = ref('')
const sending = ref(false)

onMounted(async () => {
  // The reset link puts a short-lived recovery session in the URL; the Supabase
  // client picks it up during init(). No session = the link is invalid/expired.
  await init()
  hasSession.value = Boolean(state.user)
  checking.value = false
})

async function submit() {
  if (sending.value) return
  formError.value = ''
  errors.password = form.password.length < 6 ? 'Use at least 6 characters.' : ''
  errors.confirm = form.confirm !== form.password ? 'Passwords don’t match.' : ''
  if (errors.password || errors.confirm) return
  sending.value = true
  try {
    await updatePassword(form.password)
    await router.replace({ path: '/account' })
  } catch (err) {
    formError.value = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <AuthShell
    :title="!checking && !hasSession ? 'Link expired' : 'Choose a new password'"
    :subtitle="!checking && !hasSession ? '' : 'Pick something you don’t use on other sites.'"
  >
    <p v-if="checking" class="hint" role="status">Checking your link…</p>

    <div v-else-if="!hasSession" class="auth-status">
      <span class="auth-status__icon"><Icon name="alert" :size="26" /></span>
      <p>This password-reset link is invalid or has expired. Request a new one and try again.</p>
      <router-link class="btn btn--accent btn--block" to="/forgot-password">Request a new link</router-link>
    </div>

    <form v-else class="auth-form" novalidate @submit.prevent="submit">
      <div v-if="formError" class="auth-alert auth-alert--error" role="alert">
        <Icon name="alert" :size="18" /><span>{{ formError }}</span>
      </div>
      <PasswordField
        id="reset-password"
        v-model="form.password"
        label="New password"
        autocomplete="new-password"
        show-strength
        :error="errors.password"
        :disabled="sending"
      />
      <PasswordField
        id="reset-confirm"
        v-model="form.confirm"
        label="Confirm new password"
        autocomplete="new-password"
        :error="errors.confirm"
        :disabled="sending"
      />
      <div class="auth-actions">
        <button class="btn btn--accent btn--block" type="submit" :disabled="sending">
          <span v-if="sending" class="auth-spinner" aria-hidden="true"></span>
          {{ sending ? 'Saving…' : 'Update password' }}
        </button>
      </div>
    </form>

    <template #below>
      <router-link to="/login">Back to log in</router-link>
    </template>
  </AuthShell>
</template>
