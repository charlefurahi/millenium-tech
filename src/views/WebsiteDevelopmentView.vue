<template>
  <div class="webdev-page">
    <!-- =====================================================
         HERO
    ====================================================== -->

    <section class="page-hero noise">
      <div class="page-hero__orb"></div>

      <div class="container page-hero__inner">
        <div class="page-hero__text">
          <div class="section-label animate-fade-up">Website Development</div>

          <h1 class="page-hero__title animate-fade-up delay-100">
            A Business Website That<br />
            Makes the <span class="gradient-text">Next Step Easy.</span>
          </h1>

          <p class="page-hero__subtitle animate-fade-up delay-200">
            For businesses in Tanzania that need a clear, professional
            online presence — built for mobile visitors and real
            enquiries.
          </p>

          <div class="page-hero__actions animate-fade-up delay-300">
            <router-link to="/contact" class="btn btn-primary">
              <span>Request a Consultation</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </router-link>
            <router-link to="/portfolio" class="btn btn-outline">
              <span>See Work Structure</span>
            </router-link>
          </div>
        </div>

        <div class="page-hero__media animate-fade-up delay-200">
          <img
            :src="websiteImg"
            alt="Professional website shown across laptop and phone screens"
            loading="eager"
          />
        </div>
      </div>
    </section>

    <!-- =====================================================
         WHAT A GOOD WEBSITE SOLVES
    ====================================================== -->

    <section class="section">
      <div class="container split">
        <div class="split__text">
          <div class="section-label">What a Good Website Solves</div>
          <h2>
            Make it easier to
            <span class="gradient-text">understand, trust and contact</span>
            your business.
          </h2>
          <p>
            Customers should not have to guess what you do, whether you
            can help, or how to reach you.
          </p>

          <h3 class="split__subtitle">Suitable For</h3>
          <ul class="panel__checklist">
            <li v-for="item in suitableFor" :key="item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>

        <div class="deliverables">
          <div
            v-for="item in deliverables"
            :key="item.label"
            class="deliverables__item glass-card"
          >
            <div class="deliverables__icon" :class="item.accent">
              <span v-html="item.icon"></span>
            </div>
            <span>{{ item.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- =====================================================
         PROCESS + QUOTATION
    ====================================================== -->

    <section class="section split-section">
      <div class="container split">
        <div>
          <div class="section-label">How the Project Comes Together</div>

          <div class="steps">
            <article
              v-for="(step, index) in steps"
              :key="step.title"
              class="steps__item"
            >
              <img :src="step.img" :alt="step.title" class="steps__thumb" />
              <div>
                <span class="steps__number">0{{ index + 1 }}</span>
                <h3>{{ step.title }}</h3>
                <p>{{ step.text }}</p>
              </div>
            </article>
          </div>
        </div>

        <article class="quote-card glass-card">
          <div class="section-label">What Affects a Quotation</div>
          <h3>Every website has a different scope.</h3>

          <ul class="panel__checklist">
            <li v-for="item in affects" :key="item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>{{ item }}</span>
            </li>
          </ul>

          <router-link to="/contact" class="btn btn-primary quote-card__cta">
            <span>Discuss Your Website</span>
          </router-link>
        </article>
      </div>
    </section>

    <!-- =====================================================
         CTA
    ====================================================== -->

    <section class="section webdev-cta">
      <div class="container webdev-cta__inner">
        <div>
          <div class="section-label">Website Design Tanzania</div>
          <h2>Ready for an online home that works harder?</h2>
          <p>
            Start with a short conversation about your business, customers
            and next goal.
          </p>
        </div>

        <router-link class="btn btn-primary" to="/contact">
          <span>Get a Consultation</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import websiteImg from '@/assets/services/website-development.jpg'
import consultationImg from '@/assets/process/consultation.jpg'
import planningImg from '@/assets/process/planning.jpg'
import executionImg from '@/assets/process/execution.jpg'
import deliveryImg from '@/assets/process/delivery.jpg'

const deliverables = [
  {
    label: 'Clear service information',
    accent: 'icon--cyan',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/></svg>`
  },
  {
    label: 'Mobile-responsive pages',
    accent: 'icon--gold',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="7" y="2" width="10" height="20" rx="2"/><line x1="11" y1="18" x2="13" y2="18"/></svg>`
  },
  {
    label: 'WhatsApp & contact routes',
    accent: 'icon--cyan',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`
  },
  {
    label: 'Lead capture form',
    accent: 'icon--gold',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 8l9 6 9-6"/></svg>`
  },
  {
    label: 'Search-friendly page structure',
    accent: 'icon--cyan',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`
  },
  {
    label: 'Maintenance-ready setup',
    accent: 'icon--gold',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14.7 6.3a4 4 0 01-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 015.4-5.4l-3-3z"/></svg>`
  }
]

const suitableFor = [
  'Business websites and company profiles',
  'Focused landing pages for a service or campaign',
  'E-commerce where the ordering needs are clear',
  'Redesigns for businesses with outdated websites'
]

const steps = [
  {
    title: 'Website discovery',
    text: 'Clarify your services, customers, goals, content and priorities.',
    img: consultationImg
  },
  {
    title: 'Structure & direction',
    text: 'Plan the page flow and visual direction before building.',
    img: planningImg
  },
  {
    title: 'Design & build',
    text: 'Create responsive pages with clear calls to action.',
    img: executionImg
  },
  {
    title: 'Review & launch',
    text: 'Review, refine and prepare the site for use.',
    img: deliveryImg
  }
]

const affects = [
  'Number and type of pages',
  'Content, photography and copy requirements',
  'Features such as forms, catalogues or ordering',
  'Integrations and custom functionality',
  'Ongoing maintenance or updates',
  'Required timeline and stakeholder review'
]
</script>

<style scoped>
/* =========================================================
   PAGE
========================================================= */

.webdev-page {
  width: 100%;
  min-width: 0;

  background: var(--bg-primary);
  color: var(--text-primary);

  transition:
    background-color var(--transition-slow),
    color var(--transition-slow);
}

/* =========================================================
   HERO
========================================================= */

.page-hero {
  position: relative;

  padding: 140px 0 80px;

  background: var(--bg-primary);
  color: var(--text-primary);

  overflow: hidden;

  transition:
    background-color var(--transition-slow),
    color var(--transition-slow);
}

.page-hero__orb {
  position: absolute;
  top: -140px;
  right: -140px;

  width: 520px;
  height: 520px;
  border-radius: 50%;

  background: radial-gradient(circle, var(--cyan-soft) 0%, transparent 70%);
  pointer-events: none;
}

.page-hero__inner {
  position: relative;
  z-index: 1;

  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: 3rem;
  align-items: center;
}

.page-hero__title {
  font-family: var(--font-display);
  font-size: clamp(2.3rem, 5vw, 3.4rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.03em;
  margin-bottom: 1.15rem;
  color: var(--text-primary);
}

.page-hero__subtitle {
  font-size: 1.05rem;
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 520px;
  margin-bottom: 1.75rem;
}

.page-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.page-hero__media img {
  width: 100%;
  height: auto;
  display: block;

  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-deep);
}

/* =========================================================
   SPLIT SECTIONS
========================================================= */

.split {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 3.5rem;
  align-items: start;
}

.split__text h2 {
  font-family: var(--font-display);
  font-size: clamp(1.7rem, 3.2vw, 2.3rem);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin: 0.75rem 0 1rem;
  color: var(--text-primary);
}

.split__text > p {
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 1.75rem;
}

.split__subtitle {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.panel__checklist {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.panel__checklist li {
  display: flex;
  align-items: center;
  gap: 0.65rem;

  font-size: 0.92rem;
  color: var(--text-primary);
}

.panel__checklist li svg {
  flex-shrink: 0;
  color: var(--cyan-text);
}

.deliverables {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.9rem;
}

.deliverables__item {
  display: flex;
  align-items: center;
  gap: 0.65rem;

  padding: 1rem 1rem;

  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.35;
}

.deliverables__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  width: 36px;
  height: 36px;

  border-radius: var(--radius-md);
}

.icon--cyan {
  background: var(--cyan-soft);
  color: var(--cyan-text);
}

.icon--gold {
  background: var(--gold-soft);
  color: var(--gold-text);
}

/* =========================================================
   PROCESS + QUOTE
========================================================= */

.split-section {
  background: var(--bg-secondary);
  color: var(--text-primary);

  transition:
    background-color var(--transition-slow),
    color var(--transition-slow);
}

.steps {
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
}

.steps__item {
  display: flex;
  gap: 1.1rem;
  align-items: flex-start;

  padding: 1.25rem 0;
  border-bottom: 1px solid var(--border-soft);
}

.steps__item:first-child {
  padding-top: 0;
}

.steps__item:last-child {
  border-bottom: none;
}

.steps__thumb {
  width: 64px;
  height: 64px;
  flex-shrink: 0;

  border-radius: var(--radius-md);
  object-fit: cover;
}

.steps__number {
  display: block;

  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 800;
  color: var(--cyan-text);

  margin-bottom: 0.2rem;
}

.steps__item h3 {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: var(--text-primary);
}

.steps__item p {
  font-size: 0.88rem;
  line-height: 1.55;
  color: var(--text-secondary);
}

.quote-card {
  padding: 2.25rem 2rem;
}

.quote-card h3 {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 800;
  margin: 0.6rem 0 1.25rem;
  color: var(--text-primary);
}

.quote-card .panel__checklist {
  margin-bottom: 1.75rem;
}

.quote-card__cta {
  width: 100%;
  justify-content: center;
}

/* =========================================================
   CTA
========================================================= */

.webdev-cta {
  background: var(--bg-primary);
  color: var(--text-primary);

  transition:
    background-color var(--transition-slow),
    color var(--transition-slow);
}

.webdev-cta__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2.5rem;
  flex-wrap: wrap;
}

.webdev-cta__inner h2 {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800;
  line-height: 1.25;
  margin: 0.5rem 0 0.6rem;
  color: var(--text-primary);
  max-width: 480px;
}

.webdev-cta__inner p {
  color: var(--text-secondary);
  max-width: 480px;
}

/* =========================================================
   TABLET
========================================================= */

@media (max-width: 1024px) {
  .page-hero__inner {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .page-hero__subtitle {
    margin-left: auto;
    margin-right: auto;
  }

  .page-hero__actions {
    justify-content: center;
  }

  .page-hero__media {
    order: -1;
    max-width: 480px;
    margin: 0 auto;
  }

  .split {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}

/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 640px) {
  .page-hero {
    padding: 120px 0 60px;
  }

  .page-hero__actions {
    flex-direction: column;
    align-items: stretch;
  }

  .page-hero__actions .btn {
    width: 100%;
    justify-content: center;
  }

  .deliverables {
    grid-template-columns: 1fr;
  }

  .quote-card {
    padding: 1.75rem 1.5rem;
  }

  .webdev-cta__inner {
    flex-direction: column;
    align-items: flex-start;
  }

  .webdev-cta .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
