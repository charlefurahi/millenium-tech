<template>
  <div class="solutions-page">
    <!-- =====================================================
         HERO
    ====================================================== -->

    <section class="page-hero noise">
      <div class="page-hero__orb page-hero__orb--1"></div>
      <div class="page-hero__orb page-hero__orb--2"></div>

      <div class="container page-hero__inner">
        <div class="section-label animate-fade-up">Business Solutions</div>

        <h1 class="page-hero__title animate-fade-up delay-100">
          When a Website Isn't Enough,<br />
          <span class="gradient-text">Start With the Workflow.</span>
        </h1>

        <p class="page-hero__subtitle animate-fade-up delay-200">
          We help organisations explore practical digital tools — without
          pushing a complex system before the problem is understood.
        </p>
      </div>
    </section>

    <!-- =====================================================
         PROBLEMS
    ====================================================== -->

    <section class="section problems-section">
      <div class="container">
        <div class="section-header">
          <div class="section-label">Problems Worth Solving</div>
          <h2 class="section-title">
            Technology should reduce friction,
            <span class="gradient-text">not create more of it.</span>
          </h2>
        </div>

        <div class="problems-grid">
          <article
            v-for="(item, i) in problems"
            :key="item.title"
            class="problem-card glass-card"
            :style="{ animationDelay: `${i * 0.1}s` }"
          >
            <div class="problem-card__icon" :class="item.accent">
              <span v-html="item.icon"></span>
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- =====================================================
         START SMALL / STEPS
    ====================================================== -->

    <section class="section split-section">
      <div class="container split">
        <div class="panel glass-card">
          <div class="section-label">Start Small, Learn Early</div>

          <h2>
            Build the right thing before
            <span class="gradient-text">building the biggest thing.</span>
          </h2>

          <p>
            A discovery conversation helps make the problem, users and
            desired outcome specific enough to plan responsibly.
          </p>

          <ul class="panel__checklist">
            <li v-for="item in scope" :key="item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>

        <div class="steps">
          <article
            v-for="(step, index) in steps"
            :key="step.title"
            class="steps__item"
          >
            <span class="steps__number">0{{ index + 1 }}</span>
            <div>
              <h3>{{ step.title }}</h3>
              <p>{{ step.text }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- =====================================================
         SERVICES VS INNOVATION
    ====================================================== -->

    <section class="section split-section distinction-section">
      <div class="container">
        <div class="section-header">
          <div class="section-label">Two Ways We Work</div>
          <h2 class="section-title">
            Services <span class="gradient-text">and</span> Innovation.
          </h2>
        </div>

        <div class="distinction-grid">
          <article class="distinction-card glass-card">
            <div class="distinction-card__icon icon--cyan">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 4v5"/></svg>
            </div>
            <h3>Services</h3>
            <p>
              Professional work you already know you need — a website,
              a system, branding, IT support. You tell us the scope,
              we deliver it.
            </p>
          </article>

          <article class="distinction-card glass-card">
            <div class="distinction-card__icon icon--gold">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="4"/></svg>
            </div>
            <h3>Innovation / Product Studio</h3>
            <p>
              You bring a problem, not a spec. We explore it with you,
              validate it, and build a solution — which may, where it
              makes sense, grow into a reusable product.
            </p>
          </article>
        </div>

        <p class="distinction-note">
          Not every project becomes a product — most stay exactly what
          they were built to be: a solution for the organisation that
          asked for it. Where a solution solves a problem shared by many
          organisations, we may develop it further as a reusable
          platform. See our current
          <router-link to="/products">product directions</router-link>.
        </p>
      </div>
    </section>

    <!-- =====================================================
         CTA
    ====================================================== -->

    <section class="section solutions-cta">
      <div class="container solutions-cta__inner">
        <div>
          <div class="section-label">Custom Projects</div>
          <h2>Have a business process that needs attention?</h2>
          <p>
            Tell us where work is getting stuck. We'll help identify a
            sensible next step.
          </p>
        </div>

        <router-link class="btn btn-primary" to="/request-project">
          <span>Discuss Your Needs</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const problems = [
  {
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/></svg>`,
    accent: 'icon--cyan',
    title: 'Information is scattered across messages and files.',
    text: 'A tailored system can give the right people a more reliable place to find and manage it.'
  },
  {
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/></svg>`,
    accent: 'icon--gold',
    title: 'Manual processes waste time and invite mistakes.',
    text: 'Before automating anything, we map the actual workflow and define what a useful improvement looks like.'
  },
  {
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10 13a5 5 0 007.07 0l2.83-2.83a5 5 0 00-7.07-7.07l-1.5 1.5"/><path d="M14 11a5 5 0 00-7.07 0L4.1 13.83a5 5 0 007.07 7.07l1.5-1.5"/></svg>`,
    accent: 'icon--cyan',
    title: "Existing tools don't work together.",
    text: 'Integration and custom solutions can be considered only where they provide a clear operational benefit.'
  }
]

const scope = [
  'Custom business systems',
  'Web applications',
  'Database-backed tools',
  'Process improvement & future automation'
]

const steps = [
  {
    title: 'Identify the problem',
    text: 'We start with the actual friction — not the technology. What is slow, manual or error-prone today?'
  },
  {
    title: 'Understand the users',
    text: 'Who touches this process daily, and what do they actually need it to do?'
  },
  {
    title: 'Design the solution',
    text: 'A plan for the smallest version that genuinely solves the problem — nothing extra.'
  },
  {
    title: 'Build an MVP',
    text: 'MVP means "minimum viable product" — the first working version, built to prove the idea works, not a final polished product.'
  },
  {
    title: 'Test with real users',
    text: "The people who'll actually use it try it, and we watch what breaks or confuses."
  },
  {
    title: 'Improve',
    text: 'Fix what the testing surfaced before anything is considered done.'
  },
  {
    title: 'Launch',
    text: 'The solution goes live for real, everyday use.'
  },
  {
    title: 'Support and scale',
    text: 'We stay involved — fixing issues and growing the system as your needs grow.'
  }
]
</script>

<style scoped>
/* =========================================================
   PAGE
========================================================= */

.solutions-page {
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
  text-align: center;

  transition:
    background-color var(--transition-slow),
    color var(--transition-slow);
}

.page-hero__orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.page-hero__orb--1 {
  width: 480px;
  height: 480px;
  top: -100px;
  left: -120px;
  background: radial-gradient(circle, var(--cyan-soft) 0%, transparent 70%);
}

.page-hero__orb--2 {
  width: 420px;
  height: 420px;
  bottom: -100px;
  right: -100px;
  background: radial-gradient(circle, var(--gold-soft) 0%, transparent 70%);
}

.page-hero__inner {
  position: relative;
  z-index: 1;
}

.page-hero__title {
  font-family: var(--font-display);
  font-size: clamp(2.3rem, 5.5vw, 3.8rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.03em;
  margin-bottom: 1.25rem;
  color: var(--text-primary);
}

.page-hero__subtitle {
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 620px;
  margin: 0 auto;
  line-height: 1.7;
}

/* =========================================================
   PROBLEMS
========================================================= */

.problems-section {
  background: var(--bg-primary);
  color: var(--text-primary);
}

.section-header {
  max-width: 640px;
  margin: 0 auto 3rem;
  text-align: center;
}

.section-header .section-title {
  margin-top: 0.75rem;
}

.problems-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.75rem;
}

.problem-card {
  padding: 2rem 1.75rem;
  animation: fadeUp 0.65s var(--ease-out) both;

  transition:
    transform var(--transition-base),
    box-shadow var(--transition-base);
}

.problem-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-deep);
}

.problem-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 52px;
  height: 52px;

  margin-bottom: 1.1rem;

  border-radius: var(--radius-lg);
}

.icon--cyan {
  background: var(--cyan-soft);
  color: var(--cyan-text);
}

.icon--gold {
  background: var(--gold-soft);
  color: var(--gold-text);
}

.problem-card h3 {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.35;
  margin-bottom: 0.6rem;
  color: var(--text-primary);
}

.problem-card p {
  font-size: 0.92rem;
  line-height: 1.65;
  color: var(--text-secondary);
}

/* =========================================================
   SPLIT / STEPS
========================================================= */

.split-section {
  background: var(--bg-secondary);
  color: var(--text-primary);

  transition:
    background-color var(--transition-slow),
    color var(--transition-slow);
}

.split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3.5rem;
  align-items: start;
}

.panel {
  padding: 2.5rem 2.25rem;
}

.panel .section-label {
  margin-bottom: 0.9rem;
}

.panel h2 {
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 3vw, 2.1rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.panel p {
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 1.5rem;
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

.steps {
  display: flex;
  flex-direction: column;
}

.steps__item {
  display: flex;
  gap: 1.1rem;

  padding: 1.35rem 0;
  border-bottom: 1px solid var(--border-soft);
}

.steps__item:first-child {
  padding-top: 0.25rem;
}

.steps__item:last-child {
  border-bottom: none;
}

.steps__number {
  flex-shrink: 0;

  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 800;

  color: var(--cyan-text);
}

.steps__item h3 {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
  color: var(--text-primary);
}

.steps__item p {
  font-size: 0.88rem;
  line-height: 1.6;
  color: var(--text-secondary);
}

/* =========================================================
   SERVICES VS INNOVATION
========================================================= */

.distinction-section {
  background: var(--bg-secondary);
}

.distinction-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.75rem;
  margin-top: 2rem;
}

.distinction-card {
  padding: 2rem 1.75rem;
}

.distinction-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 52px;
  height: 52px;

  margin-bottom: 1.1rem;

  border-radius: var(--radius-lg);
}

.distinction-card h3 {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.6rem;
  color: var(--text-primary);
}

.distinction-card p {
  font-size: 0.92rem;
  line-height: 1.7;
  color: var(--text-secondary);
}

.distinction-note {
  margin-top: 1.75rem;
  font-size: 0.88rem;
  line-height: 1.7;
  color: var(--text-secondary);
  max-width: 760px;
}

.distinction-note a {
  color: var(--cyan-text);
  font-weight: 600;
}

@media (max-width: 700px) {
  .distinction-grid {
    grid-template-columns: 1fr;
  }
}

/* =========================================================
   CTA
========================================================= */

.solutions-cta {
  background: var(--bg-primary);
  color: var(--text-primary);

  transition:
    background-color var(--transition-slow),
    color var(--transition-slow);
}

.solutions-cta__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2.5rem;

  flex-wrap: wrap;
}

.solutions-cta__inner h2 {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800;
  line-height: 1.25;
  margin: 0.5rem 0 0.6rem;
  color: var(--text-primary);
  max-width: 480px;
}

.solutions-cta__inner p {
  color: var(--text-secondary);
  max-width: 480px;
}

.solutions-cta .btn {
  flex-shrink: 0;
}

/* =========================================================
   TABLET
========================================================= */

@media (max-width: 1024px) {
  .problems-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
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

  .problems-grid {
    grid-template-columns: 1fr;
  }

  .panel {
    padding: 2rem 1.5rem;
  }

  .solutions-cta__inner {
    flex-direction: column;
    align-items: flex-start;
  }

  .solutions-cta .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
