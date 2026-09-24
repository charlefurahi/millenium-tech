<script setup lang="ts">
import { computed, ref } from 'vue'
import Icon from '@/components/ui/Icon.vue'
import PageHero from '@/components/ui/PageHero.vue'
import ProjectCard from '@/components/ui/ProjectCard.vue'
import CtaBand from '@/components/ui/CtaBand.vue'
import { projectCategories, projects } from '@/data/projects'

const filter = ref<string>('all')

const shown = computed(() =>
  filter.value === 'all'
    ? projects
    : projects.filter((p) => p.category === filter.value)
)
</script>

<template>
  <div>
    <PageHero
      eyebrow="Portfolio"
      title="Work we've built, designed and delivered."
      lead="Explore websites, digital platforms, branding and technology projects created for real businesses and organisations."
      :crumbs="[{ label: 'Portfolio' }]"
    />

    <section class="section">
      <div class="container">

        <div
          class="filters"
          role="group"
          aria-label="Filter projects"
        >
          <button
            v-for="c in projectCategories"
            :key="c.key"
            type="button"
            class="chip"
            :class="{ 'is-active': filter === c.key }"
            :aria-pressed="filter === c.key"
            @click="filter = c.key"
          >
            {{ c.label }}
          </button>
        </div>

        <div class="grid grid--3">
          <div
            v-for="p in shown"
            :key="p.slug"
          >
            <ProjectCard :project="p" />
          </div>

          <aside class="card next">
            <span class="icon-badge">
              <Icon name="rocket" :size="24" />
            </span>

            <h3>Your project could be next.</h3>

            <p>
              Tell us what you want to achieve and we’ll suggest
              a practical way to get there.
            </p>

            <router-link
              class="btn"
              to="/contact"
            >
              Start a conversation
            </router-link>
          </aside>
        </div>

      </div>
    </section>

    <CtaBand
      eyebrow="Your next project"
      title="Let’s make something you’ll be proud to share."
      text="Talk through the outcome you want, and we’ll help shape the right approach."
    />
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: var(--s-5);
}

.chip {
  min-height: 44px;
  padding: 0 1.1rem;

  border: 1.5px solid var(--line-strong);
  border-radius: 999px;

  background: var(--card);
  color: var(--ink);

  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.9rem;

  transition:
    background-color 0.2s,
    color 0.2s,
    border-color 0.2s,
    transform 0.2s;
}

.chip:hover {
  border-color: var(--blue-500);
}

.chip:active {
  transform: translateY(1px);
}

.chip.is-active {
  background: var(--blue-600);
  border-color: var(--blue-600);
  color: #fff;
}

.next {
  display: grid;
  gap: 1rem;
  align-content: center;
  justify-items: start;

  background: var(--blue-50);

  border-style: dashed;
  border-color: var(--blue-500);
}

.next p {
  color: var(--ink-2);
}
</style>