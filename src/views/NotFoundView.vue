<script setup lang="ts">
import Icon from '@/components/ui/Icon.vue'
import { services } from '@/data/services'
import { waLink } from '@/config/site'
</script>

<template>
  <section class="section nf">
    <div class="container nf__inner">
      <span class="nf__code" aria-hidden="true">404</span>
      <h1>We couldn’t find that page.</h1>
      <p class="lead">The link may be old or mistyped. Here are some helpful places to go next.</p>
      <div class="btn-row btn-row--stack">
        <router-link class="btn btn--lg" to="/">Back to home</router-link>
        <router-link class="btn btn--secondary btn--lg" to="/contact">Contact us</router-link>
        <a class="btn btn--wa btn--lg" :href="waLink()" target="_blank" rel="noopener"><Icon name="whatsapp" :size="18" /> WhatsApp</a>
      </div>
      <ul class="nf__links">
        <li v-for="s in services.slice(0, 6)" :key="s.slug"><router-link :to="s.path">{{ s.title }}</router-link></li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.nf {
  min-height: 60vh;
  display: grid;
  align-items: center;
  background: var(--mist);
}
.nf__inner {
  display: grid;
  gap: 1.25rem;
  justify-items: start;
  max-width: 760px;
}
.nf__code {
  font-family: var(--font-display);
  font-size: clamp(4rem, 12vw, 7rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.05em;
  color: var(--blue-600);
}
.nf__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.25rem;
  margin-top: 0.5rem;
  color: var(--blue-700);
  font-weight: 600;
}
.nf__links a {
  display: inline-flex;
  min-height: 40px;
  align-items: center;
  text-decoration: underline;
  text-underline-offset: 3px;
}
</style>
