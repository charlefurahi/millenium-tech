<script setup lang="ts">
import type { Project } from '@/data/projects'
import Icon from './Icon.vue'

defineProps<{ project: Project }>()
</script>

<template>
  <article class="project card card--hover">
    <router-link
      :to="`/portfolio/${project.slug}`"
      class="project__media"
      tabindex="-1"
      aria-hidden="true"
    >
      <img
        :src="project.image"
        :alt="project.imageAlt"
        width="1280"
        height="720"
        loading="lazy"
        decoding="async"
      />
    </router-link>

    <div class="project__body">
      <span class="badge">
        {{ project.categoryLabel }}
      </span>

      <h3>
        <router-link
          :to="`/portfolio/${project.slug}`"
          class="project__link"
          data-track="project_click"
          :data-track-label="project.slug"
        >
          {{ project.title }}
        </router-link>
      </h3>

      <p class="project__meta">
        {{ project.client }} · {{ project.industry }}
      </p>

      <p>
        {{ project.summary }}
      </p>

      <span class="link-arrow">
        View case study
        <Icon name="arrow-right" :size="16" />
      </span>
    </div>
  </article>
</template>

<style scoped>
.project {
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
  position: relative;
}

.project__media {
  display: block;
  overflow: hidden;
  background: var(--mist);
  aspect-ratio: 16 / 10;
}

.project__media img {
  width: 100%;
  height: 100%;
  display: block;

  /*
   * Cover keeps every portfolio card the same height while
   * preserving the artwork as much as possible.
   */
  object-fit: cover;
  object-position: center;

  transition:
    transform 0.5s var(--ease),
    filter 0.35s var(--ease);
}

.project:hover .project__media img {
  transform: scale(1.03);
}

.project__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--s-3);
  padding: var(--s-4);
}

.project__link::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
}

.project__meta {
  font-size: 0.85rem;
  color: var(--muted);
}

.project p:not(.project__meta) {
  color: var(--ink-2);
  font-size: var(--text-sm);
}

.project .link-arrow {
  margin-top: auto;
  padding-top: 0.3rem;
}


/* ================================================================
   Branding artwork
   ================================================================ */

.project[data-category='branding'] .project__media img {
  object-position: center;
}


/* ================================================================
   Mobile
   ================================================================ */

@media (max-width: 599px) {
  .project__media {
    aspect-ratio: 16 / 10;
  }

  .project__body {
    padding: 1.1rem;
  }
}
</style>