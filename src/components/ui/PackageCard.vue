<script setup lang="ts">
import { computed } from 'vue'
import type { Package } from '@/data/packages'

const props = defineProps<{ pack: Package }>()

const priceText = computed(() => {
  const p = props.pack.price
  if (!p) return null
  return `${p.prefix ? p.prefix + ' ' : ''}TSh ${p.amount.toLocaleString('en-US')}`
})
</script>

<template>
  <article class="pack" :class="{ 'pack--featured brand-surface hex-bg': pack.featured }">
    <span v-if="pack.featured" class="badge badge--amber pack__flag">Most popular</span>
    <div class="pack__head">
      <h3>{{ pack.name }}</h3>
      <p>{{ pack.audience }}</p>
    </div>
    <div class="pack__price">
      <span class="pack__billing">{{ pack.billing }}</span>
      <strong v-if="priceText">{{ priceText }}</strong>
      <strong v-else>Quotation on request</strong>
      <small v-if="pack.price?.note">{{ pack.price.note }}</small>
    </div>
    <ul class="checklist" :class="{ 'checklist--light': pack.featured }">
      <li v-for="item in pack.includes" :key="item">{{ item }}</li>
    </ul>
    <router-link
      class="btn btn--block"
      :class="pack.featured ? 'btn--accent' : 'btn--secondary'"
      :to="{ path: '/contact', query: { service: pack.formValue, package: pack.name } }"
      data-track="cta_click"
      :data-track-label="`package_${pack.id}`"
    >
      {{ pack.cta }}
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
.pack .checklist {
  flex: 1;
}
</style>
