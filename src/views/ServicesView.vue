<script setup lang="ts">
import Icon from '@/components/ui/Icon.vue'
import PageHero from '@/components/ui/PageHero.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import ServiceCard from '@/components/ui/ServiceCard.vue'
import CtaBand from '@/components/ui/CtaBand.vue'
import { services } from '@/data/services'
import { needsGuide, process } from '@/data/content'
</script>

<template>
  <div>
    <PageHero
      eyebrow="Services"
      title="Useful technology and design, shaped around the job to be done."
      lead="From your first website to computer repair and custom business systems — one team, clear scope, and support after delivery."
      :crumbs="[{ label: 'Services' }]"
    >
      <router-link class="btn btn--accent btn--lg" to="/contact">Get a free consultation</router-link>
    </PageHero>

    <section class="section">
      <div class="container">
        <div class="grid grid--3">
          <div v-for="(s, i) in services" :key="s.slug" v-reveal="(i % 3) * 70" class="item">
            <ServiceCard :service="s" />
          </div>
        </div>
      </div>
    </section>

    <section class="section section--alt">
      <div class="container">
        <SectionHeader
          eyebrow="Not sure where to start?"
          title="Which service do I need?"
          lead="Find the sentence that sounds like your situation."
        />
        <ul class="guide">
          <li v-for="g in needsGuide" :key="g.to" v-reveal>
            <router-link :to="g.to" class="guide__row">
              <span class="guide__need">{{ g.need }}</span>
              <span class="guide__service">{{ g.service }} <Icon name="arrow-right" :size="16" /></span>
            </router-link>
          </li>
        </ul>
      </div>
    </section>

    <section class="section section--dark">
      <div class="container">
        <SectionHeader center eyebrow="How we work" title="A clear process from first conversation to support." class="section-head--band" />
        <ol class="flow">
          <li v-for="(s, i) in process" :key="s.title" v-reveal="i * 60">
            <span class="flow__icon"><Icon :name="s.icon" :size="22" /></span>
            <div>
              <h3>{{ i + 1 }}. {{ s.title }}</h3>
              <p>{{ s.text }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <CtaBand title="Tell us what you’re trying to improve." text="We’ll help you decide whether a website, design, support or a custom solution makes sense." />
  </div>
</template>

<style scoped>
.item {
  display: flex;
}
.item > :deep(*) {
  flex: 1;
}
.guide {
  display: grid;
  gap: 0.6rem;
}
.guide__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  min-height: 60px;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: var(--radius-m);
  transition: border-color 0.2s, transform 0.2s var(--ease), box-shadow 0.2s;
}
.guide__row:hover {
  border-color: var(--blue-500);
  transform: translateX(4px);
  box-shadow: var(--shadow-s);
}
.guide__need {
  font-weight: 600;
}
.guide__service {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  flex: none;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.93rem;
  color: var(--text-brand);
}
@media (max-width: 699px) {
  .guide__row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.35rem;
  }
}
.flow {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: var(--s-4);
}
.flow li {
  display: grid;
  gap: 0.8rem;
  align-content: start;
}
.flow__icon {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--blue-50);
  color: var(--blue-700);
}
.flow h3 {
  font-size: 1.05rem;
  margin-bottom: 0.25rem;
}
.flow p {
  color: var(--muted);
  font-size: var(--text-sm);
}
@media (max-width: 1023px) {
  .flow {
    grid-template-columns: minmax(0, 1fr);
  }
  .flow li {
    grid-template-columns: 48px 1fr;
    align-items: start;
    gap: 1rem;
  }
}
</style>
