<template>
  <div class="about-page">
    <!-- =====================================================
         HERO
    ====================================================== -->

    <section class="page-hero noise">
      <div class="page-hero__orb page-hero__orb--1"></div>
      <div class="page-hero__orb page-hero__orb--2"></div>

      <div class="container page-hero__inner">
        <div class="section-label animate-fade-up">
          Our Story
        </div>

        <h1 class="page-hero__title animate-fade-up delay-100">
          Built on Passion,<br />
          <span class="gradient-text">
            Driven by Purpose
          </span>
        </h1>

        <p class="page-hero__subtitle animate-fade-up delay-200">
          We are a team of young, talented Tanzanians making
          technology accessible and affordable for everyone.
        </p>
      </div>
    </section>

    <!-- =====================================================
         STORY
    ====================================================== -->

    <section class="section story">
      <div class="container story__inner">

        <!-- IMAGE / QUOTE -->
        <div class="story__img-side">

          <div class="story__img-frame">
            <img
              src="@/assets/hero-photo.png"
              alt="Founder"
              class="story__img"
            />

            <div class="story__img-overlay glass-card">
              <span class="story__overlay-title">
                Our Founder
              </span>

              <span class="story__overlay-sub">
                Millenium Tech – Est. 2022
              </span>
            </div>
          </div>

          <div class="story__quote glass-card">

            <svg
              class="story__quote-icon"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 1-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"
              />
              <path
                d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
              />
            </svg>

            <p class="story__quote-text">
              "Technology should not be a luxury. Our mission is
              to make it a tool for every Tanzanian business,
              big or small."
            </p>

            <span class="story__quote-author">
              — Millenium Tech Founder
            </span>
          </div>

        </div>

        <!-- STORY TEXT -->
        <div class="story__text">

          <div class="section-label">
            Who We Are
          </div>

          <h2 class="section-title story__title">
            Tanzania's Rising<br />
            <span class="gradient-text">
              Tech Company
            </span>
          </h2>

          <p class="story__para">
            Millenium Tech was founded with one clear goal:
            to bridge the digital gap in Tanzania.
            We saw businesses struggling with outdated websites,
            poor designs, and slow computer repairs
            — and we knew we could do better.
          </p>

          <p class="story__para">
            Today, we serve clients across Tanzania,
            delivering everything from eye-catching graphics
            to fully functional websites, from computer repairs
            to critical online government services.
          </p>

          <p class="story__para">
            We are young, passionate, and constantly learning.
            We combine global best practices with deep local
            knowledge to give every client the best possible outcome.
          </p>

          <!-- STATS -->

          <div class="story__stats">
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="story__stat"
            >
              <span class="story__stat-num gradient-text">
                {{ stat.num }}
              </span>

              <span class="story__stat-label">
                {{ stat.label }}
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- =====================================================
         VALUES
    ====================================================== -->

    <section class="section values">

      <div class="values__bg dot-pattern"></div>

      <div class="container">

        <div class="values__heading">
          <div class="section-label">
            What Guides Us
          </div>

          <h2 class="section-title">
            Our Core
            <span class="gradient-text">
              Values
            </span>
          </h2>
        </div>

        <div class="values__grid">

          <div
            v-for="val in values"
            :key="val.title"
            class="value-card glass-card"
          >
            <div class="value-card__emoji">
              {{ val.emoji }}
            </div>

            <h3 class="value-card__title">
              {{ val.title }}
            </h3>

            <p class="value-card__desc">
              {{ val.desc }}
            </p>
          </div>

        </div>

      </div>
    </section>

    <!-- =====================================================
         SKILLS
    ====================================================== -->

    <section class="section skills">

      <div class="container skills__inner">

        <div class="skills__text">

          <div class="section-label">
            Our Expertise
          </div>

          <h2 class="section-title skills__title">
            Skills That<br />
            <span class="gradient-text">
              Set Us Apart
            </span>
          </h2>

          <p class="skills__description">
            We invest continuously in our skills to stay ahead
            of technology trends and deliver the best solutions
            to our clients.
          </p>

          <router-link
            to="/contact"
            class="btn btn-primary"
          >
            <span>
              Work With Us
            </span>

            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7-7" />
            </svg>
          </router-link>

        </div>

        <div class="skills__bars">

          <div
            v-for="skill in skillBars"
            :key="skill.name"
            class="skill-bar"
          >

            <div class="skill-bar__header">

              <span class="skill-bar__name">
                {{ skill.name }}
              </span>

              <span class="skill-bar__pct gradient-text">
                {{ skill.pct }}%
              </span>

            </div>

            <div class="skill-bar__track">

              <div
                class="skill-bar__fill"
                :style="{
                  width: `${skill.pct}%`,
                  background: skill.color
                }"
              ></div>

            </div>

          </div>

        </div>

      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
const stats = [
  {
    num: '3+',
    label: 'Years Active'
  },
  {
    num: '50+',
    label: 'Projects'
  },
  {
    num: '30+',
    label: 'Clients'
  },
  {
    num: '6',
    label: 'Services'
  }
]

const values = [
  {
    emoji: '🎯',
    title: 'Excellence',
    desc: 'We never settle. Every project gets our full attention and best effort.'
  },
  {
    emoji: '🤝',
    title: 'Integrity',
    desc: 'We are honest about timelines, pricing, and what we can deliver.'
  },
  {
    emoji: '💡',
    title: 'Innovation',
    desc: 'We stay ahead of tech trends so your business always looks modern.'
  },
  {
    emoji: '🌍',
    title: 'Local Pride',
    desc: 'Built in Tanzania, we understand the local market like no one else.'
  },
  {
    emoji: '⚡',
    title: 'Speed',
    desc: 'Fast delivery is our standard. We respect your time and deadlines.'
  },
  {
    emoji: '💎',
    title: 'Quality',
    desc: 'Premium results without the premium price tag.'
  }
]

const skillBars = [
  {
    name: 'Graphic Design',
    pct: 95,
    color: 'linear-gradient(90deg, #22d3ee, #67e8f9)'
  },
  {
    name: 'Web Development',
    pct: 90,
    color: 'linear-gradient(90deg, #fbbf24, #fcd34d)'
  },
  {
    name: 'Photo Editing',
    pct: 88,
    color: 'linear-gradient(90deg, #22d3ee, #67e8f9)'
  },
  {
    name: 'Computer Repair',
    pct: 92,
    color: 'linear-gradient(90deg, #fbbf24, #fcd34d)'
  },
  {
    name: 'Customer Service',
    pct: 97,
    color: 'linear-gradient(90deg, #22d3ee, #67e8f9)'
  }
]
</script>

<style scoped>
/* =========================================================
   PAGE
========================================================= */

.about-page {
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
  width: 500px;
  height: 500px;

  top: -100px;
  left: -100px;

  background:
    radial-gradient(
      circle,
      var(--cyan-soft),
      transparent 70%
    );
}

.page-hero__orb--2 {
  width: 400px;
  height: 400px;

  right: -80px;
  bottom: -80px;

  background:
    radial-gradient(
      circle,
      var(--gold-soft),
      transparent 70%
    );
}

.page-hero__inner {
  position: relative;
  z-index: 1;
}

.page-hero__title {
  margin-bottom: 1.25rem;

  color: var(--text-primary);

  font-family: var(--font-display);

  font-size:
    clamp(
      2.5rem,
      6vw,
      4rem
    );

  font-weight: 800;

  line-height: 1.1;
  letter-spacing: -0.03em;
}

.page-hero__subtitle {
  max-width: 560px;

  margin: 0 auto;

  color: var(--text-secondary);

  font-size: 1.1rem;

  line-height: 1.7;
}

/* =========================================================
   STORY
========================================================= */

.story {
  background: var(--bg-primary);
  color: var(--text-primary);
}

.story__inner {
  display: grid;

  grid-template-columns:
    minmax(0, 1fr)
    minmax(0, 1.2fr);

  gap: 5rem;

  align-items: start;
}

.story__img-side {
  display: flex;

  flex-direction: column;

  gap: 1.5rem;

  min-width: 0;
}

.story__img-frame {
  position: relative;

  border-radius: 24px;

  overflow: hidden;
}

.story__img {
  display: block;

  width: 100%;

  aspect-ratio: 4 / 5;

  object-fit: cover;

  object-position: top;

  border-radius: 24px;

  border: 1px solid var(--border-soft);
}

.story__img-overlay {
  position: absolute;

  left: 1.5rem;
  right: 1.5rem;
  bottom: 1.5rem;

  padding: 1rem 1.25rem;

  display: flex;
  flex-direction: column;

  /*
   * Keep the overlay readable in both modes.
   */
  background:
    linear-gradient(
      145deg,
      var(--glass-bg-1),
      var(--glass-bg-2)
    );
}

.story__overlay-title {
  color: var(--text-primary);

  font-family: var(--font-display);

  font-size: 0.95rem;

  font-weight: 700;
}

.story__overlay-sub {
  margin-top: 2px;

  color: var(--cyan-text);

  font-size: 0.78rem;
}

.story__quote {
  padding: 1.5rem;
}

.story__quote-icon {
  color: var(--cyan-text);

  opacity: 0.65;
}

.story__quote-text {
  display: block;

  margin:
    0.75rem 0;

  color: var(--text-secondary);

  font-size: 0.95rem;

  font-style: italic;

  line-height: 1.7;
}

.story__quote-author {
  color: var(--cyan-text);

  font-family: var(--font-display);

  font-size: 0.8rem;

  font-weight: 600;
}

.story__title {
  margin-bottom: 1.5rem;
}

.story__para {
  margin-bottom: 1.25rem;

  color: var(--text-secondary);

  font-size: 1rem;

  line-height: 1.8;
}

.story__stats {
  display: grid;

  grid-template-columns:
    repeat(4, minmax(0, 1fr));

  gap: 1rem;

  margin-top: 2.5rem;
  padding-top: 2.5rem;

  border-top:
    1px solid var(--border-soft);
}

.story__stat {
  display: flex;

  flex-direction: column;

  gap: 0.25rem;
}

.story__stat-num {
  font-family: var(--font-display);

  font-size: 2rem;

  font-weight: 800;

  line-height: 1;
}

.story__stat-label {
  color: var(--text-muted);

  font-size: 0.75rem;

  text-transform: uppercase;

  letter-spacing: 0.08em;
}

/* =========================================================
   VALUES
========================================================= */

.values {
  position: relative;

  overflow: hidden;

  background: var(--bg-secondary);
  color: var(--text-primary);
}

.values__bg {
  position: absolute;

  inset: 0;

  opacity: 0.35;

  pointer-events: none;
}

.values__heading {
  text-align: center;

  margin-bottom: 3.5rem;
}

.values__grid {
  display: grid;

  grid-template-columns:
    repeat(3, minmax(0, 1fr));

  gap: 1.5rem;

  position: relative;

  z-index: 1;
}

.value-card {
  padding: 2rem;

  color: var(--text-primary);

  transition:
    transform var(--transition-base),
    border-color var(--transition-base),
    box-shadow var(--transition-base);
}

.value-card:hover {
  transform: translateY(-5px);

  border-color:
    var(--glass-border-hover);
}

.value-card__emoji {
  margin-bottom: 1rem;

  font-size: 2rem;
}

.value-card__title {
  margin-bottom: 0.6rem;

  color: var(--text-primary);

  font-family: var(--font-display);

  font-size: 1.05rem;

  font-weight: 700;
}

.value-card__desc {
  color: var(--text-secondary);

  font-size: 0.875rem;

  line-height: 1.7;
}

/* =========================================================
   SKILLS
========================================================= */

.skills {
  background: var(--bg-primary);
  color: var(--text-primary);
}

.skills__inner {
  display: grid;

  grid-template-columns:
    minmax(0, 1fr)
    minmax(0, 1.4fr);

  gap: 5rem;

  align-items: center;
}

.skills__title {
  margin-bottom: 1.5rem;
}

.skills__description {
  max-width: 600px;

  margin-bottom: 2rem;

  color: var(--text-secondary);

  line-height: 1.75;
}

.skills__bars {
  display: flex;

  flex-direction: column;

  gap: 1.75rem;
}

.skill-bar__header {
  display: flex;

  justify-content: space-between;
  align-items: center;

  gap: 1rem;

  margin-bottom: 0.6rem;
}

.skill-bar__name {
  color: var(--text-primary);

  font-family: var(--font-display);

  font-size: 0.9rem;

  font-weight: 600;
}

.skill-bar__pct {
  font-family: var(--font-display);

  font-size: 0.85rem;

  font-weight: 700;
}

.skill-bar__track {
  height: 6px;

  background: var(--surface-bg-soft);

  border:
    1px solid var(--border-soft);

  border-radius: var(--radius-pill);

  overflow: hidden;
}

.skill-bar__fill {
  height: 100%;

  border-radius: var(--radius-pill);

  transition:
    width 1.5s var(--ease-out);
}

/* =========================================================
   LIGHT MODE EXPLICIT SAFETY
========================================================= */

[data-theme='light'] .story__img {
  border-color:
    rgba(6, 8, 46, 0.1);
}

[data-theme='light'] .story__stats {
  border-color:
    rgba(6, 8, 46, 0.1);
}

[data-theme='light'] .skill-bar__track {
  background:
    rgba(6, 8, 46, 0.055);
}

/* =========================================================
   TABLET
========================================================= */

@media (max-width: 1024px) {
  .story__inner {
    grid-template-columns: 1fr;

    gap: 3rem;
  }

  .story__img-side {
    max-width: 500px;
  }

  .skills__inner {
    grid-template-columns: 1fr;

    gap: 3rem;
  }

  .values__grid {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }
}

/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 640px) {
  .page-hero {
    padding: 120px 0 60px;
  }

  .values__grid {
    grid-template-columns: 1fr;
  }

  .story__stats {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }

  .story__img-overlay {
    left: 1rem;
    right: 1rem;
    bottom: 1rem;
  }
}
</style>