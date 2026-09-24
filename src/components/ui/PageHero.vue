<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  lead?: string
  crumbs?: { label: string; to?: string }[]
  /** Slimmer hero for utility pages (auth, account) that don't need a full banner. */
  compact?: boolean
}>()
</script>

<template>
  <section class="page-hero" :class="{ 'page-hero--compact': compact }">
    <div class="container page-hero__inner" :class="{ 'has-media': $slots.media }">
      <div class="page-hero__copy">
        <nav v-if="crumbs?.length" class="crumbs" aria-label="Breadcrumb">
          <ol>
            <li><router-link to="/">Home</router-link></li>
            <li v-for="c in crumbs" :key="c.label">
              <router-link v-if="c.to" :to="c.to">{{ c.label }}</router-link>
              <span v-else aria-current="page">{{ c.label }}</span>
            </li>
          </ol>
        </nav>
        <span v-if="eyebrow" class="eyebrow">{{ eyebrow }}</span>
        <h1>{{ title }}</h1>
        <p v-if="lead" class="lead">{{ lead }}</p>
        <div v-if="$slots.default" class="page-hero__actions"><slot /></div>
      </div>
      <div v-if="$slots.media" class="page-hero__media"><slot name="media" /></div>
    </div>
  </section>
</template>

<style scoped>
.page-hero {
  position: relative;
  overflow: hidden;
  color: var(--ink);
  background: var(--grad-hero-soft);
  border-bottom: 1px solid var(--line);
  padding-block: clamp(2.75rem, 6vw, 4.75rem);
}
.page-hero__inner {
  display: grid;
  gap: var(--s-5);
  align-items: center;
}
.page-hero__inner.has-media {
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: clamp(2rem, 5vw, 4rem);
}
.page-hero__copy {
  display: grid;
  gap: 1.1rem;
  justify-items: start;
}
.page-hero h1 {
  font-size: clamp(2rem, 4.4vw, 3.3rem);
  max-width: 20ch;
}

/* Compact variant — for auth/account utility pages: same brand
   treatment, far less vertical weight before the actual content. */
.page-hero--compact {
  padding-block: clamp(1.6rem, 3.2vw, 2.25rem);
}
.page-hero--compact .page-hero__inner {
  gap: var(--s-3);
}
.page-hero--compact h1 {
  font-size: clamp(1.5rem, 2.6vw, 2rem);
  max-width: 28ch;
}
.page-hero--compact .lead {
  font-size: 0.95rem;
  max-width: 52ch;
}
.page-hero--compact .crumbs {
  margin-bottom: -0.2rem;
}
.page-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.4rem;
}
.crumbs ol {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--muted);
}
.crumbs li + li::before {
  content: '/';
  margin-right: 0.5rem;
  opacity: 0.6;
}
.crumbs a:hover {
  color: var(--blue-600);
}
.crumbs [aria-current] {
  color: var(--ink-2);
  font-weight: 600;
}
.page-hero :deep(.lead) {
  color: var(--ink-2);
}
.page-hero :deep(.btn--outline) {
  color: var(--blue-700);
  border-color: var(--blue-500);
}
.page-hero :deep(.btn--outline:hover) {
  background: var(--blue-50);
  border-color: var(--blue-600);
}
.page-hero__media {
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-l);
  border: 1px solid var(--line);
  background: var(--mist);
}
.page-hero__media :deep(img) {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}
@media (max-width: 899px) {
  .page-hero__inner.has-media {
    grid-template-columns: minmax(0, 1fr);
  }
  .page-hero__media {
    max-width: 560px;
  }
}
</style>
