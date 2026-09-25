<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { Package } from '@/data/packages'
import { useAuth } from '@/composables/useAuth'
import Icon from '@/components/ui/Icon.vue'

const props = defineProps<{ pack: Package }>()

const priceText = computed(() => {
  const p = props.pack.price
  if (!p) return null
  return `${p.prefix ? p.prefix + ' ' : ''}TSh ${p.amount.toLocaleString('en-US')}`
})

// Visitors see the package name, audience and a couple of inclusions —
// enough to compare packages at a glance. The exact price and full
// inclusion list are part of "the full website" and need a login.
const route = useRoute()
const { state } = useAuth()
const previewCount = 2
const preview = computed(() => props.pack.includes.slice(0, previewCount))
const hiddenCount = computed(() => Math.max(props.pack.includes.length - previewCount, 0))
</script>

<template>
  <article class="pack" :class="{ 'pack--featured brand-surface hex-bg': pack.featured }">
    <span v-if="pack.featured" class="badge badge--amber pack__flag">Most popular</span>
    <div class="pack__head">
      <h3>{{ pack.name }}</h3>
      <p>{{ pack.audience }}</p>
    </div>

    <div class="pack__price">
      <template v-if="state.user">
        <span class="pack__billing">{{ pack.billing }}</span>
        <strong v-if="priceText">{{ priceText }}</strong>
        <strong v-else>Quotation on request</strong>
        <small v-if="pack.price?.note">{{ pack.price.note }}</small>
      </template>
      <template v-else>
        <span class="pack__billing">{{ pack.billing }}</span>
        <strong class="pack__price--locked"><Icon name="lock" :size="16" /> Log in to see price</strong>
      </template>
    </div>

    <ul class="checklist" :class="{ 'checklist--light': pack.featured }">
      <li v-for="item in (state.user ? pack.includes : preview)" :key="item">{{ item }}</li>
      <li v-if="!state.user && hiddenCount" class="checklist__more">
        <router-link :to="{ path: '/login', query: { redirect: route.fullPath } }">+{{ hiddenCount }} more — log in to see the full list</router-link>
      </li>
    </ul>

    <router-link
      v-if="state.user"
      class="btn btn--block"
      :class="pack.featured ? 'btn--accent' : 'btn--secondary'"
      :to="{ path: '/contact', query: { service: pack.formValue, package: pack.name } }"
      data-track="cta_click"
      :data-track-label="`package_${pack.id}`"
    >
      {{ pack.cta }}
    </router-link>
    <router-link
      v-else
      class="btn btn--block"
      :class="pack.featured ? 'btn--accent' : 'btn--secondary'"
      :to="{ path: '/login', query: { redirect: route.fullPath } }"
      data-track="cta_click"
      :data-track-label="`package_locked_${pack.id}`"
    >
      Log in to view &amp; request
    </router-link>
  </article>
</template>

<style scoped>
.pack {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--s-4);
  padding: var(--s-4);
  border: 1px solid var(--line);
  border-radius: var(--radius-l);
}
.pack:not(.pack--featured) {
  background: var(--card);
}
.pack--featured {
  border-color: var(--blue-600);
  color: #fff;
  box-shadow: var(--shadow-l);
}
.pack__flag {
  position: absolute;
  top: -12px;
  left: var(--s-4);
}
.pack__head {
  display: grid;
  gap: 0.5rem;
}
.pack__head p {
  color: var(--ink-2);
  font-size: var(--text-sm);
  min-height: 3em;
}
.pack--featured .pack__head p {
  color: var(--on-dark-2);
}
.pack__price {
  display: grid;
  gap: 0.15rem;
  padding-block: 1rem;
  border-block: 1px solid var(--line);
}
.pack--featured .pack__price {
  border-color: var(--line-dark);
}
.pack__billing {
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
}
.pack--featured .pack__billing {
  color: var(--aqua-300);
}
.pack__price strong {
  font-family: var(--font-display);
  font-size: 1.35rem;
  letter-spacing: -0.02em;
}
.pack__price small {
  color: var(--muted);
}
.pack__price--locked {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 1rem;
  color: var(--text-brand);
}
.pack--featured .pack__price--locked {
  color: var(--aqua-300);
}
.pack .checklist {
  flex: 1;
}
.checklist__more {
  list-style: none;
  margin-left: -1.4em;
}
.checklist__more a {
  color: var(--text-brand);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
}
.pack--featured .checklist__more a {
  color: var(--aqua-300);
}
</style>
