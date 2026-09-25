<script setup lang="ts">
import { computed } from 'vue'
import Icon from '@/components/ui/Icon.vue'
import PageHero from '@/components/ui/PageHero.vue'
import ProjectCard from '@/components/ui/ProjectCard.vue'
import CtaBand from '@/components/ui/CtaBand.vue'
import AuthGate from '@/components/ui/AuthGate.vue'
import { getProject, projects } from '@/data/projects'

const props = defineProps<{ slug: string }>()
const project = computed(() => getProject(props.slug)!)
const more = computed(() => projects.filter((p) => p.slug !== props.slug).slice(0, 2))
</script>

<template>
  <div>
    <PageHero
      :eyebrow="project.categoryLabel"
      :title="project.title"
      :lead="project.summary"
      :crumbs="[{ label: 'Portfolio', to: '/portfolio' }, { label: project.title }]"
    >
      <router-link v-if="project.href" class="btn btn--accent" :to="project.href.url">{{ project.href.label }}</router-link>
    </PageHero>

    <section class="section">
      <div class="container case">
        <figure v-reveal class="case__media">
          <img :src="project.image" :alt="project.imageAlt" width="1280" height="720" fetchpriority="high" decoding="async" />
        </figure>

        <div class="case__body">
          <dl class="facts card">
            <div><dt>Client</dt><dd>{{ project.client }}</dd></div>
            <div><dt>Industry</dt><dd>{{ project.industry }}</dd></div>
            <div><dt>Type</dt><dd>{{ project.categoryLabel }}</dd></div>
            <div v-if="project.tech?.length"><dt>Built with</dt><dd>{{ project.tech.join(', ') }}</dd></div>
          </dl>

          <div class="story">
            <section v-reveal>
              <h2>The challenge</h2>
              <p>{{ project.challenge }}</p>
            </section>

            <AuthGate
              title="Log in to see the full case study"
              text="Create a free account or log in to see how we approached this project, everything we delivered, and the results — the same detail we'd walk you through for your own project."
            >
              <section v-reveal>
                <h2>Our solution</h2>
                <p>{{ project.solution }}</p>
              </section>
              <section v-reveal>
                <h2>What we delivered</h2>
                <ul class="checklist">
                  <li v-for="d in project.delivered" :key="d">{{ d }}</li>
                </ul>
              </section>
              <section v-if="project.result" v-reveal>
                <h2>Result</h2>
                <p>{{ project.result }}</p>
              </section>
            </AuthGate>
          </div>
        </div>
      </div>
    </section>

    <section v-if="more.length" class="section section--alt">
      <div class="container">
        <h2 class="more-title">More projects</h2>
        <div class="grid grid--2">
          <div v-for="p in more" :key="p.slug"><ProjectCard :project="p" /></div>
        </div>
        <p class="back"><router-link class="link-arrow" to="/portfolio"><Icon name="arrow-right" :size="16" /> All projects</router-link></p>
      </div>
    </section>

    <CtaBand title="Want results like this for your business?" text="Tell us what you need and we’ll suggest a practical next step." />
  </div>
</template>

<style scoped>
.case {
  display: grid;
  gap: var(--s-6);
}
.case__media {
  margin: 0;
  overflow: hidden;
  border-radius: var(--radius-xl);
  border: 1px solid var(--line);
  box-shadow: var(--shadow-m);
  background: var(--mist);
}
.case__media img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  object-position: top center;
}
.case__body {
  display: grid;
  grid-template-columns: minmax(0, 0.7fr) minmax(0, 1.3fr);
  gap: var(--s-6);
  align-items: start;
}
.facts {
  display: grid;
  gap: 1rem;
  position: sticky;
  top: calc(var(--header-h) + 1.5rem);
}
.facts dt {
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
}
.facts dd {
  margin: 0.15rem 0 0;
  font-weight: 600;
}
.story {
  display: grid;
  gap: var(--s-5);
}
.story h2 {
  font-size: 1.5rem;
  margin-bottom: 0.6rem;
}
.story p {
  color: var(--ink-2);
  max-width: 62ch;
}
.more-title {
  margin-bottom: var(--s-4);
}
.back {
  margin-top: var(--s-4);
}
.back svg {
  transform: rotate(180deg);
}
@media (max-width: 899px) {
  .case__body {
    grid-template-columns: minmax(0, 1fr);
  }
  .facts {
    position: static;
  }
}
</style>
