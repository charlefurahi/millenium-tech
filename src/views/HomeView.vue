<template>
  <div class="home">
    <!-- ===== HERO ===== -->
    <section class="hero noise dot-pattern">
      <div class="hero__bg-orb hero__bg-orb--1"></div>
      <div class="hero__bg-orb hero__bg-orb--2"></div>

      <div class="container hero__inner">
        <div class="hero__content">
          <div class="hero__badge animate-fade-up">
            <span class="hero__badge-dot"></span>
            Available for new projects
          </div>
          <h1 class="hero__title animate-fade-up delay-100">
            Your Technology<br />
            Partner in<br />
            <span class="hero__title-accent">Tanzania</span>
          </h1>
          <p class="hero__subtitle animate-fade-up delay-200">
            From stunning websites to computer repair — Millenium Tech delivers
            smart IT solutions that move your business forward.
          </p>
          <div class="hero__actions animate-fade-up delay-300">
            <router-link to="/services" class="btn btn-primary">
              <span>Explore Services</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </router-link>
            <router-link to="/portfolio" class="btn btn-outline">View Our Work</router-link>
          </div>
          <div class="hero__contacts animate-fade-up delay-400">
            <a href="tel:+255755794664" class="hero__contact-link">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.1 2.18 2 2 0 012.1 0h3a2 2 0 012 1.72c.22.824.497 1.63.83 2.41a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.78.333 1.586.61 2.41.83A2 2 0 0122 14.92z"/></svg>
              +255 755 794 664
            </a>
            <span class="hero__contact-sep">·</span>
            <a href="tel:+255616533644" class="hero__contact-link">+255 616 533 644</a>
          </div>
        </div>

        <div class="hero__visual animate-scale-in delay-200">
          <div class="hero__img-wrapper animate-float">
            <div class="hero__img-ring"></div>
            <img src="@/assets/hero-photo.png" alt="Millenium Tech" class="hero__img" />
            <div class="hero__img-badge hero__img-badge--top">
              <span class="badge-icon">⚡</span>
              <div>
                <span class="badge-num">50+</span>
                <span class="badge-label">Projects Done</span>
              </div>
            </div>
            <div class="hero__img-badge hero__img-badge--bottom">
              <span class="badge-icon">⭐</span>
              <div>
                <span class="badge-num">5.0</span>
                <span class="badge-label">Client Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="hero__scroll">
        <div class="hero__scroll-line"></div>
        <span>Scroll</span>
      </div>
    </section>

    <!-- ===== STATS ===== -->
    <section class="stats">
      <div class="container">
        <div class="stats__grid">
          <div v-for="stat in stats" :key="stat.label" class="stats__item">
            <span class="stats__num">{{ stat.num }}</span>
            <span class="stats__label">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== SERVICES PREVIEW ===== -->
    <section class="section services-preview">
      <div class="container">
        <div class="services-preview__header">
          <div>
            <div class="section-label">What We Do</div>
            <h2 class="section-title">
              Solutions Built for<br />Real Results
            </h2>
          </div>
          <p class="services-preview__desc">
            We combine creative design with technical excellence to deliver IT solutions
            that actually work — on time, on budget, every time.
          </p>
        </div>

        <div class="services-preview__grid">
          <div
            v-for="(service, i) in services"
            :key="service.title"
            class="service-card glass-card"
            :style="{ animationDelay: `${i * 0.1}s` }"
          >
            <div class="service-card__icon" :class="i % 2 === 0 ? 'icon--cyan' : 'icon--gold'">
              <span v-html="service.icon"></span>
            </div>
            <h3 class="service-card__title">{{ service.title }}</h3>
            <p class="service-card__desc">{{ service.desc }}</p>
            <div class="service-card__footer">
              <router-link to="/services" class="service-card__link">
                Learn more
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </router-link>
            </div>
          </div>
        </div>

        <div class="services-preview__cta">
          <router-link to="/services" class="btn btn-outline">
            View All Services
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </router-link>
        </div>
      </div>
    </section>

    <!-- ===== WHY CHOOSE US ===== -->
    <section class="section why-us">
      <div class="why-us__bg dot-pattern"></div>
      <div class="container why-us__inner">
        <div class="why-us__content">
          <div class="section-label">Why Millenium Tech</div>
          <h2 class="section-title">
            We Don't Just Fix It.<br />
            We Elevate It.
          </h2>
          <p class="why-us__body">
            Based in Tanzania, we understand the unique challenges of local businesses.
            We bring global quality standards to every project with honest pricing,
            fast delivery, and lasting support.
          </p>
          <ul class="why-us__list">
            <li v-for="point in whyPoints" :key="point" class="why-us__item">
              <span class="why-us__check">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </span>
              {{ point }}
            </li>
          </ul>
          <router-link to="/about" class="btn btn-primary">
            <span>Our Story</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </router-link>
        </div>
        <div class="why-us__visual">
          <div class="why-us__card glass-card" v-for="feat in features" :key="feat.title">
            <div class="why-us__feat-icon">{{ feat.emoji }}</div>
            <div>
              <h4 class="why-us__feat-title">{{ feat.title }}</h4>
              <p class="why-us__feat-desc">{{ feat.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== CTA BAND ===== -->
    <section class="cta-band">
      <div class="cta-band__gradient"></div>
      <div class="container cta-band__inner">
        <div class="cta-band__text">
          <h2 class="cta-band__title">
            Ready to bring your vision to life?
          </h2>
          <p>Let's talk about your project. Contact us today — no obligation.</p>
        </div>
        <div class="cta-band__actions">
          <router-link to="/contact" class="btn btn-primary">
            <span>Start a Project</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </router-link>
          <a href="https://wa.me/255755794664" target="_blank" class="btn btn-outline cta-band__whatsapp">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const stats = [
  { num: '50+', label: 'Projects Completed' },
  { num: '30+', label: 'Happy Clients' },
  { num: '3+',  label: 'Years Experience' },
  { num: '6',   label: 'Core Services' },
]

const services = [
  {
    title: 'Graphics Design',
    desc: 'Eye-catching posters, banners, logos and brand identities that make your business stand out.',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',
  },
  {
    title: 'Website Development',
    desc: 'Fast, modern websites and web applications built to convert visitors into customers.',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>',
  },
  {
    title: 'Computer Repair',
    desc: 'Diagnosing and fixing hardware and software issues quickly to minimize your downtime.',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
  },
  {
    title: 'Photo Editing',
    desc: 'Professional photo retouching, background removal, and visual enhancements.',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
  },
  {
    title: 'Online Services',
    desc: 'NIDA registration, birth certificates, job applications and official online processes.',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>',
  },
  {
    title: 'Laptop Sales',
    desc: 'Quality laptops at competitive prices — new and refurbished units with warranty.',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M1 20h22"/></svg>',
  },
]

const whyPoints = [
  'Fast turnaround without compromising quality',
  'Transparent pricing — no hidden fees',
  'Local expertise with global standards',
  'Ongoing support after project delivery',
  'Fluent in Swahili & English',
]

const features = [
  { emoji: '🚀', title: 'Fast Delivery',      desc: 'We respect your deadlines every time.' },
  { emoji: '💎', title: 'Premium Quality',    desc: 'Every pixel and line of code is crafted carefully.' },
  { emoji: '🤝', title: 'Trusted Support',    desc: 'We are always a call away after launch.' },
  { emoji: '💡', title: 'Creative Solutions', desc: 'Fresh ideas tailored to your exact needs.' },
]
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: var(--navy-950);
  padding-top: 100px;
}
.hero__bg-orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.hero__bg-orb--1 {
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%);
  top: -100px; left: -200px;
}
.hero__bg-orb--2 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(251,191,36,0.04) 0%, transparent 70%);
  bottom: -100px; right: -150px;
}
.hero__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 4rem;
  padding-top: 4rem;
  padding-bottom: 5rem;
  position: relative;
  z-index: 1;
}
.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(34,211,238,0.08);
  border: 1px solid rgba(34,211,238,0.2);
  padding: 0.4rem 1rem;
  border-radius: 100px;
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--cyan-400);
  letter-spacing: 0.02em;
  margin-bottom: 1.5rem;
}
.hero__badge-dot {
  width: 6px; height: 6px;
  background: var(--cyan-400);
  border-radius: 50%;
  animation: pulse-cyan 2s infinite;
}
.hero__title {
  font-family: 'Poppins', sans-serif;
  font-size: clamp(2.6rem, 5.5vw, 4.2rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--white);
  margin-bottom: 1.5rem;
}
.hero__title-accent {
  color: var(--cyan-400);
  font-weight: 700;
}
.hero__subtitle {
  font-size: clamp(0.95rem, 1.4vw, 1.08rem);
  color: var(--white-70);
  line-height: 1.8;
  max-width: 460px;
  margin-bottom: 2.5rem;
  font-weight: 400;
}
.hero__actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}
.hero__contacts {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.hero__contact-link {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.83rem;
  font-weight: 400;
  color: var(--white-70);
  text-decoration: none;
  transition: color 0.3s;
}
.hero__contact-link:hover { color: var(--cyan-400); }
.hero__contact-sep { color: var(--white-40); }
.hero__visual {
  display: flex;
  justify-content: center;
  align-items: center;
}
.hero__img-wrapper {
  position: relative;
  width: clamp(260px, 38vw, 400px);
  aspect-ratio: 3/4;
}
.hero__img-ring {
  position: absolute;
  inset: -24px;
  border: 1px dashed rgba(34,211,238,0.15);
  border-radius: 50%;
  animation: spin-slow 24s linear infinite;
}
.hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  border: 1.5px solid rgba(34,211,238,0.2);
  box-shadow: 0 0 60px rgba(34,211,238,0.1), 0 30px 70px rgba(0,0,0,0.45);
}
.hero__img-badge {
  position: absolute;
  background: var(--navy-800);
  border: 1px solid var(--white-08);
  border-radius: 12px;
  padding: 0.7rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  backdrop-filter: blur(12px);
  box-shadow: 0 6px 24px rgba(0,0,0,0.35);
}
.hero__img-badge--top    { top: 10%; right: -28px; }
.hero__img-badge--bottom { bottom: 14%; left: -28px; }
.badge-icon { font-size: 1.1rem; }
.badge-num {
  display: block;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: var(--cyan-400);
  line-height: 1;
}
.badge-label {
  display: block;
  font-size: 0.62rem;
  font-weight: 400;
  color: var(--white-40);
  text-transform: uppercase;
  letter-spacing: 0.07em;
  margin-top: 2px;
}
.hero__scroll {
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--white-40);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 400;
}
.hero__scroll-line {
  width: 1px;
  height: 36px;
  background: linear-gradient(to bottom, var(--cyan-400), transparent);
  animation: float 2s ease-in-out infinite;
}
.stats {
  background: var(--navy-900);
  border-top: 1px solid var(--white-08);
  border-bottom: 1px solid var(--white-08);
  padding: 2.5rem 0;
}
.stats__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
.stats__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 1rem;
  border-right: 1px solid var(--white-08);
  text-align: center;
}
.stats__item:last-child { border-right: none; }
.stats__num {
  font-family: 'Poppins', sans-serif;
  font-size: clamp(1.9rem, 3.5vw, 2.6rem);
  font-weight: 600;
  line-height: 1;
  color: var(--cyan-400);
}
.stats__label {
  font-size: 0.78rem;
  color: var(--white-70);
  font-weight: 400;
}
.services-preview__header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: end;
  gap: 3rem;
  margin-bottom: 3rem;
}
.services-preview__desc {
  font-size: 1rem;
  color: var(--white-70);
  line-height: 1.8;
  font-weight: 400;
  padding-bottom: 0.4rem;
}
.services-preview__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}
.service-card {
  padding: 1.75rem;
  transition: all 0.35s var(--ease-out);
  cursor: pointer;
}
.service-card:hover {
  transform: translateY(-5px);
  border-color: rgba(34,211,238,0.2);
  box-shadow: 0 16px 50px rgba(0,0,0,0.25);
}
.service-card__icon {
  width: 48px; height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.1rem;
  border: 1px solid transparent;
}
.icon--cyan {
  background: rgba(34,211,238,0.08);
  border-color: rgba(34,211,238,0.12);
  color: var(--cyan-400);
}
.icon--gold {
  background: rgba(251,191,36,0.08);
  border-color: rgba(251,191,36,0.12);
  color: var(--gold-400);
}
.service-card__title {
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: var(--white);
  margin-bottom: 0.6rem;
  letter-spacing: -0.01em;
}
.service-card__desc {
  font-size: 0.845rem;
  color: var(--white-70);
  line-height: 1.75;
  margin-bottom: 1.25rem;
  font-weight: 400;
}
.service-card__footer { margin-top: auto; }
.service-card__link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.78rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  color: var(--cyan-400);
  text-decoration: none;
  transition: gap 0.3s;
}
.service-card:hover .service-card__link { gap: 0.6rem; }
.services-preview__cta {
  text-align: center;
  margin-top: 2.5rem;
}
.why-us {
  background: var(--navy-900);
  overflow: hidden;
}
.why-us__bg {
  position: absolute;
  inset: 0;
  opacity: 0.2;
}
.why-us__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: start;
  gap: 5rem;
  position: relative;
  z-index: 1;
}
.why-us__body {
  font-size: 0.95rem;
  color: var(--white-70);
  line-height: 1.85;
  margin-bottom: 2rem;
  font-weight: 400;
}
.why-us__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  margin-bottom: 2.5rem;
}
.why-us__item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 0.9rem;
  font-weight: 400;
  color: var(--white-90);
}
.why-us__check {
  width: 24px; height: 24px;
  border-radius: 50%;
  background: rgba(34,211,238,0.1);
  border: 1px solid rgba(34,211,238,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--cyan-400);
  flex-shrink: 0;
}
.why-us__visual {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.why-us__card {
  padding: 1.4rem;
  display: flex;
  align-items: flex-start;
  gap: 0.9rem;
  transition: all 0.3s;
}
.why-us__card:hover {
  border-color: rgba(34,211,238,0.18);
  transform: translateY(-3px);
}
.why-us__feat-icon { font-size: 1.6rem; line-height: 1; }
.why-us__feat-title {
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--white);
  margin-bottom: 0.3rem;
}
.why-us__feat-desc {
  font-size: 0.8rem;
  color: var(--white-70);
  line-height: 1.6;
  font-weight: 400;
}
.cta-band {
  position: relative;
  overflow: hidden;
  padding: 5rem 0;
  background: linear-gradient(135deg, var(--navy-800) 0%, var(--navy-700) 50%, var(--navy-800) 100%);
  background-size: 200% 200%;
  animation: gradient-shift 6s ease infinite;
}
.cta-band__gradient {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 20% 50%, rgba(34,211,238,0.09) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 50%, rgba(251,191,36,0.06) 0%, transparent 50%);
  pointer-events: none;
}
.cta-band__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  position: relative;
  z-index: 1;
  flex-wrap: wrap;
}
.cta-band__title {
  font-family: 'Poppins', sans-serif;
  font-size: clamp(1.7rem, 3.5vw, 2.4rem);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.01em;
  margin-bottom: 0.75rem;
  color: var(--white);
}
.cta-band__text p {
  font-size: 0.95rem;
  color: var(--white-70);
  font-weight: 400;
}
.cta-band__actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
}
.cta-band__whatsapp { color: #25d366; border-color: rgba(37,211,102,0.35); }
.cta-band__whatsapp:hover {
  color: #25d366;
  border-color: #25d366;
  box-shadow: 0 6px 24px rgba(37,211,102,0.12);
}
@media (max-width: 1024px) {
  .hero__inner { 
    grid-template-columns: 1fr; 
    text-align: center; 
  }

  .hero__subtitle { max-width: 100%; }

  .hero__actions, 
  .hero__contacts { 
    justify-content: center; 
  }

  /* ✅ SHOW IMAGE ON MOBILE */
  .hero__visual { 
    display: flex; 
    margin-top: 2rem;
  }

  /* ✅ KEEP IMAGE NICE SIZE */
  .hero__img-wrapper {
    width: 280px;
    margin: 0 auto;
  }

  /* ✅ MOVE BADGES AWAY FROM FACE */
  .hero__img-badge--top {
    top: 8%;
    right: -50px;   /* moved closer, less overlap */
    transform: scale(0.85);
  }

  .hero__img-badge--bottom {
    bottom: 8%;
    left: -10px;    /* moved closer, less overlap */
    transform: scale(0.85);
  }

  .services-preview__header { grid-template-columns: 1fr; }
  .why-us__inner { grid-template-columns: 1fr; gap: 3rem; }
}

@media (max-width: 768px) {
  .services-preview__grid { grid-template-columns: 1fr 1fr; }
  .stats__grid { grid-template-columns: repeat(2, 1fr); }
  .why-us__visual { grid-template-columns: 1fr 1fr; }
  .cta-band__inner { flex-direction: column; text-align: center; }
  .cta-band__actions { justify-content: center; }
}
@media (max-width: 480px) {
  .services-preview__grid { grid-template-columns: 1fr; }
  .why-us__visual { grid-template-columns: 1fr; }
  .stats__grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
