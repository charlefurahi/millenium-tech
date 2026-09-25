<script setup lang="ts">
import { computed } from 'vue'
import Icon from '@/components/ui/Icon.vue'
import PageHero from '@/components/ui/PageHero.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import FaqList from '@/components/ui/FaqList.vue'
import CtaBand from '@/components/ui/CtaBand.vue'
import ProjectCard from '@/components/ui/ProjectCard.vue'
import { getService, services } from '@/data/services'
import { projects } from '@/data/projects'
import { waLink } from '@/config/site'

const props = defineProps<{ slug: string }>()

const service = computed(() => getService(props.slug)!)
const page = computed(() => service.value.page)
const related = computed(() => projects.filter((p) => p.category === page.value.relatedCategory))
const others = computed(() => services.filter((s) => s.slug !== props.slug).slice(0, 3))
const enquiry = computed(() => ({ path: '/contact', query: { service: service.value.formValue } }))
</script>

<template>
  <div>
    <PageHero
      :eyebrow="page.eyebrow"
      :title="page.heading"
      :lead="page.lead"
      :crumbs="[{ label: 'Services', to: '/services' }, { label: service.title }]"
    >
      <router-link class="btn btn--accent btn--lg" :to="enquiry" data-track="cta_click" data-track-label="service_hero_quote">
        Request a quotation
      </router-link>
      <a class="btn btn--outline btn--lg" :href="waLink(page.waMessage)" target="_blank" rel="noopener" data-track="whatsapp_click" :data-track-label="`service_${service.slug}`">
        <Icon name="whatsapp" :size="18" /> WhatsApp us
      </a>
      <template #media>
        <img :src="service.image" :alt="service.imageAlt" width="736" height="552" fetchpriority="high" decoding="async" />
      </template>
    </PageHero>

    <section v-if="page.notice" class="notice">
      <div class="container">
        <Icon name="shield" :size="20" />
        <p>{{ page.notice }}</p>
      </div>
    </section>

    <!-- Problem -->
    <section class="section">
      <div class="container">
        <SectionHeader eyebrow="The problem" title="Sound familiar?" />
        <div class="grid grid--4">
          <article v-for="(p, i) in page.problems" :key="p.title" v-reveal="i * 60" class="card problem">
            <h3>{{ p.title }}</h3>
            <p>{{ p.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Solution + deliverables -->
    <section class="section section--alt">
      <div class="container">
        <SectionHeader eyebrow="How we help" :title="page.solutionTitle" :lead="page.solutionText" />
        <div class="grid grid--3">
          <article v-for="(d, i) in page.deliverables" :key="d.title" v-reveal="(i % 3) * 60" class="card deliver">
            <span class="icon-badge"><Icon :name="d.icon" :size="24" /></span>
            <h3>{{ d.title }}</h3>
            <p>{{ d.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Who it is for + what we need -->
    <section class="section">
      <div class="container grid grid--2 duo">
        <div v-reveal class="card">
          <h3>Who this is for</h3>
          <ul class="checklist">
            <li v-for="w in page.forWho" :key="w">{{ w }}</li>
          </ul>
        </div>
        <div v-reveal="80" class="card">
          <h3>What we’ll need from you</h3>
          <ul class="checklist">
            <li v-for="w in page.provide" :key="w">{{ w }}</li>
          </ul>
          <p class="hint">Don’t have everything yet? That’s fine — we’ll help you work it out.</p>
        </div>
      </div>
    </section>

    <!-- Process -->
    <section class="section section--dark">
      <div class="container">
        <SectionHeader center eyebrow="Process" title="How the work comes together." class="section-head--band" />
        <ol class="steps">
          <li v-for="(s, i) in page.process" :key="s.title" v-reveal="i * 70">
            <span class="steps__no">0{{ i + 1 }}</span>
            <h3>{{ s.title }}</h3>
            <p>{{ s.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- Related work -->
    <section v-if="related.length" class="section">
      <div class="container">
        <SectionHeader eyebrow="Related work" title="See it in practice." />
        <div class="grid grid--3">
          <div v-for="p in related" :key="p.slug"><ProjectCard :project="p" /></div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section section--alt">
      <div class="container narrow">
        <SectionHeader eyebrow="FAQ" :title="`Questions about ${service.title.toLowerCase()}`" />
        <FaqList :items="page.faqs" />
      </div>
    </section>

    <!-- Other services -->
    <section class="section section--tight">
      <div class="container">
        <SectionHeader eyebrow="More from Millenium Tech" title="Other services you may need." />
        <div class="grid grid--3">
          <router-link v-for="s in others" :key="s.slug" :to="s.path" class="card card--hover other">
            <span class="icon-badge"><Icon :name="s.icon" :size="22" /></span>
            <span>
              <strong>{{ s.title }}</strong>
              <small>{{ s.short }}</small>
            </span>
          </router-link>
        </div>
      </div>
    </section>

    <CtaBand
      :title="page.ctaHeading"
      :text="page.ctaText"
      :wa-message="page.waMessage"
      primary-label="Request a quotation"
      :primary-to="enquiry.path + '?service=' + encodeURIComponent(service.formValue)"
    />
  </div>
</template>

<style scoped>
.notice {
  background: var(--blue-50);
  border-bottom: 1px solid var(--blue-100);
}
.notice .container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-block: 0.9rem;
  font-size: 0.92rem;
  color: var(--navy-800);
}
.notice svg {
  flex: none;
  color: var(--blue-700);
}
.problem {
  display: grid;
  gap: 0.6rem;
  align-content: start;
  border-top: 3px solid var(--aqua-400);
}
.problem h3 {
  font-size: 1.1rem;
}
.problem p,
.deliver p {
  color: var(--ink-2);
  font-size: var(--text-sm);
}
.deliver {
  display: grid;
  gap: 0.8rem;
  align-content: start;
}
.duo .card {
  display: grid;
  gap: 1.1rem;
  align-content: start;
}
.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: var(--s-4);
}
.steps li {
  display: grid;
  gap: 0.5rem;
  align-content: start;
  padding: var(--s-4);
  border: 1px solid var(--line);
  border-radius: var(--radius-l);
}
.steps__no {
  font-family: var(--font-display);
  font-weight: 800;
  letter-spacing: 0.12em;
  font-size: 0.85rem;
  color: var(--text-brand);
}
.steps p {
  color: var(--muted);
  font-size: var(--text-sm);
}
.narrow {
  max-width: 820px;
}
.other {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}
.other strong {
  display: block;
  font-family: var(--font-display);
}
.other small {
  display: block;
  margin-top: 0.25rem;
  color: var(--ink-2);
  font-size: 0.88rem;
  line-height: 1.5;
}
</style>
