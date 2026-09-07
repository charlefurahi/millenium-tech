<template>
  <div class="portfolio-page">

    <!-- HERO -->
    <section class="page-hero noise">
      <div class="page-hero__orb page-hero__orb--1"></div>
      <div class="page-hero__orb page-hero__orb--2"></div>

      <div class="container page-hero__inner">

        <div class="section-label animate-fade-up">
          Our Work
        </div>

        <h1 class="page-hero__title animate-fade-up delay-100">
          Projects We're<br />
          <span class="gradient-text">Proud Of</span>
        </h1>

        <p class="page-hero__subtitle animate-fade-up delay-200">
          A showcase of our best design, development, and creative work
          for clients across Tanzania.
        </p>

        <div class="portfolio-filters animate-fade-up delay-300">
          <button
            v-for="category in categories"
            :key="category"
            class="portfolio-filter"
            :class="{ active: activeCategory === category }"
            @click="activeCategory = category"
          >
            {{ category }}
          </button>
        </div>

      </div>
    </section>

    <!-- PROJECTS -->
    <section class="section">
      <div class="container">

        <div class="portfolio-grid">

          <article
            v-for="(project, i) in filteredProjects"
            :key="project.title"
            class="portfolio-card glass-card"
            :class="{
              'portfolio-card--wide': project.wide,
              [`portfolio-card--${project.theme}`]: true
            }"
            :style="{ animationDelay: `${i * 0.07}s` }"
          >

            <div class="portfolio-card__img-wrap">

              <div class="portfolio-card__visual">
                <div class="placeholder-pattern"></div>

                <span class="placeholder-icon">
                  {{ project.icon }}
                </span>

                <span class="placeholder-label">
                  {{ project.category }}
                </span>
              </div>

              <div class="portfolio-card__overlay">
                <router-link
                  to="/contact"
                  class="btn btn-primary portfolio-card__btn"
                >
                  <span>Similar Project?</span>
                </router-link>
              </div>

            </div>

            <div class="portfolio-card__info">

              <div class="portfolio-card__meta">
                <span class="portfolio-card__cat">
                  {{ project.category }}
                </span>

                <span class="portfolio-card__year">
                  {{ project.year }}
                </span>
              </div>

              <h3 class="portfolio-card__title">
                {{ project.title }}
              </h3>

              <p class="portfolio-card__desc">
                {{ project.desc }}
              </p>

              <div class="portfolio-card__tags">
                <span
                  v-for="tag in project.tags"
                  :key="tag"
                  class="portfolio-tag"
                >
                  {{ tag }}
                </span>
              </div>

            </div>

          </article>

        </div>

        <!-- EMPTY STATE -->
        <div
          v-if="filteredProjects.length === 0"
          class="portfolio-empty"
        >
          <span>🎨</span>
          <p>
            No projects in this category yet.
            More coming soon!
          </p>
        </div>

      </div>
    </section>

    <!-- CTA -->
    <section class="section portfolio-cta">
      <div class="portfolio-cta__gradient"></div>

      <div class="container portfolio-cta__inner">

        <h2 class="portfolio-cta__title">
          Let's create something<br />
          <span class="gradient-text">
            amazing together
          </span>
        </h2>

        <p>
          Your next project could be featured right here.
        </p>

        <router-link
          to="/contact"
          class="btn btn-primary portfolio-cta__button"
        >
          <span>Start Your Project</span>

          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </router-link>

      </div>
    </section>

  </div>
</template>

<script setup lang="ts">

import { computed, ref } from 'vue'

const categories = [
  'All',
  'Web Design',
  'Graphics',
  'Photo Editing',
  'Branding'
]

const activeCategory = ref('All')

interface Project {
  title: string
  desc: string
  category: string
  year: string
  icon: string
  tags: string[]
  theme: 'cyan' | 'gold' | 'navy' | 'mixed'
  wide?: boolean
}

const projects: Project[] = [

  {
    title: 'Business Website – RetailCo',
    desc: 'Full e-commerce website with product catalog, ordering system, and mobile-first design.',
    category: 'Web Design',
    year: '2024',
    icon: '🌐',
    theme: 'cyan',
    tags: ['Vue.js', 'Responsive', 'E-commerce'],
    wide: true
  },

  {
    title: 'Brand Identity – TanzaFoods',
    desc: 'Complete brand identity package including logo, color palette, and brand guidelines.',
    category: 'Branding',
    year: '2024',
    icon: '✏️',
    theme: 'gold',
    tags: ['Logo', 'Brand Kit', 'Typography']
  },

  {
    title: 'Event Poster Series',
    desc: 'Series of 12 promotional posters for a local entertainment company.',
    category: 'Graphics',
    year: '2023',
    icon: '🎨',
    theme: 'cyan',
    tags: ['Illustrator', 'Posters', 'Print']
  },

  {
    title: 'Portrait Retouching – Studio A',
    desc: 'Professional photo editing for a photography studio — 100+ portraits retouched.',
    category: 'Photo Editing',
    year: '2024',
    icon: '📷',
    theme: 'gold',
    tags: ['Photoshop', 'Retouching', 'Color Grading']
  },

  {
    title: 'Landing Page – StartupTZ',
    desc: 'High-converting landing page for a tech startup looking to attract early customers.',
    category: 'Web Design',
    year: '2023',
    icon: '🚀',
    theme: 'navy',
    tags: ['HTML/CSS', 'Animations', 'SEO']
  },

  {
    title: 'Social Media Pack – Café Moja',
    desc: 'Complete social media graphics kit: 30+ templates for Instagram, Facebook, and WhatsApp.',
    category: 'Graphics',
    year: '2024',
    icon: '📱',
    theme: 'mixed',
    tags: ['Canva Pro', 'Social Media', 'Templates'],
    wide: true
  }

]

const filteredProjects = computed(() => {
  if (activeCategory.value === 'All') {
    return projects
  }

  return projects.filter(
    project => project.category === activeCategory.value
  )
})

</script>

<style scoped>

.page-hero {
  padding: 140px 0 80px;
  background: var(--bg-primary);
  position: relative;
  overflow: hidden;
  text-align: center;
}

.page-hero__orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.page-hero__orb--1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(
    circle,
    var(--cyan-soft) 0%,
    transparent 70%
  );
  top: -100px;
  left: -100px;
}

.page-hero__orb--2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(
    circle,
    var(--gold-soft) 0%,
    transparent 70%
  );
  bottom: -80px;
  right: -80px;
}

.page-hero__inner {
  position: relative;
  z-index: 1;
}

.page-hero__title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 1.25rem;
  color: var(--text-primary);
}

.page-hero__subtitle {
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 560px;
  margin: 0 auto;
  line-height: 1.7;
}

.portfolio-filters {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 2.5rem;
}

.portfolio-filter {
  background: var(--surface-bg-soft);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  padding: 0.5rem 1.2rem;
  border-radius: var(--radius-pill);
  font-family: var(--font-display);
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-base);
  letter-spacing: 0.04em;
}

.portfolio-filter:hover,
.portfolio-filter.active {
  background: var(--cyan-soft);
  border-color: var(--cyan-400);
  color: var(--cyan-400);
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.portfolio-card {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: fadeUp 0.65s var(--ease-out) both;
}

.portfolio-card--wide {
  grid-column: span 2;
}

.portfolio-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-deep);
}

.portfolio-card__img-wrap {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.portfolio-card--wide .portfolio-card__img-wrap {
  aspect-ratio: 21 / 9;
}

.portfolio-card__visual {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  position: relative;
  overflow: hidden;
  transition: transform var(--transition-slow);
}

.portfolio-card:hover .portfolio-card__visual {
  transform: scale(1.03);
}

.portfolio-card--cyan .portfolio-card__visual {
  background:
    linear-gradient(
      135deg,
      var(--navy-900),
      var(--navy-700)
    );
}

.portfolio-card--gold .portfolio-card__visual {
  background:
    linear-gradient(
      135deg,
      var(--navy-900),
      var(--navy-800)
    );
}

.portfolio-card--navy .portfolio-card__visual {
  background:
    linear-gradient(
      135deg,
      var(--bg-primary),
      var(--surface-bg-strong)
    );
}

.portfolio-card--mixed .portfolio-card__visual {
  background:
    linear-gradient(
      135deg,
      var(--navy-900),
      var(--navy-600)
    );
}

[data-theme='light'] .portfolio-card--cyan .portfolio-card__visual {
  background:
    linear-gradient(
      135deg,
      #e9fbfe,
      #d8f5fa
    );
}

[data-theme='light'] .portfolio-card--gold .portfolio-card__visual {
  background:
    linear-gradient(
      135deg,
      #fff8df,
      #fef0b8
    );
}

[data-theme='light'] .portfolio-card--navy .portfolio-card__visual {
  background:
    linear-gradient(
      135deg,
      #eef0f8,
      #e3e6f2
    );
}

[data-theme='light'] .portfolio-card--mixed .portfolio-card__visual {
  background:
    linear-gradient(
      135deg,
      #eaf0ff,
      #dfe8ff
    );
}

.placeholder-pattern {
  position: absolute;
  inset: 0;

  background-image:
    radial-gradient(
      circle,
      rgba(255,255,255,0.06) 1px,
      transparent 1px
    );

  background-size: 22px 22px;
}

[data-theme='light'] .placeholder-pattern {
  background-image:
    radial-gradient(
      circle,
      rgba(6,8,46,0.06) 1px,
      transparent 1px
    );
}

.placeholder-icon {
  font-size: 2.8rem;
  position: relative;
  z-index: 1;
}

.placeholder-label {
  font-size: 0.7rem;
  font-family: var(--font-display);
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-subtle);
  position: relative;
  z-index: 1;
}

.portfolio-card__overlay {
  position: absolute;
  inset: 0;
  background: color-mix(
    in srgb,
    var(--bg-primary) 88%,
    transparent
  );
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition-base);
}

.portfolio-card:hover .portfolio-card__overlay {
  opacity: 1;
}

.portfolio-card__btn {
  font-size: 0.82rem;
  padding: 0.65rem 1.5rem;
}

.portfolio-card__info {
  padding: 1.5rem;
}

.portfolio-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.65rem;
}

.portfolio-card__cat {
  font-size: 0.72rem;
  font-family: var(--font-display);
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--cyan-400);
}

.portfolio-card__year {
  font-size: 0.75rem;
  color: var(--text-subtle);
}

.portfolio-card__title {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.portfolio-card__desc {
  font-size: 0.82rem;
  color: var(--text-secondary);
  line-height: 1.65;
  margin-bottom: 1rem;
}

.portfolio-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.portfolio-tag {
  background: var(--surface-bg-soft);
  border: 1px solid var(--border-soft);
  color: var(--text-subtle);
  padding: 0.2rem 0.65rem;
  border-radius: var(--radius-pill);
  font-size: 0.7rem;
  font-weight: 500;
}

.portfolio-empty {
  text-align: center;
  padding: 5rem 2rem;
  color: var(--text-subtle);
  font-size: 1rem;
}

.portfolio-empty span {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

.portfolio-cta {
  background: var(--bg-secondary);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.portfolio-cta__gradient {
  position: absolute;
  inset: 0;

  background:
    radial-gradient(
      ellipse at center,
      var(--cyan-soft) 0%,
      transparent 70%
    );

  pointer-events: none;
}

.portfolio-cta__inner {
  position: relative;
  z-index: 1;
  max-width: 600px;
  margin: 0 auto;
}

.portfolio-cta__title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.portfolio-cta p {
  color: var(--text-secondary);
  font-size: 1rem;
}

.portfolio-cta__button {
  margin-top: 2rem;
}

@media (max-width: 900px) {
  .portfolio-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .portfolio-card--wide {
    grid-column: span 2;
  }
}

@media (max-width: 600px) {
  .page-hero {
    padding: 120px 0 60px;
  }

  .portfolio-grid {
    grid-template-columns: 1fr;
  }

  .portfolio-card--wide {
    grid-column: span 1;
  }
}

</style>