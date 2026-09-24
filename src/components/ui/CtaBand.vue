<script setup lang="ts">
import { waLink } from '@/config/site'

withDefaults(
  defineProps<{ eyebrow?: string; title: string; text: string; waMessage?: string; primaryLabel?: string; primaryTo?: string }>(),
  { eyebrow: 'Start a conversation', primaryLabel: 'Get a free consultation', primaryTo: '/contact' }
)
</script>

<template>
  <section class="cta on-dark brand-surface hex-bg">
    <div class="container cta__inner" v-reveal>
      <div class="cta__copy">
        <span class="eyebrow">{{ eyebrow }}</span>
        <h2>{{ title }}</h2>
        <p>{{ text }}</p>
      </div>
      <div class="btn-row btn-row--stack">
        <router-link class="btn btn--accent btn--lg" :to="primaryTo" data-track="cta_click" :data-track-label="primaryLabel">
          {{ primaryLabel }}
        </router-link>
        <a
          class="btn btn--outline btn--lg"
          :href="waLink(waMessage)"
          target="_blank"
          rel="noopener"
          data-track="whatsapp_click"
          data-track-label="cta_band"
        >
          WhatsApp us
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  color: #fff;
  padding-block: clamp(3rem, 7vw, 5rem);
}
.cta__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--s-5);
}
.cta__copy {
  display: grid;
  gap: 0.9rem;
  max-width: 640px;
}
.cta p {
  color: var(--on-dark-2);
  font-size: var(--text-lg);
}
@media (max-width: 899px) {
  .cta__inner {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
