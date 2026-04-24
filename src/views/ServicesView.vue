<template>
  <div class="services-page">
    <!-- Hero -->
    <section class="page-hero noise">
      <div class="page-hero__orb page-hero__orb--1"></div>
      <div class="page-hero__orb page-hero__orb--2"></div>
      <div class="container page-hero__inner">
        <div class="section-label animate-fade-up">What We Offer</div>
        <h1 class="page-hero__title animate-fade-up delay-100">
          Services That<br />
          <span class="gradient-text">Drive Results</span>
        </h1>
        <p class="page-hero__subtitle animate-fade-up delay-200">
          Six core services. One trusted team. Everything your business needs to grow in the digital era.
        </p>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="section">
      <div class="container">
        <div class="svc-grid">
          <div
            v-for="(svc, i) in services"
            :key="svc.title"
            class="svc-item glass-card"
            :class="{ 'svc-item--featured': svc.featured }"
            :style="{ animationDelay: `${i * 0.08}s` }"
          >
            <div class="svc-item__header">
              <div class="svc-item__icon" :class="svc.accentClass">
                <span v-html="svc.icon"></span>
              </div>
              <span v-if="svc.featured" class="svc-item__badge">Popular</span>
            </div>
            <h2 class="svc-item__title">{{ svc.title }}</h2>
            <p class="svc-item__desc">{{ svc.desc }}</p>
            <ul class="svc-item__features">
              <li v-for="f in svc.features" :key="f">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                {{ f }}
              </li>
            </ul>
            <router-link to="/contact" class="btn svc-item__btn" :class="svc.featured ? 'btn-primary' : 'btn-outline'">
              <span>Get a Quote</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section class="section process">
      <div class="process__bg dot-pattern"></div>
      <div class="container">
        <div class="section-label">How We Work</div>
        <h2 class="section-title" style="margin-bottom: 3.5rem;">
          Our Simple <span class="gradient-text">Process</span>
        </h2>
        <div class="process__steps">
          <div v-for="(step, i) in steps" :key="step.title" class="process__step">
            <div class="process__step-num">{{ String(i + 1).padStart(2, '0') }}</div>
            <div class="process__step-icon">{{ step.emoji }}</div>
            <h3 class="process__step-title">{{ step.title }}</h3>
            <p class="process__step-desc">{{ step.desc }}</p>
            <div v-if="i < steps.length - 1" class="process__step-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section services-cta">
      <div class="container services-cta__inner">
        <h2 class="services-cta__title">
          Not sure which service<br />
          <span class="gradient-text">you need?</span>
        </h2>
        <p>We'll help you figure it out. Contact us for a free consultation.</p>
        <router-link to="/contact" class="btn btn-primary" style="margin-top: 2rem;">
          <span>Free Consultation</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const services = [
  {
    title: 'Graphics Designing',
    desc: 'We create visual identities that stop people in their tracks. From social media posts to full brand systems.',
    icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',
    accentClass: 'icon--cyan',
    features: ['Logo Design & Branding', 'Posters & Banners', 'Social Media Graphics', 'Business Cards & Flyers'],
    featured: false,
  },
  {
    title: 'Website Development',
    desc: 'Modern, fast websites built with the latest technologies. Responsive, SEO-ready, and easy to manage.',
    icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>',
    accentClass: 'icon--gold',
    features: ['Custom Website Design', 'E-commerce Stores', 'Landing Pages', 'Website Maintenance'],
    featured: true,
  },
  {
    title: 'Computer Repair',
    desc: 'Experienced technicians who diagnose and fix any computer problem quickly — hardware or software.',
    icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
    accentClass: 'icon--cyan',
    features: ['Hardware Repairs', 'Software Installation', 'Virus Removal', 'Data Recovery'],
    featured: false,
  },
  {
    title: 'Photo Editing',
    desc: 'Professional-grade photo retouching, color grading and background removal for stunning visuals.',
    icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
    accentClass: 'icon--gold',
    features: ['Portrait Retouching', 'Background Removal', 'Color Correction', 'Product Photography Edits'],
    featured: false,
  },
  {
    title: 'Online Services',
    desc: 'We handle Tanzania government online processes on your behalf — fast, accurate, and stress-free.',
    icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>',
    accentClass: 'icon--cyan',
    features: ['NIDA Registration', 'Birth Certificates', 'Job Applications', 'Other Official Processes'],
    featured: false,
  },
  {
    title: 'Laptop Sales',
    desc: 'Quality laptops at honest prices. We source reliable new and refurbished units tested by our team.',
    icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M1 20h22"/></svg>',
    accentClass: 'icon--gold',
    features: ['New & Refurbished Units', 'Warranty Included', 'Technical Assessment', 'After-sale Support'],
    featured: false,
  },
]

const steps = [
  { emoji: '💬', title: 'Consultation', desc: 'We discuss your needs and goals in detail.' },
  { emoji: '📐', title: 'Planning',     desc: 'We create a clear plan and timeline for your project.' },
  { emoji: '⚙️', title: 'Execution',    desc: 'Our team gets to work with full transparency.' },
  { emoji: '🚀', title: 'Delivery',     desc: 'You receive a polished result and ongoing support.' },
]
</script>

<style scoped>
/* Page Hero */
.page-hero {
  padding: 140px 0 80px;
  background: var(--navy-950);
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
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%);
  top: -100px; left: -100px;
}
.page-hero__orb--2 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(251,191,36,0.05) 0%, transparent 70%);
  bottom: -80px; right: -80px;
}
.page-hero__inner { position: relative; z-index: 1; }
.page-hero__title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 1.25rem;
}
.page-hero__subtitle {
  font-size: 1.1rem;
  color: var(--white-70);
  max-width: 560px;
  margin: 0 auto;
  line-height: 1.7;
}

/* Services Grid */
.svc-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
.svc-item {
  padding: 2.25rem;
  display: flex;
  flex-direction: column;
  gap: 0;
  transition: all 0.4s var(--ease-out);
  position: relative;
}
.svc-item:hover {
  transform: translateY(-6px);
  box-shadow: 0 24px 70px rgba(0,0,0,0.35);
}
.svc-item--featured {
  border-color: rgba(34,211,238,0.3);
  background: linear-gradient(135deg, rgba(34,211,238,0.06), rgba(255,255,255,0.04));
}
.svc-item__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}
.svc-item__icon {
  width: 56px; height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
}
.icon--cyan {
  background: rgba(34,211,238,0.12);
  border-color: rgba(34,211,238,0.2);
  color: var(--cyan-400);
}
.icon--gold {
  background: rgba(251,191,36,0.12);
  border-color: rgba(251,191,36,0.2);
  color: var(--gold-400);
}
.svc-item__badge {
  background: linear-gradient(135deg, var(--cyan-500), var(--cyan-400));
  color: var(--navy-950);
  font-size: 0.68rem;
  font-family: var(--font-display);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.25rem 0.65rem;
  border-radius: 100px;
}
.svc-item__title {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--white);
  margin-bottom: 0.75rem;
}
.svc-item__desc {
  font-size: 0.875rem;
  color: var(--white-70);
  line-height: 1.75;
  margin-bottom: 1.5rem;
}
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
  color: var(--white-90);
}
.svc-item__features li svg { color: var(--cyan-400); flex-shrink: 0; }
.svc-item__btn {
  font-size: 0.85rem;
  padding: 0.75rem 1.5rem;
  justify-content: center;
}

/* Process */
.process {
  background: var(--navy-900);
  overflow: hidden;
}
.process__bg {
  position: absolute;
  inset: 0;
  opacity: 0.25;
}
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
  padding: 2.5rem 2rem;
  position: relative;
}
.process__step-num {
  font-family: var(--font-display);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: var(--cyan-400);
  margin-bottom: 1rem;
}
.process__step-icon {
  font-size: 2.4rem;
  margin-bottom: 1rem;
  display: block;
}
.process__step-title {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--white);
  margin-bottom: 0.6rem;
}
.process__step-desc {
  font-size: 0.875rem;
  color: var(--white-70);
  line-height: 1.65;
}
.process__step-arrow {
  position: absolute;
  top: calc(2.5rem + 3.4rem);
  right: -12px;
  color: var(--white-40);
  z-index: 2;
}

/* Services CTA */
.services-cta {
  text-align: center;
}
.services-cta__inner {
  max-width: 600px;
  margin: 0 auto;
}
.services-cta__title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
}
.services-cta p {
  font-size: 1rem;
  color: var(--white-70);
}

@media (max-width: 1024px) {
  .svc-grid { grid-template-columns: repeat(2, 1fr); }
  .process__steps { flex-wrap: wrap; }
  .process__step { flex: 0 0 50%; }
  .process__step-arrow { display: none; }
}
@media (max-width: 640px) {
  .svc-grid { grid-template-columns: 1fr; }
  .process__step { flex: 0 0 100%; }
}
</style>
