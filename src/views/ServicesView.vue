<template>
  <div class="services-page">
    <!-- =====================================================
         HERO
    ====================================================== -->

    <section class="page-hero noise">
      <div class="page-hero__orb page-hero__orb--1"></div>
      <div class="page-hero__orb page-hero__orb--2"></div>

      <div class="container page-hero__inner">
        <div class="section-label animate-fade-up">
          What We Offer
        </div>

        <h1 class="page-hero__title animate-fade-up delay-100">
          Services That<br />
          <span class="gradient-text">Drive Results</span>
        </h1>

        <p class="page-hero__subtitle animate-fade-up delay-200">
          Six core services. One trusted team. Everything your business
          needs to grow in the digital era.
        </p>
      </div>
    </section>

    <!-- =====================================================
         SERVICES
    ====================================================== -->

    <section class="section services-section">
      <div class="container">
        <div class="svc-grid">
          <div
            v-for="(svc, i) in services"
            :key="svc.title"
            class="svc-item glass-card"
            :class="{
              'svc-item--featured': svc.featured
            }"
            :style="{
              animationDelay: `${i * 0.08}s`
            }"
          >
            <!-- MEDIA -->

            <div class="svc-item__media">
              <img
                :src="svc.image"
                :alt="svc.title"
                loading="lazy"
              />

              <div class="svc-item__media-overlay"></div>

              <span
                v-if="svc.featured"
                class="svc-item__badge"
              >
                Popular
              </span>

              <div
                class="svc-item__icon"
                :class="svc.accentClass"
              >
                <span v-html="svc.icon"></span>
              </div>
            </div>

            <!-- BODY -->

            <div class="svc-item__body">

              <!-- TITLE -->

              <h2 class="svc-item__title">
                {{ svc.title }}
              </h2>

              <!-- DESCRIPTION -->

              <p class="svc-item__desc">
                {{ svc.desc }}
              </p>

              <!-- FEATURES -->

              <ul class="svc-item__features">
                <li
                  v-for="feature in svc.features"
                  :key="feature"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>

                  <span>{{ feature }}</span>
                </li>
              </ul>

              <!-- BUTTON -->

              <router-link
                to="/contact"
                class="btn svc-item__btn"
                :class="
                  svc.featured
                    ? 'btn-primary'
                    : 'btn-outline'
                "
              >
                <span>Get a Quote</span>

                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =====================================================
         PROCESS
    ====================================================== -->

    <section class="section process">
      <div class="process__bg dot-pattern"></div>

      <div class="container">
        <div class="section-label">
          How We Work
        </div>

        <h2 class="section-title process__title">
          Our Simple
          <span class="gradient-text">Process</span>
        </h2>

        <div class="process__steps">
          <div
            v-for="(step, i) in steps"
            :key="step.title"
            class="process__step"
          >
            <div class="process__step-num">
              {{ String(i + 1).padStart(2, '0') }}
            </div>

            <div class="process__step-icon">
              {{ step.emoji }}
            </div>

            <h3 class="process__step-title">
              {{ step.title }}
            </h3>

            <p class="process__step-desc">
              {{ step.desc }}
            </p>

            <div
              v-if="i < steps.length - 1"
              class="process__step-arrow"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =====================================================
         CTA
    ====================================================== -->

    <section class="section services-cta">
      <div class="container services-cta__inner">
        <h2 class="services-cta__title">
          Not sure which service<br />
          <span class="gradient-text">you need?</span>
        </h2>

        <p>
          We'll help you figure it out.
          Contact us for a free consultation.
        </p>

        <router-link
          to="/contact"
          class="btn btn-primary services-cta__button"
        >
          <span>Free Consultation</span>

          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            aria-hidden="true"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
/* --------------------------------------------------
   Service card images

   Add one photo per service under src/assets/services/
   using these exact filenames (any .jpg/.png/.webp works,
   just keep the import extension in sync). Vite bundles
   these at build time, so once the files exist here the
   cards pick them up automatically — no other code needs
   to change.
-------------------------------------------------- */

import graphicsImg from '@/assets/services/graphics-design.jpg'
import websiteImg from '@/assets/services/website-development.jpg'
import repairImg from '@/assets/services/computer-repair.jpg'
import photoImg from '@/assets/services/photo-editing.jpg'
import onlineImg from '@/assets/services/online-services.jpg'
import laptopImg from '@/assets/services/laptop-sales.jpg'

const services = [
  {
    title: 'Graphics Designing',
    desc: 'We create visual identities that stop people in their tracks. From social media posts to full brand systems.',
    image: graphicsImg,
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
    </svg>`,
    accentClass: 'icon--cyan',
    features: [
      'Logo Design & Branding',
      'Posters & Banners',
      'Social Media Graphics',
      'Business Cards & Flyers'
    ],
    featured: false
  },

  {
    title: 'Website Development',
    desc: 'Modern, fast websites built with the latest technologies. Responsive, SEO-ready, and easy to manage.',
    image: websiteImg,
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <path d="M3 9h18M9 21V9"/>
    </svg>`,
    accentClass: 'icon--gold',
    features: [
      'Custom Website Design',
      'E-commerce Stores',
      'Landing Pages',
      'Website Maintenance'
    ],
    featured: true
  },

  {
    title: 'Computer Repair',
    desc: 'Experienced technicians who diagnose and fix any computer problem quickly — hardware or software.',
    image: repairImg,
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <path d="M8 21h8M12 17v4"/>
    </svg>`,
    accentClass: 'icon--cyan',
    features: [
      'Hardware Repairs',
      'Software Installation',
      'Virus Removal',
      'Data Recovery'
    ],
    featured: false
  },

  {
    title: 'Photo Editing',
    desc: 'Professional-grade photo retouching, color grading and background removal for stunning visuals.',
    image: photoImg,
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>`,
    accentClass: 'icon--gold',
    features: [
      'Portrait Retouching',
      'Background Removal',
      'Color Correction',
      'Product Photography Edits'
    ],
    featured: false
  },

  {
    title: 'Online Services',
    desc: 'We handle Tanzania government online processes on your behalf — fast, accurate, and stress-free.',
    image: onlineImg,
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
    </svg>`,
    accentClass: 'icon--cyan',
    features: [
      'NIDA Registration',
      'Birth Certificates',
      'Job Applications',
      'Other Official Processes'
    ],
    featured: false
  },

  {
    title: 'Laptop Sales',
    desc: 'Quality laptops at honest prices. We source reliable new and refurbished units tested by our team.',
    image: laptopImg,
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
      <rect x="3" y="4" width="18" height="12" rx="2"/>
      <path d="M1 20h22"/>
    </svg>`,
    accentClass: 'icon--gold',
    features: [
      'New & Refurbished Units',
      'Warranty Included',
      'Technical Assessment',
      'After-sale Support'
    ],
    featured: false
  }
]

const steps = [
  {
    emoji: '💬',
    title: 'Consultation',
    desc: 'We discuss your needs and goals in detail.'
  },
  {
    emoji: '📐',
    title: 'Planning',
    desc: 'We create a clear plan and timeline for your project.'
  },
  {
    emoji: '⚙️',
    title: 'Execution',
    desc: 'Our team gets to work with full transparency.'
  },
  {
    emoji: '🚀',
    title: 'Delivery',
    desc: 'You receive a polished result and ongoing support.'
  }
]
</script>

<style scoped>
/* =========================================================
   PAGE HERO
========================================================= */

.page-hero {
  padding: 140px 0 80px;

  background: var(--bg-primary);
  color: var(--text-primary);

  position: relative;
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

  background:
    radial-gradient(
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

  background:
    radial-gradient(
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

  font-size: clamp(
    2.5rem,
    6vw,
    4rem
  );

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

/* =========================================================
   SERVICES SECTION
========================================================= */

.services-section {
  /*
   * Explicitly follow the theme.
   * This prevents the section from exposing any dark shell
   * background in light mode.
   */
  background: var(--bg-primary);

  color: var(--text-primary);
}

/* =========================================================
   SERVICE GRID
========================================================= */

.svc-grid {
  display: grid;

  grid-template-columns:
    repeat(3, minmax(0, 1fr));

  gap: 1.75rem;
}

/* =========================================================
   SERVICE CARD

   Card is now a media + body composition: the photo
   bleeds flush to the card's own rounded edges (no inner
   padding above it) and the icon badge floats half on/
   half off the image so the card reads as one cohesive
   object instead of "icon block + text block".
========================================================= */

.svc-item {
  padding: 0;
  overflow: hidden;

  display: flex;
  flex-direction: column;

  position: relative;

  min-width: 0;

  animation:
    fadeUp 0.65s var(--ease-out) both;

  color: var(--text-primary);

  transition:
    transform var(--transition-base),
    box-shadow var(--transition-base),
    border-color var(--transition-base);
}

.svc-item:hover {
  transform: translateY(-6px);

  box-shadow: var(--shadow-deep);
}

/* =========================================================
   FEATURED CARD
========================================================= */

.svc-item--featured {
  border-color: var(--glass-border-hover);

  background:
    linear-gradient(
      135deg,
      var(--cyan-soft),
      var(--glass-bg-2)
    );
}

/*
 * Light-mode featured card.
 *
 * Keep the popular card visually special without turning
 * it into an unreadable dark rectangle.
 */

[data-theme='light'] .svc-item--featured {
  background:
    linear-gradient(
      135deg,
      rgba(236, 254, 255, 0.98),
      rgba(255, 255, 255, 0.98)
    );

  border-color:
    rgba(8, 145, 178, 0.34);

  box-shadow:
    0 18px 48px rgba(8, 145, 178, 0.10);
}

/* =========================================================
   CARD MEDIA
========================================================= */

.svc-item__media {
  position: relative;

  width: 100%;
  aspect-ratio: 16 / 10;

  overflow: hidden;

  background: var(--surface-bg-soft);
}

.svc-item__media img {
  width: 100%;
  height: 100%;

  object-fit: cover;

  display: block;

  transition: transform 0.5s var(--ease-out);
}

.svc-item:hover .svc-item__media img {
  transform: scale(1.06);
}

.svc-item__media-overlay {
  position: absolute;
  inset: 0;

  background: linear-gradient(
    180deg,
    rgba(2, 6, 23, 0) 45%,
    rgba(2, 6, 23, 0.65) 100%
  );
}

/* =========================================================
   POPULAR BADGE
   (now sits on top of the photo)
========================================================= */

.svc-item__badge {
  position: absolute;

  top: 0.9rem;
  right: 0.9rem;

  background:
    linear-gradient(
      135deg,
      var(--cyan-500),
      var(--cyan-400)
    );

  color: var(--navy-950);

  font-size: 0.68rem;

  font-family: var(--font-display);

  font-weight: 700;

  letter-spacing: 0.08em;

  text-transform: uppercase;

  padding:
    0.3rem 0.7rem;

  border-radius:
    var(--radius-pill);

  white-space: nowrap;

  box-shadow: 0 6px 16px rgba(2, 6, 23, 0.25);
}

/* =========================================================
   CARD ICON
   Floats half-over the bottom edge of the photo.
========================================================= */

.svc-item__icon {
  position: absolute;

  left: 1.5rem;
  bottom: -24px;

  width: 56px;
  height: 56px;

  border-radius: var(--radius-lg);

  display: flex;

  align-items: center;
  justify-content: center;

  border: 3px solid var(--surface-bg);

  flex-shrink: 0;

  box-shadow: 0 8px 20px rgba(2, 6, 23, 0.25);

  transition:
    background-color var(--transition-base),
    border-color var(--transition-base),
    color var(--transition-base);
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
   CARD BODY
========================================================= */

.svc-item__body {
  padding: 2.25rem 1.75rem 1.75rem;

  padding-top: 2.5rem;

  display: flex;
  flex-direction: column;

  flex: 1;
}

/* =========================================================
   CARD TITLE
========================================================= */

.svc-item__title {
  font-family: var(--font-display);

  font-size: 1.2rem;

  font-weight: 700;

  color: var(--text-primary);

  margin-bottom: 0.75rem;

  line-height: 1.25;
}

/* =========================================================
   CARD DESCRIPTION
========================================================= */

.svc-item__desc {
  font-size: 0.875rem;

  color: var(--text-secondary);

  line-height: 1.75;

  margin-bottom: 1.5rem;
}

/* =========================================================
   FEATURES
========================================================= */

.svc-item__features {
  list-style: none;

  display: flex;

  flex-direction: column;

  gap: 0.55rem;

  margin-bottom: 2rem;

  flex: 1;
}

.svc-item__features li {
  display: flex;

  align-items: center;

  gap: 0.6rem;

  font-size: 0.83rem;

  color: var(--text-primary);

  line-height: 1.45;
}

.svc-item__features li svg {
  color: var(--cyan-text);

  flex-shrink: 0;
}

/* =========================================================
   CARD BUTTON
========================================================= */

.svc-item__btn {
  width: 100%;

  font-size: 0.85rem;

  padding:
    0.75rem 1.5rem;

  justify-content: center;
}

/* =========================================================
   PROCESS
========================================================= */

.process {
  background: var(--bg-secondary);

  color: var(--text-primary);

  overflow: hidden;

  transition:
    background-color var(--transition-slow),
    color var(--transition-slow);
}

.process__bg {
  position: absolute;

  inset: 0;

  opacity: 0.25;

  z-index: -1;
}

.process__title {
  margin-bottom: 3.5rem;
}

/* =========================================================
   PROCESS STEPS
========================================================= */

.process__steps {
  display: flex;

  align-items: flex-start;

  gap: 0;

  position: relative;

  z-index: 1;
}

.process__step {
  flex: 1;

  text-align: center;

  padding:
    2.5rem 2rem;

  position: relative;
}

.process__step-num {
  font-family: var(--font-display);

  font-size: 0.7rem;

  font-weight: 700;

  letter-spacing: 0.15em;

  color: var(--cyan-text);

  margin-bottom: 1rem;
}

.process__step-icon {
  font-size: 2.4rem;

  margin-bottom: 1rem;
}

.process__step-title {
  font-family: var(--font-display);

  font-size: 1.1rem;

  font-weight: 700;

  color: var(--text-primary);

  margin-bottom: 0.6rem;
}

.process__step-desc {
  font-size: 0.875rem;

  color: var(--text-secondary);

  line-height: 1.65;
}

.process__step-arrow {
  position: absolute;

  top:
    calc(2.5rem + 3.4rem);

  right: -12px;

  color: var(--text-subtle);

  z-index: 2;
}

/* =========================================================
   CTA
========================================================= */

.services-cta {
  background: var(--bg-primary);

  color: var(--text-primary);

  text-align: center;

  transition:
    background-color var(--transition-slow),
    color var(--transition-slow);
}

.services-cta__inner {
  max-width: 600px;

  margin: 0 auto;
}

.services-cta__title {
  font-family: var(--font-display);

  font-size: clamp(
    2rem,
    4vw,
    2.8rem
  );

  font-weight: 800;

  line-height: 1.15;

  letter-spacing: -0.02em;

  margin-bottom: 1rem;

  color: var(--text-primary);
}

.services-cta p {
  color: var(--text-secondary);

  font-size: 1rem;
}

.services-cta__button {
  margin-top: 2rem;
}

/* =========================================================
   LIGHT-MODE CTA SAFETY
========================================================= */

[data-theme='light'] .services-cta {
  background: var(--bg-primary);
}

[data-theme='light'] .services-cta__title {
  color: var(--text-primary);
}

[data-theme='light'] .services-cta p {
  color: var(--text-secondary);
}

/* =========================================================
   TABLET
========================================================= */

@media (max-width: 1024px) {
  .svc-grid {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }

  .process__steps {
    flex-wrap: wrap;
  }

  .process__step {
    flex: 0 0 50%;
  }

  .process__step-arrow {
    display: none;
  }
}

/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 640px) {
  .page-hero {
    padding: 120px 0 60px;
  }

  .svc-grid {
    grid-template-columns: 1fr;
  }

  .process__step {
    flex: 0 0 100%;
  }

  .svc-item__body {
    padding: 2.25rem 1.25rem 1.5rem;
  }

  .svc-item__btn {
    width: 100%;
  }
}
</style>