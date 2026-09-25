<script setup lang="ts">
/**
 * AuthGate — shows the default slot only to signed-in visitors.
 * Guests see the (optional) #teaser slot plus a locked card that sends
 * them to /login (or /register) with a redirect back to this page.
 *
 * Usage:
 *   <AuthGate title="See full pricing" text="Create a free account to see exact prices and full inclusions.">
 *     <template #teaser>...always-visible preview...</template>
 *     ...full content, only rendered once the visitor is logged in...
 *   </AuthGate>
 */
import { useRoute } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import Icon from '@/components/ui/Icon.vue'

withDefaults(
  defineProps<{
    title?: string
    text?: string
  }>(),
  {
    title: 'Log in to see the full details',
    text: 'Create a free account or log in — it takes a minute and keeps you within reach of the full website.'
  }
)

const route = useRoute()
const { state } = useAuth()
</script>

<template>
  <div class="auth-gate">
    <slot v-if="$slots.teaser" name="teaser" />

    <slot v-if="state.user" />

    <div v-else class="auth-gate__lock card">
      <span class="auth-gate__icon"><Icon name="lock" :size="20" /></span>
      <h3>{{ title }}</h3>
      <p>{{ text }}</p>
      <div class="auth-gate__actions">
        <router-link class="btn btn--accent" :to="{ path: '/login', query: { redirect: route.fullPath } }">Log in</router-link>
        <router-link class="btn btn--outline" :to="{ path: '/register', query: { redirect: route.fullPath } }">Create free account</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-gate {
  display: grid;
  gap: var(--s-4);
}
.auth-gate__lock {
  display: grid;
  justify-items: start;
  gap: 0.6rem;
  padding: var(--s-5);
  text-align: left;
}
.auth-gate__icon {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--blue-50);
  color: var(--text-brand);
}
.auth-gate__lock h3 {
  margin: 0;
  font-size: 1.05rem;
}
.auth-gate__lock p {
  margin: 0;
  color: var(--ink-2);
  font-size: var(--text-sm);
  max-width: 46ch;
}
.auth-gate__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 0.4rem;
}
</style>
