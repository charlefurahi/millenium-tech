<script setup lang="ts">
import type { Service } from '@/data/services'
import Icon from './Icon.vue'
defineProps<{ service: Service }>()
</script>

<template>
  <article class="service card card--hover">
    <router-link :to="service.path" class="service__media" tabindex="-1" aria-hidden="true">
      <img :src="service.image" :alt="service.imageAlt" width="736" height="552" loading="lazy" decoding="async" />
    </router-link>
    <div class="service__body">
      <div class="service__title">
        <span class="icon-badge"><Icon :name="service.icon" :size="22" /></span>
        <h3>
          <router-link :to="service.path" class="service__link">{{ service.title }}</router-link>
        </h3>
      </div>
      <p>{{ service.short }}</p>
      <ul class="checklist">
        <li v-for="item in service.items" :key="item">{{ item }}</li>
      </ul>
      <router-link :to="service.path" class="link-arrow" :aria-label="`Learn more about ${service.title}`">
        Learn more <Icon name="arrow-right" :size="16" />
      </router-link>
    </div>
  </article>
</template>

<style scoped>
.service {
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
  position: relative;
}
.service__media {
  display: block;
  overflow: hidden;
  background: var(--mist);
}
.service__media img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  transition: transform 0.5s var(--ease);
}
.service:hover .service__media img {
  transform: scale(1.04);
}
.service__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--s-3);
  padding: var(--s-4);
}
.service__title {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}
/* No font-size override here on purpose: letting h3 use the shared --h3
   clamp keeps title size consistent with ProjectCard and PackageCard at
   every viewport width, instead of drifting apart above ~600px. */
/* Whole card is clickable through the title link */
.service__link::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
}
.service p {
  color: var(--ink-2);
  font-size: var(--text-sm);
}
.service .link-arrow {
  margin-top: auto;
  padding-top: 0.25rem;
  position: relative;
  z-index: 2;
}
</style>
