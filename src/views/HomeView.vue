<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Icon from '@/components/ui/Icon.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import ServiceCard from '@/components/ui/ServiceCard.vue'
import ProjectCard from '@/components/ui/ProjectCard.vue'
import PackageCard from '@/components/ui/PackageCard.vue'
import FaqList from '@/components/ui/FaqList.vue'
import CtaBand from '@/components/ui/CtaBand.vue'
import consultation from '@/assets/img/consultation.webp'
import heroOne from '@/assets/img/hero-1.webp'
import heroTwo from '@/assets/img/hero-2.jpg'
import heroThree from '@/assets/img/hero-3.jpg'
import { site, waLink } from '@/config/site'
import { services, getService } from '@/data/services'
import { problems, reasons, process, audiences, testimonials } from '@/data/content'
import { packages } from '@/data/packages'
import { projects } from '@/data/projects'
import { faqs } from '@/data/faqs'

// Six core services as cards; business systems get their own banner.
const coreServices = services.filter((s) => s.slug !== 'business-technology')
const systems = getService('business-technology')!

// ---- Hero slideshow ----
// Three images that fade into each other on their own. No controls on purpose.
const heroSlides = [heroOne, heroTwo, heroThree]
const SLIDE_MS = 5500
const activeSlide = ref(0)
let slideTimer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  slideTimer = setInterval(() => {
    activeSlide.value = (activeSlide.value + 1) % heroSlides.length
  }, SLIDE_MS)
})

onBeforeUnmount(() => {
  if (slideTimer) clearInterval(slideTimer)
})
</script>

<template>
  <div>
    <!-- ================= HERO ================= -->
    <section class="hero on-dark brand-surface hex-bg" :style="{ '--slide-ms': `${SLIDE_MS}ms` }">
      <div class="hero__bg" aria-hidden="true">
        <div class="hero__stage">
          <div
            v-for="(src, i) in heroSlides"
            :key="i"
            class="hero__slide"
            :class="{ 'is-active': i === activeSlide }"
          >
            <img
              :src="src"
              alt=""
              width="1600"
              height="1000"
              :loading="i === 0 ? 'eager' : 'lazy'"
              decoding="async"
            />
          </div>
        </div>
        <div class="hero__overlay"></div>
      </div>

      <div class="container hero__copy">
        <span class="eyebrow">{{ site.location.city }}, {{ site.location.country }}</span>
        <h1>Technology that helps your business <span class="hero__accent">grow.</span></h1>
        <p class="lead">
          We build websites, digital brands and practical technology solutions for businesses in Tanzania.
        </p>
        <div class="btn-row btn-row--stack">
          <router-link class="btn btn--accent btn--lg" to="/contact" data-track="cta_click" data-track-label="hero_consultation">
            Get a free consultation
          </router-link>
          <router-link class="btn btn--outline btn--lg" to="/portfolio" data-track="cta_click" data-track-label="hero_work">
            View our work
          </router-link>
        </div>
        <ul class="hero__trust">
          <li><Icon name="languages" :size="18" /> Swahili &amp; English</li>
          <li><Icon name="clock" :size="18" /> {{ site.replyPromise }}</li>
        </ul>
      </div>

      <div class="hero__progress" aria-hidden="true">
        <span v-for="(_, i) in heroSlides" :key="i" :class="{ 'is-active': i === activeSlide }"></span>
      </div>
    </section>

    <!-- ================= PROOF ================= -->
    <section v-if="site.stats.show" class="proof" aria-label="Millenium Tech at a glance">
      <div class="container">
        <ul class="proof__list">
          <li v-for="s in site.stats.items" :key="s.label">
            <strong>{{ s.value }}</strong>
            <span>{{ s.label }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- ================= PROBLEMS ================= -->
    <section class="section">
      <div class="container">
        <SectionHeader
          eyebrow="Problems we solve"
          title="When technology gets in the way, business slows down."
          lead="We remove the friction between your business and the customers you want to reach."
        />
        <div class="grid grid--4">
          <article v-for="(p, i) in problems" :key="p.title" v-reveal="i * 60" class="card problem card--hover">
            <span class="icon-badge"><Icon :name="p.icon" :size="24" /></span>
            <h3>{{ p.title }}</h3>
            <p>{{ p.text }}</p>
            <router-link :to="p.to" class="link-arrow">{{ p.cta }} <Icon name="arrow-right" :size="16" /></router-link>
          </article>
        </div>
      </div>
    </section>

    <!-- ================= SERVICES ================= -->
    <section class="section section--alt">
      <div class="container">
        <SectionHeader
          eyebrow="What we offer"
          title="Services organised around what your business needs."
          lead="Six core services under one roof — choose a starting point, or tell us the problem and we’ll suggest the right one."
        />
        <div class="grid grid--3">
          <div v-for="(s, i) in coreServices" :key="s.slug" v-reveal="(i % 3) * 70" class="grid__item">
            <ServiceCard :service="s" />
          </div>
        </div>

        <router-link v-reveal :to="systems.path" class="systems">
          <div class="systems__copy">
            <span class="badge badge--dark">For larger needs</span>
            <h3>{{ systems.title }}</h3>
            <p>{{ systems.short }}</p>
            <ul class="checklist checklist--light">
              <li v-for="it in systems.items" :key="it">{{ it }}</li>
            </ul>
            <span class="link-arrow">Explore business solutions <Icon name="arrow-right" :size="16" /></span>
          </div>
          <img :src="systems.image" :alt="systems.imageAlt" width="736" height="552" loading="lazy" decoding="async" />
        </router-link>
      </div>
    </section>

    <!-- ================= WHY ================= -->
    <section class="section">
      <div class="container why">
        <div v-reveal class="why__media">
          <img :src="consultation" alt="A team meeting around a table with laptops and notes" width="640" height="427" loading="lazy" decoding="async" />
          <div class="why__note">
            <Icon name="languages" :size="20" />
            <span>We speak <strong>Swahili</strong> and <strong>English</strong></span>
          </div>
        </div>
        <div class="why__copy">
          <SectionHeader
            eyebrow="Why Millenium Tech"
            title="Local context. Practical thinking. Direct support."
            lead="We focus on work that solves real problems for real businesses, not technology for its own sake."
          />
          <ul class="why__list">
            <li v-for="(r, i) in reasons" :key="r.title" v-reveal="i * 50">
              <span class="icon-badge"><Icon :name="r.icon" :size="22" /></span>
              <div>
                <h3>{{ r.title }}</h3>
                <p>{{ r.text }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ================= PROCESS ================= -->
    <section class="section section--dark">
      <div class="container">
        <SectionHeader
          center
          eyebrow="How we work"
          title="A simple process, from first chat to ongoing support."
          lead="You always know what happens next."
          class="section-head--band"
        />
        <ol class="steps">
          <li v-for="(s, i) in process" :key="s.title" v-reveal="i * 70">
            <span class="steps__icon"><Icon :name="s.icon" :size="24" /></span>
            <span class="steps__no">0{{ i + 1 }}</span>
            <h3>{{ s.title }}</h3>
            <p>{{ s.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- ================= AUDIENCES ================= -->
    <section class="section">
      <div class="container">
        <SectionHeader
          eyebrow="Who we serve"
          title="Built for businesses at every stage."
          lead="Whether you are opening your first shop or running an established company, we start from where you are."
        />
        <div class="grid grid--4">
          <article v-for="(a, i) in audiences" :key="a.title" v-reveal="i * 60" class="card audience">
            <span class="icon-badge"><Icon :name="a.icon" :size="24" /></span>
            <h3>{{ a.title }}</h3>
            <p>{{ a.text }}</p>
            <ul class="checklist">
              <li v-for="p in a.points" :key="p">{{ p }}</li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- ================= PACKAGES ================= -->
    <section class="section section--alt">
      <div class="container">
        <SectionHeader
          eyebrow="Packages & support"
          title="Clear starting points, tailored to your scope."
          lead="Every project is quoted in writing before work starts. Ongoing support after delivery can be agreed with you."
        />
        <div class="grid grid--3 packs">
          <div v-for="(p, i) in packages" :key="p.id" v-reveal="i * 70"><PackageCard :pack="p" /></div>
        </div>
        <p class="packs__note">
          <router-link class="link-arrow" to="/pricing">See what affects the price <Icon name="arrow-right" :size="16" /></router-link>
        </p>
      </div>
    </section>

    <!-- ================= PORTFOLIO ================= -->
    <section class="section">
      <div class="container">
        <div class="head-row">
          <SectionHeader eyebrow="Portfolio" title="Real work, with the story behind it." lead="Each project shows the challenge, what we built and what was delivered." />
          <router-link class="btn btn--secondary" to="/portfolio">View all work</router-link>
        </div>
        <div class="grid grid--3">
          <div v-for="(p, i) in projects" :key="p.slug" v-reveal="i * 70"><ProjectCard :project="p" /></div>
        </div>
      </div>
    </section>

    <!-- ================= TESTIMONIALS (hidden until real ones exist) ================= -->
    <section v-if="testimonials.length" class="section section--alt">
      <div class="container">
        <SectionHeader center eyebrow="Client feedback" title="What our clients say." />
        <div class="grid grid--3">
          <figure v-for="t in testimonials" :key="t.name" class="card quote">
            <blockquote>“{{ t.quote }}”</blockquote>
            <figcaption>
              <strong>{{ t.name }}</strong>
              <span v-if="t.business">{{ t.business }}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- ================= FAQ ================= -->
    <section class="section section--alt">
      <div class="container faq-wrap">
        <div class="faq-wrap__side">
          <SectionHeader eyebrow="Before you start" title="Questions, answered." lead="The things businesses usually ask before they get in touch." />
          <div class="btn-row">
            <a class="btn btn--wa" :href="waLink('Hello Millenium Tech, I have a question.')" target="_blank" rel="noopener" data-track="whatsapp_click" data-track-label="faq">
              <Icon name="whatsapp" :size="18" /> Ask on WhatsApp
            </a>
          </div>
        </div>
        <FaqList :items="faqs" />
      </div>
    </section>

    <CtaBand
      title="Have a project in mind?"
      text="Tell us what you need. We’ll help you find the right digital solution. Karibu — tuzungumze."
    />
  </div>
</template>

<style scoped>
/* ---------- Hero ---------- */
/* Full-bleed slideshow behind the copy, darkened toward the text for
   legibility and fading to clear photo toward the far edge — see
   https://www.apollohospitals.com/sw/facilities/hospitals for the
   general shape. Cross-fade logic is unchanged; this is layout/CSS only. */
.hero {
  position: relative;
  overflow: hidden;
  color: #fff;
  display: flex;
  align-items: center;
  min-height: clamp(520px, 82vh, 720px);
  padding-block: clamp(2.5rem, 6vw, 4rem);
}
.hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.hero__stage {
  position: absolute;
  inset: 0;
}
.hero__slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 1.2s ease-in-out;
}
.hero__slide.is-active {
  opacity: 1;
}
.hero__slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1);
  /* Long, linear transition = a slow zoom while the slide is showing,
     and a gentle ease back once it has faded out (no sudden jump). */
  transition: transform 7s linear;
}
.hero__slide.is-active img {
  transform: scale(1.08);
}
/* Dark/brand-colour near the text, fading to transparent toward the image */
.hero__overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    100deg,
    rgba(4, 13, 32, 0.94) 0%,
    rgba(4, 13, 32, 0.74) 34%,
    rgba(4, 13, 32, 0.32) 60%,
    transparent 84%
  );
}
.hero__copy {
  position: relative;
  z-index: 2;
  display: grid;
  gap: 1.4rem;
  justify-items: start;
  max-width: 640px;
}
.hero__accent {
  color: var(--aqua-400);
}
.hero__trust {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem 1.5rem;
  font-size: 0.92rem;
  color: var(--on-dark-2);
}
.hero__trust li {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}
.hero__trust svg {
  color: var(--aqua-300);
}

/* Progress bars are just an indicator, not controls */
.hero__progress {
  position: absolute;
  right: clamp(1.25rem, 4vw, 3rem);
  bottom: clamp(1.25rem, 4vw, 2rem);
  z-index: 2;
  display: flex;
  gap: 0.4rem;
  width: min(30%, 150px);
}
.hero__progress span {
  position: relative;
  flex: 1;
  height: 3px;
  overflow: hidden;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.22);
}
.hero__progress span::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--aqua-400);
  transform: scaleX(0);
  transform-origin: left;
}
.hero__progress span.is-active::after {
  animation: hero-fill var(--slide-ms) linear forwards;
}
@keyframes hero-fill {
  to {
    transform: scaleX(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__slide img {
    transition: none;
  }
  .hero__slide.is-active img {
    transform: none;
  }
  .hero__progress span.is-active::after {
    animation: none;
    transform: scaleX(1);
  }
}

@media (max-width: 899px) {
  .hero {
    min-height: clamp(460px, 86vh, 620px);
  }
  .hero__overlay {
    background: linear-gradient(
      180deg,
      rgba(4, 13, 32, 0.9) 0%,
      rgba(4, 13, 32, 0.82) 55%,
      rgba(4, 13, 32, 0.6) 100%
    );
  }
}

/* ---------- Proof strip ---------- */
.proof {
  background: var(--paper);
  border-bottom: 1px solid var(--line);
}
.proof__list {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
.proof__list li {
  display: grid;
  gap: 0.15rem;
  padding: 1.6rem 1rem;
  text-align: center;
}
.proof__list li + li {
  border-left: 1px solid var(--line);
}
.proof__list strong {
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 3vw, 2.25rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--ink);
}
.proof__list span {
  font-size: 0.9rem;
  color: var(--muted);
}
@media (max-width: 639px) {
  .proof__list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .proof__list li:nth-child(3) {
    border-left: 0;
  }
  .proof__list li:nth-child(n + 3) {
    border-top: 1px solid var(--line);
  }
}

/* ---------- Problems ---------- */
.problem {
  display: grid;
  gap: 0.9rem;
  align-content: start;
}
.problem p {
  color: var(--ink-2);
  font-size: var(--text-sm);
}
.problem .link-arrow {
  margin-top: 0.4rem;
}

/* ---------- Services ---------- */
.grid__item {
  display: flex;
}
.grid__item > :deep(*) {
  flex: 1;
}
.systems {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  margin-top: var(--s-4);
  overflow: hidden;
  border-radius: var(--radius-l);
  background: var(--grad-brand);
  color: #fff;
  transition: box-shadow 0.25s var(--ease), transform 0.25s var(--ease);
}
.systems:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-l);
}
.systems__copy {
  display: grid;
  gap: 1rem;
  align-content: center;
  justify-items: start;
  padding: clamp(1.5rem, 4vw, 3rem);
}
.systems__copy p {
  color: var(--on-dark-2);
  max-width: 52ch;
}
.systems__copy .link-arrow {
  color: var(--aqua-300);
}
.systems img {
  width: 100%;
  height: 100%;
  min-height: 260px;
  object-fit: cover;
}
@media (max-width: 819px) {
  .systems {
    grid-template-columns: minmax(0, 1fr);
  }
  .systems img {
    order: -1;
    height: 220px;
  }
}

/* ---------- Why ---------- */
.why {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: clamp(2rem, 6vw, 5rem);
  align-items: center;
}
.why__media {
  position: relative;
}
.why__media img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-m);
}
.why__note {
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.7rem 1rem;
  border-radius: var(--radius-m);
  background: var(--card);
  font-size: 0.9rem;
  box-shadow: var(--shadow-m);
}
.why__note svg {
  color: var(--blue-600);
}
.why__list {
  display: grid;
  gap: 1.25rem;
}
.why__list li {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}
.why__list h3 {
  font-size: 1.1rem;
  margin-bottom: 0.2rem;
}
.why__list p {
  color: var(--ink-2);
  font-size: var(--text-sm);
}
@media (max-width: 899px) {
  .why {
    grid-template-columns: minmax(0, 1fr);
  }
  .why__media img {
    aspect-ratio: 16 / 10;
  }
}

/* ---------- Process ---------- */
.steps {
  position: relative;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: var(--s-4);
}
.steps li {
  position: relative;
  display: grid;
  gap: 0.6rem;
  align-content: start;
}
.steps li:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 28px;
  left: 68px;
  right: -1rem;
  border-top: 2px dashed var(--line-strong);
}
.steps__icon {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--blue-50);
  color: var(--blue-700);
}
.steps__no {
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: var(--text-brand);
}
.steps p {
  color: var(--muted);
  font-size: var(--text-sm);
}
@media (max-width: 1023px) {
  .steps {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
  }
  .steps li {
    grid-template-columns: 56px 1fr;
    column-gap: 1.1rem;
    padding-bottom: 1.75rem;
  }
  .steps li:last-child {
    padding-bottom: 0;
  }
  .steps__icon {
    grid-row: 1 / span 3;
  }
  .steps li:not(:last-child)::after {
    top: 60px;
    bottom: 4px;
    left: 27px;
    right: auto;
    border-top: 0;
    border-left: 2px dashed rgba(95, 216, 238, 0.35);
  }
}

/* ---------- Audiences ---------- */
.audience {
  display: grid;
  gap: 0.9rem;
  align-content: start;
}
.audience p {
  color: var(--ink-2);
  font-size: var(--text-sm);
}

/* ---------- Packages ---------- */
.packs {
  align-items: stretch;
  padding-top: 0.75rem;
}
.packs > div {
  display: flex;
}
.packs > div > :deep(*) {
  flex: 1;
}
.packs__note {
  margin-top: var(--s-5);
  text-align: center;
}

/* ---------- Portfolio heading row ---------- */
.head-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--s-4);
  flex-wrap: wrap;
}
.head-row :deep(.section-head) {
  margin-bottom: clamp(1.5rem, 3vw, 2.5rem);
}
.head-row .btn {
  margin-bottom: clamp(1.5rem, 3vw, 2.5rem);
}

/* ---------- Testimonials ---------- */
.quote {
  display: grid;
  gap: 1rem;
  margin: 0;
}
.quote blockquote {
  margin: 0;
  font-size: 1.05rem;
}
.quote figcaption {
  display: grid;
  font-size: var(--text-sm);
  color: var(--muted);
}
.quote figcaption strong {
  color: var(--ink);
}

/* ---------- FAQ ---------- */
.faq-wrap {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
  gap: clamp(2rem, 5vw, 4rem);
  align-items: start;
}
.faq-wrap__side {
  position: sticky;
  top: calc(var(--header-h) + 1.5rem);
}
.faq-wrap__side :deep(.section-head) {
  margin-bottom: 1.5rem;
}
@media (max-width: 899px) {
  .faq-wrap {
    grid-template-columns: minmax(0, 1fr);
  }
  .faq-wrap__side {
    position: static;
  }
}
</style>