<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthShell from '@/components/auth/AuthShell.vue'
import Icon from '@/components/ui/Icon.vue'
import { useAuth } from '@/composables/useAuth'
import { supabase } from '@/services/supabaseClient'

const router = useRouter()
const { state, logout } = useAuth()

interface MyRequest {
  id: number
  reference_number: string
  project_type: string
  problem_description: string
  status: string
  priority: string
  created_at: string
}

const requests = ref<MyRequest[]>([])
const loading = ref(true)
const loadError = ref('')
const loggingOut = ref(false)

async function loadRequests() {
  loading.value = true
  loadError.value = ''
  try {
    const { data, error } = await supabase
      .from('project_requests')
      .select('id, reference_number, project_type, problem_description, status, priority, created_at')
      .order('created_at', { ascending: false })
    if (error) throw error
    requests.value = (data as MyRequest[]) ?? []
  } catch {
    loadError.value = 'We could not load your requests right now. Please try again shortly.'
  } finally {
    loading.value = false
  }
}

onMounted(loadRequests)

async function handleLogout() {
  loggingOut.value = true
  await logout()
  await router.replace('/')
}

const statusLabels: Record<string, string> = {
  NEW: 'New',
  REVIEWING: 'Reviewing',
  DISCOVERY: 'Discovery',
  PROPOSAL: 'Proposal',
  APPROVED: 'Approved',
  BUILDING: 'Building',
  TESTING: 'Testing',
  LAUNCHED: 'Launched',
  SUPPORT: 'Support',
  REJECTED: 'Not proceeding',
  ARCHIVED: 'Archived'
}
const statusTone: Record<string, string> = {
  LAUNCHED: 'badge--success',
  APPROVED: 'badge--success',
  SUPPORT: 'badge--success',
  REJECTED: 'badge--muted',
  ARCHIVED: 'badge--muted'
}
const fmt = (d: string) => new Date(d).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
</script>

<template>
  <AuthShell wide :title="`Welcome, ${state.user?.name || 'there'}`" subtitle="Here’s everything you’ve sent to Millenium Tech.">
    <div class="acct-bar">
      <router-link class="btn btn--accent btn--sm" to="/contact">Send a new request</router-link>
      <div class="btn-row" style="gap: 0.5rem">
        <button class="btn btn--secondary btn--sm" type="button" :disabled="loading" @click="loadRequests">Refresh</button>
        <button class="btn btn--secondary btn--sm" type="button" :disabled="loggingOut" @click="handleLogout">
          <Icon name="log-out" :size="16" /> {{ loggingOut ? 'Logging out…' : 'Log out' }}
        </button>
      </div>
    </div>

    <div v-if="loading" class="acct-list" aria-busy="true" aria-label="Loading your requests">
      <div class="acct-skel"></div><div class="acct-skel"></div>
    </div>

    <div v-else-if="loadError" class="auth-alert auth-alert--error" role="alert">
      <Icon name="alert" :size="18" />
      <span>{{ loadError }} <button class="auth-link" type="button" @click="loadRequests">Try again</button></span>
    </div>

    <div v-else-if="!requests.length" class="acct-empty">
      <p>You haven’t sent a request yet.</p>
      <p><router-link class="auth-link" to="/contact">Get a free consultation</router-link> to start one.</p>
    </div>

    <ul v-else class="acct-list">
      <li v-for="r in requests" :key="r.id" class="acct-item">
        <div class="acct-item__head">
          <strong>{{ r.reference_number }}</strong>
          <span class="badge" :class="statusTone[r.status]">{{ statusLabels[r.status] || r.status }}</span>
        </div>
        <p class="acct-item__desc">{{ r.problem_description }}</p>
        <p class="acct-item__meta">Submitted {{ fmt(r.created_at) }}</p>
      </li>
    </ul>
  </AuthShell>
</template>
