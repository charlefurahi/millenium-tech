<template>
  <div class="portfolio-page">

    <!-- HERO -->
    <section class="page-hero noise">
      <div class="page-hero__orb page-hero__orb--1"></div>
      <div class="page-hero__orb page-hero__orb--2"></div>

      <div class="container page-hero__inner">
        <div class="section-label animate-fade-up">Our Work</div>

        <h1 class="page-hero__title animate-fade-up delay-100">
          Work that makes<br />
          <span class="gradient-text">an impact.</span>
        </h1>

        <p class="page-hero__subtitle animate-fade-up delay-200">
          A selection of digital, creative, branding, and technical projects
          built with purpose for businesses and individuals across Tanzania.
        </p>

        <div class="portfolio-filters animate-fade-up delay-300">
          <button
            v-for="category in categories"
            :key="category"
            type="button"
            class="portfolio-filter"
            :class="{ active: activeCategory === category }"
            @click="activeCategory = category"
          >
            {{ category }}
          </button>
        </div>
      </div>
    </section>

    <!-- QUICK STATS -->
    <section class="portfolio-stats">
      <div class="container portfolio-stats__grid">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="portfolio-stat glass-card"
        >
          <strong>{{ stat.value }}</strong>
          <span>{{ stat.label }}</span>
        </div>
      </div>
    </section>

    <!-- FEATURED PROJECT -->
    <section class="section portfolio-featured">
      <div class="container">
        <div class="section-heading">
          <div class="section-label">Featured Project</div>
          <h2 class="section-heading__title">
            One project.<br />
            <span class="gradient-text">A complete solution.</span>
          </h2>
          <p class="section-heading__text">
            From the first idea to the final delivery, we focus on creating
            work that looks good, works well, and solves a real problem.
          </p>
        </div>

        <article class="featured-card glass-card">
          <div class="featured-card__visual">
            <img
              :src="featuredProject.image"
              :alt="featuredProject.title"
              loading="lazy"
            />
            <div class="featured-card__visual-overlay"></div>
            <span class="featured-card__badge">Featured</span>
          </div>

          <div class="featured-card__content">
            <span class="portfolio-card__cat">
              {{ featuredProject.category }}
            </span>

            <h3>{{ featuredProject.title }}</h3>

            <p>{{ featuredProject.desc }}</p>

            <div class="portfolio-card__tags">
              <span
                v-for="tag in featuredProject.tags"
                :key="tag"
                class="portfolio-tag"
              >
                {{ tag }}
              </span>
            </div>

            <button
              type="button"
              class="btn btn-primary featured-card__button"
              @click="openProject(featuredProject)"
            >
              View project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2.2" stroke-linecap="round"
                stroke-linejoin="round" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </article>
      </div>
    </section>

    <!-- PROJECTS -->
    <section class="section portfolio-work">
      <div class="container">
        <div class="portfolio-section-head">
          <div>
            <div class="section-label">Selected Work</div>
            <h2 class="portfolio-section-title">
              Explore our <span class="gradient-text">projects.</span>
            </h2>
          </div>

          <p>
            Filter the collection to find the type of work you are looking for.
          </p>
        </div>

        <TransitionGroup
          name="portfolio-list"
          tag="div"
          class="portfolio-grid"
        >
          <article
            v-for="(project, i) in filteredProjects"
            :key="project.title"
            class="portfolio-card glass-card"
            :class="{
              'portfolio-card--wide': project.wide,
              [`portfolio-card--${project.theme}`]: true
            }"
            :style="{ '--delay': `${i * 0.06}s` }"
          >
            <button
              type="button"
              class="portfolio-card__image-button"
              :aria-label="`View ${project.title}`"
              @click="openProject(project)"
            >
              <div class="portfolio-card__img-wrap">
                <img
                  :src="project.image"
                  :alt="project.title"
                  class="portfolio-card__image"
                  loading="lazy"
                />

                <div class="portfolio-card__image-shade"></div>

                <span class="portfolio-card__view">
                  View project
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </div>
            </button>

            <div class="portfolio-card__info">
              <div class="portfolio-card__meta">
                <span class="portfolio-card__cat">{{ project.category }}</span>
                <span class="portfolio-card__year">{{ project.year }}</span>
              </div>

              <h3 class="portfolio-card__title">{{ project.title }}</h3>

              <p class="portfolio-card__desc">{{ project.desc }}</p>

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
        </TransitionGroup>

        <div v-if="filteredProjects.length === 0" class="portfolio-empty">
          <span>Coming soon</span>
          <p>No projects have been added to this category yet.</p>
        </div>
      </div>
    </section>

    <!-- HOW WE WORK -->
    <section class="section portfolio-process">
      <div class="container">
        <div class="section-heading section-heading--center">
          <div class="section-label">Our Process</div>
          <h2 class="section-heading__title">
            From idea to <span class="gradient-text">delivery.</span>
          </h2>
          <p class="section-heading__text">
            A simple process keeps every project focused, transparent, and
            moving forward.
          </p>
        </div>

        <div class="process-grid">
          <article
            v-for="(step, index) in processSteps"
            :key="step.title"
            class="process-card"
          >
            <div class="process-card__number">0{{ index + 1 }}</div>
            <div class="process-card__line"></div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- CAPABILITIES -->
    <section class="section portfolio-capabilities">
      <div class="container capabilities-layout">
        <div>
          <div class="section-label">What We Can Build</div>
          <h2 class="section-heading__title">
            More than a portfolio.<br />
            <span class="gradient-text">A full creative partner.</span>
          </h2>
        </div>

        <div class="capability-list">
          <div
            v-for="capability in capabilities"
            :key="capability"
            class="capability-item"
          >
            <span class="capability-dot"></span>
            <span>{{ capability }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section portfolio-cta">
      <div class="portfolio-cta__gradient"></div>

      <div class="container portfolio-cta__inner">
        <div class="section-label">Have a project in mind?</div>

        <h2 class="portfolio-cta__title">
          Let's create something<br />
          <span class="gradient-text">worth showing off.</span>
        </h2>

        <p>
          Tell us what you need and let's turn the idea into something real.
        </p>

        <router-link
          to="/contact"
          class="btn btn-primary portfolio-cta__button"
        >
          <span>Start Your Project</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
            stroke-linejoin="round" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </router-link>
      </div>
    </section>

    <!-- PROJECT MODAL -->
    <Teleport to="body">
      <Transition name="project-modal">
        <div
          v-if="selectedProject"
          class="project-modal"
          role="dialog"
          aria-modal="true"
          :aria-label="selectedProject.title"
          @click.self="closeProject"
        >
          <div class="project-modal__card glass-card">
            <button
              type="button"
              class="project-modal__close"
              aria-label="Close project details"
              @click="closeProject"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" aria-hidden="true">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>

            <div class="project-modal__image">
              <img
                :src="selectedProject.image"
                :alt="selectedProject.title"
              />
            </div>

            <div class="project-modal__body">
              <div class="portfolio-card__meta">
                <span class="portfolio-card__cat">
                  {{ selectedProject.category }}
                </span>
                <span class="portfolio-card__year">
                  {{ selectedProject.year }}
                </span>
              </div>

              <h2>{{ selectedProject.title }}</h2>
              <p>{{ selectedProject.desc }}</p>

              <div class="portfolio-card__tags">
                <span
                  v-for="tag in selectedProject.tags"
                  :key="tag"
                  class="portfolio-tag"
                >
                  {{ tag }}
                </span>
              </div>

              <router-link
                to="/contact"
                class="btn btn-primary project-modal__cta"
                @click="closeProject"
              >
                I want a project like this
              </router-link>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'

type ProjectTheme = 'cyan' | 'gold' | 'navy' | 'mixed'

interface Project {
  title: string
  desc: string
  category: string
  year: string
  tags: string[]
  theme: ProjectTheme
  image: string
  wide?: boolean
}

const categories = [
  'All',
  'Web Design',
  'Graphics',
  'Photo Editing',
  'Branding'
]

const activeCategory = ref('All')
const selectedProject = ref<Project | null>(null)

const stats = [
  { value: '25+', label: 'Projects delivered' },
  { value: '5', label: 'Creative services' },
  { value: '100%', label: 'Responsive work' },
  { value: 'TZ', label: 'Based in Tanzania' }
]

const projects: Project[] = [
  {
    title: 'Business Website – RetailCo',
    desc: 'A responsive business and e-commerce experience with product presentation, ordering flow, and a mobile-first interface.',
    category: 'Web Design',
    year: '2024',
    theme: 'cyan',
    tags: ['Vue.js', 'Responsive', 'E-commerce'],
    image: '/src/assets/services/website-development.jpg',
    wide: true
  },
  {
    title: 'Brand Identity – TanzaFoods',
    desc: 'A complete visual identity direction covering logo treatment, typography, color usage, and brand presentation.',
    category: 'Branding',
    year: '2024',
    theme: 'gold',
    tags: ['Logo', 'Brand Kit', 'Typography'],
    image: '/src/assets/services/graphics-design.jpg'
  },
  {
    title: 'Event Poster Series',
    desc: 'A coordinated collection of promotional graphics designed for digital sharing and high-quality print output.',
    category: 'Graphics',
    year: '2023',
    theme: 'cyan',
    tags: ['Illustrator', 'Posters', 'Print'],
    image: '/src/assets/services/graphics-design.jpg'
  },
  {
    title: 'Portrait Retouching – Studio A',
    desc: 'Professional portrait enhancement with careful retouching, tonal correction, and polished color treatment.',
    category: 'Photo Editing',
    year: '2024',
    theme: 'gold',
    tags: ['Photoshop', 'Retouching', 'Color Grading'],
    image: '/src/assets/services/photo-editing.jpg'
  },
  {
    title: 'Landing Page – StartupTZ',
    desc: 'A focused landing page concept designed around clear messaging, strong calls to action, and responsive behavior.',
    category: 'Web Design',
    year: '2023',
    theme: 'navy',
    tags: ['HTML/CSS', 'Animations', 'SEO'],
    image: '/src/assets/services/website-development.jpg'
  },
  {
    title: 'Social Media Pack – Café Moja',
    desc: 'A reusable social media graphics system with templates that keep promotions consistent across multiple platforms.',
    category: 'Graphics',
    year: '2024',
    theme: 'mixed',
    tags: ['Social Media', 'Templates', 'Campaign'],
    image: '/src/assets/services/graphics-design.jpg',
    wide: true
  }
]

const featuredProject = projects[0]

const processSteps = [
  {
    title: 'Discover',
    desc: 'We understand the goal, audience, content, and requirements before production begins.'
  },
  {
    title: 'Plan',
    desc: 'We define the structure, visual direction, technical approach, and delivery milestones.'
  },
  {
    title: 'Create',
    desc: 'Design and development come together to turn the approved direction into the final work.'
  },
  {
    title: 'Refine',
    desc: 'We review the result, make focused improvements, and prepare everything for delivery.'
  }
]

const capabilities = [
  'Website design & development',
  'Brand identity & logo design',
  'Posters, flyers & promotional graphics',
  'Photo retouching & creative editing',
  'Social media design systems',
  'Computer repair & technical support',
  'Online application & digital services'
]

const filteredProjects = computed(() => {
  if (activeCategory.value === 'All') {
    return projects
  }

  return projects.filter(
    project => project.category === activeCategory.value
  )
})

const openProject = (project: Project) => {
  selectedProject.value = project
  document.body.style.overflow = 'hidden'
}

const closeProject = () => {
  selectedProject.value = null
  document.body.style.overflow = ''
}

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && selectedProject.value) {
    closeProject()
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('keydown', handleEscape)
}

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleEscape)
  }
  document.body.style.overflow = ''
})
</script>

<style scoped>
.page-hero {
  padding: 140px 0 72px;
  background: var(--bg-primary);
  position: relative;
  overflow: hidden;
  text-align: center;
}

.page-hero__orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(8px);
}

.page-hero__orb--1 {
  width: 520px;
  height: 520px;
  background: radial-gradient(circle, var(--cyan-soft) 0%, transparent 70%);
  top: -150px;
  left: -120px;
}

.page-hero__orb--2 {
  width: 420px;
  height: 420px;
  background: radial-gradient(circle, var(--gold-soft) 0%, transparent 70%);
  bottom: -130px;
  right: -100px;
}

.page-hero__inner {
  position: relative;
  z-index: 1;
}

.page-hero__title {
  font-family: var(--font-display);
  font-size: clamp(2.8rem, 7vw, 5rem);
  font-weight: 800;
  line-height: 1.03;
  letter-spacing: -0.045em;
  margin-bottom: 1.35rem;
  color: var(--text-primary);
}

.page-hero__subtitle {
  font-size: 1.05rem;
  color: var(--text-secondary);
  max-width: 650px;
  margin: 0 auto;
  line-height: 1.75;
}

.portfolio-filters {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  flex-wrap: wrap;
  margin-top: 2.5rem;
}

.portfolio-filter {
  background: var(--surface-bg-soft);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  padding: 0.58rem 1.25rem;
  border-radius: var(--radius-pill);
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-base);
}

.portfolio-filter:hover,
.portfolio-filter.active {
  background: var(--cyan-soft);
  border-color: var(--cyan-400);
  color: var(--cyan-400);
  transform: translateY(-2px);
}

.portfolio-stats {
  padding: 0 0 1rem;
  background: var(--bg-primary);
}

.portfolio-stats__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.portfolio-stat {
  padding: 1.35rem 1rem;
  text-align: center;
}

.portfolio-stat strong {
  display: block;
  font-family: var(--font-display);
  font-size: 1.65rem;
  line-height: 1;
  color: var(--text-primary);
  margin-bottom: 0.4rem;
}

.portfolio-stat span {
  color: var(--text-subtle);
  font-size: 0.76rem;
}

.section-heading {
  max-width: 680px;
  margin-bottom: 2.25rem;
}

.section-heading--center {
  margin-inline: auto;
  text-align: center;
}

.section-heading__title,
.portfolio-section-title {
  font-family: var(--font-display);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.035em;
  font-size: clamp(2rem, 4vw, 3rem);
  color: var(--text-primary);
  margin: 0.55rem 0 0.85rem;
}

.section-heading__text {
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 610px;
}

.featured-card {
  display: grid;
  grid-template-columns: 1.25fr 0.75fr;
  overflow: hidden;
}

.featured-card__visual {
  min-height: 420px;
  position: relative;
  overflow: hidden;
  background: var(--surface-bg-strong);
}

.featured-card__visual img {
  width: 100%;
  height: 100%;
  min-height: 420px;
  object-fit: cover;
  transition: transform 700ms var(--ease-out);
}

.featured-card:hover .featured-card__visual img {
  transform: scale(1.045);
}

.featured-card__visual-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    transparent 50%,
    rgba(0, 0, 0, 0.42)
  );
}

.featured-card__badge {
  position: absolute;
  left: 1.25rem;
  bottom: 1.25rem;
  padding: 0.35rem 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: var(--radius-pill);
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(10px);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.featured-card__content {
  padding: clamp(1.7rem, 4vw, 3rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.featured-card__content h3 {
  font-family: var(--font-display);
  font-size: clamp(1.55rem, 3vw, 2.2rem);
  color: var(--text-primary);
  margin: 0.65rem 0;
}

.featured-card__content p {
  color: var(--text-secondary);
  line-height: 1.75;
  margin-bottom: 1.2rem;
}

.featured-card__button {
  align-self: flex-start;
  margin-top: 1.5rem;
}

.portfolio-work {
  background: var(--bg-secondary);
}

.portfolio-section-head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 2rem;
}

.portfolio-section-head > p {
  max-width: 360px;
  color: var(--text-secondary);
  font-size: 0.88rem;
  line-height: 1.7;
  margin-bottom: 0.2rem;
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
  animation: fadeUp 0.6s var(--ease-out) both;
  animation-delay: var(--delay);
  transition:
    transform var(--transition-base),
    box-shadow var(--transition-base);
}

.portfolio-card--wide {
  grid-column: span 2;
}

.portfolio-card:hover {
  transform: translateY(-7px);
  box-shadow: var(--shadow-deep);
}

.portfolio-card__image-button {
  appearance: none;
  border: 0;
  padding: 0;
  width: 100%;
  background: transparent;
  cursor: pointer;
  color: inherit;
  text-align: left;
}

.portfolio-card__img-wrap {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--surface-bg-strong);
}

.portfolio-card--wide .portfolio-card__img-wrap {
  aspect-ratio: 21 / 9;
}

.portfolio-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 650ms var(--ease-out);
}

.portfolio-card:hover .portfolio-card__image {
  transform: scale(1.06);
}

.portfolio-card__image-shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.03),
    rgba(0, 0, 0, 0.58)
  );
  opacity: 0.72;
  transition: opacity var(--transition-base);
}

.portfolio-card:hover .portfolio-card__image-shade {
  opacity: 1;
}

.portfolio-card__view {
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: var(--radius-pill);
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(10px);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 700;
  opacity: 0;
  transform: translateY(7px);
  transition: all var(--transition-base);
}

.portfolio-card:hover .portfolio-card__view,
.portfolio-card__image-button:focus-visible .portfolio-card__view {
  opacity: 1;
  transform: translateY(0);
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
  font-size: 0.7rem;
  font-family: var(--font-display);
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--cyan-400);
}

.portfolio-card__year {
  font-size: 0.74rem;
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
  font-size: 0.68rem;
  font-weight: 500;
}

.portfolio-list-enter-active,
.portfolio-list-leave-active {
  transition: all 300ms ease;
}

.portfolio-list-enter-from,
.portfolio-list-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
}

.portfolio-list-leave-active {
  position: absolute;
}

.portfolio-empty {
  text-align: center;
  padding: 5rem 2rem;
  color: var(--text-subtle);
}

.portfolio-empty span {
  display: block;
  font-family: var(--font-display);
  color: var(--text-primary);
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.process-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 3rem;
}

.process-card {
  position: relative;
  padding: 1.5rem 1.35rem;
  border-top: 1px solid var(--border-color);
}

.process-card__number {
  font-family: var(--font-display);
  font-size: 0.7rem;
  font-weight: 800;
  color: var(--cyan-400);
  letter-spacing: 0.1em;
  margin-bottom: 2rem;
}

.process-card__line {
  width: 34px;
  height: 1px;
  background: var(--cyan-400);
  margin-bottom: 1.1rem;
}

.process-card h3 {
  font-family: var(--font-display);
  color: var(--text-primary);
  margin-bottom: 0.55rem;
  font-size: 1rem;
}

.process-card p {
  color: var(--text-secondary);
  font-size: 0.82rem;
  line-height: 1.7;
}

.portfolio-capabilities {
  background: var(--bg-secondary);
}

.capabilities-layout {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: clamp(3rem, 8vw, 7rem);
  align-items: start;
}

.capability-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.7rem;
}

.capability-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  min-height: 52px;
  padding: 0.75rem 0.9rem;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-md);
  background: var(--surface-bg);
  color: var(--text-secondary);
  font-size: 0.82rem;
  transition:
    transform var(--transition-base),
    border-color var(--transition-base);
}

.capability-item:hover {
  transform: translateX(4px);
  border-color: var(--glass-border-hover);
}

.capability-dot {
  width: 7px;
  height: 7px;
  flex: 0 0 7px;
  border-radius: 50%;
  background: var(--cyan-400);
  box-shadow: 0 0 0 5px var(--cyan-soft);
}

.portfolio-cta {
  background: var(--bg-primary);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.portfolio-cta__gradient {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at center,
    var(--cyan-soft) 0%,
    transparent 68%
  );
  pointer-events: none;
}

.portfolio-cta__inner {
  position: relative;
  z-index: 1;
  max-width: 700px;
  margin: 0 auto;
}

.portfolio-cta__title {
  font-family: var(--font-display);
  font-size: clamp(2.3rem, 5vw, 3.6rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.035em;
  margin: 0.65rem 0 1rem;
  color: var(--text-primary);
}

.portfolio-cta p {
  color: var(--text-secondary);
  font-size: 1rem;
}

.portfolio-cta__button {
  margin-top: 2rem;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
}

/* --------------------------------------------------
   PROJECT MODAL
-------------------------------------------------- */

.project-modal {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: grid;
  place-items: center;
  padding: 1.25rem;
  background: rgba(3, 5, 25, 0.72);
  backdrop-filter: blur(12px);
}

.project-modal__card {
  width: min(920px, 100%);
  max-height: min(88vh, 820px);
  overflow: auto;
  position: relative;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
}

.project-modal__close {
  position: absolute;
  z-index: 2;
  top: 0.85rem;
  right: 0.85rem;
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.45);
  color: #fff;
  cursor: pointer;
  backdrop-filter: blur(10px);
}

.project-modal__image {
  min-height: 480px;
  background: var(--surface-bg-strong);
}

.project-modal__image img {
  width: 100%;
  height: 100%;
  min-height: 480px;
  object-fit: cover;
}

.project-modal__body {
  padding: clamp(1.5rem, 4vw, 3rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.project-modal__body h2 {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  line-height: 1.1;
  color: var(--text-primary);
  margin-bottom: 0.8rem;
}

.project-modal__body p {
  color: var(--text-secondary);
  line-height: 1.75;
  margin-bottom: 1.25rem;
}

.project-modal__cta {
  align-self: flex-start;
  margin-top: 1.75rem;
}

.project-modal-enter-active,
.project-modal-leave-active {
  transition: opacity 220ms ease;
}

.project-modal-enter-active .project-modal__card,
.project-modal-leave-active .project-modal__card {
  transition: transform 260ms var(--ease-out);
}

.project-modal-enter-from,
.project-modal-leave-to {
  opacity: 0;
}

.project-modal-enter-from .project-modal__card,
.project-modal-leave-to .project-modal__card {
  transform: translateY(18px) scale(0.98);
}

@media (max-width: 950px) {
  .portfolio-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .portfolio-card--wide {
    grid-column: span 2;
  }

  .portfolio-stats__grid,
  .process-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .featured-card {
    grid-template-columns: 1fr;
  }

  .featured-card__visual,
  .featured-card__visual img {
    min-height: 360px;
  }
}

@media (max-width: 700px) {
  .page-hero {
    padding: 120px 0 58px;
  }

  .portfolio-section-head {
    display: block;
  }

  .portfolio-section-head > p {
    margin-top: 1rem;
  }

  .capabilities-layout {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .capability-list {
    grid-template-columns: 1fr;
  }

  .project-modal__card {
    grid-template-columns: 1fr;
  }

  .project-modal__image,
  .project-modal__image img {
    min-height: 260px;
    max-height: 320px;
  }
}

@media (max-width: 600px) {
  .portfolio-grid,
  .portfolio-stats__grid,
  .process-grid {
    grid-template-columns: 1fr;
  }

  .portfolio-card--wide {
    grid-column: span 1;
  }

  .portfolio-card__view {
    opacity: 1;
    transform: none;
  }

  .portfolio-stat {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: left;
  }

  .portfolio-stat strong {
    margin: 0;
  }

  .featured-card__visual,
  .featured-card__visual img {
    min-height: 250px;
  }

  .featured-card__button {
    width: 100%;
    justify-content: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .portfolio-card,
  .portfolio-card__image,
  .featured-card__visual img,
  .portfolio-filter,
  .capability-item {
    animation: none;
    transition: none;
  }
}
</style>
