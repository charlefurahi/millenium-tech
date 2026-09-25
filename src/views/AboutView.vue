<script setup lang="ts">
import Icon from '@/components/ui/Icon.vue'
import PageHero from '@/components/ui/PageHero.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import CtaBand from '@/components/ui/CtaBand.vue'
import founderPhoto from '@/assets/img/hero-photo.webp'
import { about } from '@/data/content'
import { site } from '@/config/site'
</script>

<template>
  <div>
    <PageHero
      eyebrow="About Millenium Tech"
      title="Technology should be useful, understandable and within reach."
      lead="We help businesses in Tanzania use websites, design and technology with more clarity and confidence."
      :crumbs="[{ label: 'About' }]"
    />

    <section class="section">
      <div class="container story">
        <div v-reveal class="story__copy">
          <span class="eyebrow">Our story</span>
          <h2>Built to bridge Tanzania’s digital gap.</h2>
          <p v-for="para in about.story" :key="para" class="lead">{{ para }}</p>
        </div>
        <figure v-reveal="80" class="story__media">
          <img :src="founderPhoto" alt="Founder of Millenium Tech" width="760" height="1256" loading="lazy" decoding="async" />
          <figcaption class="story__caption">Founder, Millenium Tech</figcaption>
        </figure>
      </div>
    </section>

    <section class="section">
      <div class="container mission section-head--band">
        <Icon name="quote" :size="40" class="mission__mark" />
        <blockquote v-reveal>{{ about.motto }}</blockquote>
        <p class="mission__by">Our mission</p>
      </div>
    </section>

    <section v-if="site.stats.show" class="section section--tight">
      <div class="container">
        <ul class="facts">
          <li v-for="s in site.stats.items" :key="s.label" v-reveal>
            <strong>{{ s.value }}</strong>
            <span>{{ s.label }}</span>
          </li>
        </ul>
      </div>
    </section>

    <section class="section section--alt">
      <div class="container">
        <SectionHeader eyebrow="What guides our work" title="Values you can see in how we work." />
        <div class="grid grid--3">
          <article v-for="(v, i) in about.values" :key="v.title" v-reveal="(i % 3) * 60" class="card value">
            <span class="icon-badge"><Icon :name="v.icon" :size="24" /></span>
            <h3>{{ v.title }}</h3>
            <p>{{ v.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container split">
        <div v-reveal>
          <SectionHeader eyebrow="What makes us different" title="One practical team for your digital needs." />
          <ul class="checklist">
            <li v-for="d in about.differences" :key="d">{{ d }}</li>
          </ul>
        </div>
        <div v-reveal="80">
          <span class="eyebrow">Milestones</span>
          <ol class="timeline">
            <li v-for="t in about.timeline" :key="t.year">
              <span class="timeline__year">{{ t.year }}</span>
              <div>
                <h3>{{ t.title }}</h3>
                <p>{{ t.text }}</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <!-- Team: shown only when real people are added in data/content.ts -->
    <section v-if="about.team.length" class="section section--alt">
      <div class="container">
        <SectionHeader eyebrow="Our team" title="The people behind the work." />
        <div class="grid grid--3">
          <article v-for="m in about.team" :key="m.name" class="card member">
            <img v-if="m.photo" :src="m.photo" :alt="m.name" loading="lazy" />
            <h3>{{ m.name }}</h3>
            <p>{{ m.role }}</p>
          </article>
        </div>
      </div>
    </section>

    <CtaBand eyebrow="Work with us" title="Let’s talk about what your business needs next." text="Start with a short consultation and a practical conversation." />
  </div>
</template>

<style scoped>
.story {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: clamp(2rem, 6vw, 5rem);
  align-items: center;
}
.story__copy {
  display: grid;
  gap: 1.1rem;
}
.story__media {
  position: relative;
  margin: 0;
  max-width: 360px;
  justify-self: center;
}
.story__media img {
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  object-position: top center;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-m);
  background: linear-gradient(160deg, var(--blue-500), var(--blue-700) 85%);
}
.story__caption {
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  background: rgba(7, 27, 58, 0.82);
  color: #fff;
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  backdrop-filter: blur(4px);
}
@media (max-width: 899px) {
  .story {
    grid-template-columns: minmax(0, 1fr);
  }
}
.mission {
  display: grid;
  gap: 1.25rem;
  justify-items: center;
  text-align: center;
  max-width: 880px;
}
/* Locks the quote card's width to 880px regardless of stylesheet load
   order now that .section-head--band (global, ui.css) is mixed onto the
   same element -- two classes gives this selector higher specificity
   than either .mission or .section-head--band alone. */
.mission.section-head--band {
  max-width: 880px;
  margin-inline: auto;
}
.mission__mark {
  color: var(--aqua-400);
}
.mission blockquote {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 3vw, 2.1rem);
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.02em;
}
.mission__by {
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--aqua-300);
}
.facts {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--s-4);
  text-align: center;
}
.facts strong {
  display: block;
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--text-brand);
}
.facts span {
  color: var(--muted);
}
@media (max-width: 639px) {
  .facts {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
.value {
  display: grid;
  gap: 0.8rem;
  align-content: start;
}
.value p {
  color: var(--ink-2);
  font-size: var(--text-sm);
}
.split {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(2rem, 6vw, 5rem);
  align-items: start;
}
@media (max-width: 899px) {
  .split {
    grid-template-columns: minmax(0, 1fr);
  }
}
.timeline {
  display: grid;
  gap: 0;
  margin-top: 1.25rem;
}
.timeline li {
  position: relative;
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 1rem;
  padding-bottom: 1.75rem;
}
.timeline li:not(:last-child)::before {
  content: '';
  position: absolute;
  left: 79px;
  top: 14px;
  bottom: -2px;
  border-left: 2px solid var(--line);
}
.timeline li::after {
  content: '';
  position: absolute;
  left: 74px;
  top: 6px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--blue-600);
  box-shadow: 0 0 0 4px var(--blue-50);
}
.timeline__year {
  font-family: var(--font-display);
  font-weight: 800;
  color: var(--text-brand);
}
.timeline li > div {
  padding-left: 1.1rem;
}
.timeline p {
  color: var(--ink-2);
  font-size: var(--text-sm);
}
.member img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: var(--radius-m);
  margin-bottom: 1rem;
}
</style>
