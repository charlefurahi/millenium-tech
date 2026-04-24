<template>
  <div class="about-page">
    <!-- Hero -->
    <section class="page-hero noise">
      <div class="page-hero__orb page-hero__orb--1"></div>
      <div class="page-hero__orb page-hero__orb--2"></div>
      <div class="container page-hero__inner">
        <div class="section-label animate-fade-up">Our Story</div>
        <h1 class="page-hero__title animate-fade-up delay-100">
          Built on Passion,<br />
          <span class="gradient-text">Driven by Purpose</span>
        </h1>
        <p class="page-hero__subtitle animate-fade-up delay-200">
          We are a team of young, talented Tanzanians making technology accessible and affordable for everyone.
        </p>
      </div>
    </section>

    <!-- Story Section -->
    <section class="section story">
      <div class="container story__inner">
        <div class="story__img-side">
          <div class="story__img-frame">
            <img src="@/assets/hero-photo.png" alt="Founder" class="story__img" />
            <div class="story__img-overlay glass-card">
              <span class="story__overlay-title">Our Founder</span>
              <span class="story__overlay-sub">Millenium Tech – Est. 2022</span>
            </div>
          </div>
          <div class="story__quote glass-card">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--cyan-400)" opacity="0.6"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>
            <p class="story__quote-text">
              "Technology should not be a luxury. Our mission is to make it a tool for every Tanzanian business, big or small."
            </p>
            <span class="story__quote-author">— Millenium Tech Founder</span>
          </div>
        </div>
        <div class="story__text">
          <div class="section-label">Who We Are</div>
          <h2 class="section-title" style="margin-bottom: 1.5rem;">
            Tanzania's Rising<br />
            <span class="gradient-text">Tech Company</span>
          </h2>
          <p class="story__para">
            Millenium Tech was founded with one clear goal: to bridge the digital gap in Tanzania.
            We saw businesses struggling with outdated websites, poor designs, and slow computer repairs
            — and we knew we could do better.
          </p>
          <p class="story__para">
            Today, we serve clients across Tanzania, delivering everything from eye-catching graphics
            to fully functional websites, from computer repairs to critical online government services.
          </p>
          <p class="story__para">
            We are young, passionate, and constantly learning. We combine global best practices with
            deep local knowledge to give every client the best possible outcome.
          </p>
          <div class="story__stats">
            <div v-for="stat in stats" :key="stat.label" class="story__stat">
              <span class="story__stat-num gradient-text">{{ stat.num }}</span>
              <span class="story__stat-label">{{ stat.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="section values">
      <div class="values__bg dot-pattern"></div>
      <div class="container">
        <div style="text-align: center; margin-bottom: 3.5rem;">
          <div class="section-label">What Guides Us</div>
          <h2 class="section-title">Our Core <span class="gradient-text">Values</span></h2>
        </div>
        <div class="values__grid">
          <div v-for="val in values" :key="val.title" class="value-card glass-card">
            <div class="value-card__emoji">{{ val.emoji }}</div>
            <h3 class="value-card__title">{{ val.title }}</h3>
            <p class="value-card__desc">{{ val.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Bar -->
    <section class="section skills">
      <div class="container skills__inner">
        <div class="skills__text">
          <div class="section-label">Our Expertise</div>
          <h2 class="section-title" style="margin-bottom: 1.5rem;">
            Skills That<br />
            <span class="gradient-text">Set Us Apart</span>
          </h2>
          <p style="color: var(--white-70); line-height: 1.75; margin-bottom: 2rem;">
            We invest continuously in our skills to stay ahead of technology trends and deliver
            the best solutions to our clients.
          </p>
          <router-link to="/contact" class="btn btn-primary">
            <span>Work With Us</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </router-link>
        </div>
        <div class="skills__bars">
          <div v-for="skill in skillBars" :key="skill.name" class="skill-bar">
            <div class="skill-bar__header">
              <span class="skill-bar__name">{{ skill.name }}</span>
              <span class="skill-bar__pct gradient-text">{{ skill.pct }}%</span>
            </div>
            <div class="skill-bar__track">
              <div class="skill-bar__fill" :style="{ width: skill.pct + '%', background: skill.color }"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const stats = [
  { num: '3+',  label: 'Years Active' },
  { num: '50+', label: 'Projects' },
  { num: '30+', label: 'Clients' },
  { num: '6',   label: 'Services' },
]

const values = [
  { emoji: '🎯', title: 'Excellence',    desc: 'We never settle. Every project gets our full attention and best effort.' },
  { emoji: '🤝', title: 'Integrity',     desc: 'We are honest about timelines, pricing, and what we can deliver.' },
  { emoji: '💡', title: 'Innovation',    desc: 'We stay ahead of tech trends so your business always looks modern.' },
  { emoji: '🌍', title: 'Local Pride',   desc: "Built in Tanzania, we understand the local market like no one else." },
  { emoji: '⚡', title: 'Speed',         desc: 'Fast delivery is our standard. We respect your time and deadlines.' },
  { emoji: '💎', title: 'Quality',       desc: 'Premium results without the premium price tag.' },
]

const skillBars = [
  { name: 'Graphic Design',      pct: 95, color: 'linear-gradient(90deg, #22d3ee, #67e8f9)' },
  { name: 'Web Development',     pct: 90, color: 'linear-gradient(90deg, #fbbf24, #fcd34d)' },
  { name: 'Photo Editing',       pct: 88, color: 'linear-gradient(90deg, #22d3ee, #67e8f9)' },
  { name: 'Computer Repair',     pct: 92, color: 'linear-gradient(90deg, #fbbf24, #fcd34d)' },
  { name: 'Customer Service',    pct: 97, color: 'linear-gradient(90deg, #22d3ee, #67e8f9)' },
]
</script>

<style scoped>
.page-hero {
  padding: 140px 0 80px;
  background: var(--navy-950);
  position: relative;
  overflow: hidden;
  text-align: center;
}
.page-hero__orb {
  position: absolute; border-radius: 50%; pointer-events: none;
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

/* Story */
.story__inner {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 5rem;
  align-items: start;
}
.story__img-side { display: flex; flex-direction: column; gap: 1.5rem; }
.story__img-frame {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
}
.story__img {
  width: 100%;
  aspect-ratio: 4/5;
  object-fit: cover;
  object-position: top;
  border-radius: 24px;
  border: 1px solid var(--white-08);
}
.story__img-overlay {
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  right: 1.5rem;
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
}
.story__overlay-title {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--white);
}
.story__overlay-sub {
  font-size: 0.78rem;
  color: var(--cyan-400);
  margin-top: 2px;
}
.story__quote {
  padding: 1.5rem;
}
.story__quote-text {
  display: block;
  font-size: 0.95rem;
  color: var(--white-90);
  font-style: italic;
  line-height: 1.7;
  margin: 0.75rem 0 0.75rem;
}
.story__quote-author {
  font-size: 0.8rem;
  color: var(--cyan-400);
  font-family: var(--font-display);
  font-weight: 600;
}
.story__para {
  font-size: 1rem;
  color: var(--white-70);
  line-height: 1.8;
  margin-bottom: 1.25rem;
}
.story__stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 2.5rem;
  padding-top: 2.5rem;
  border-top: 1px solid var(--white-08);
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
  font-size: 0.75rem;
  color: var(--white-40);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

/* Values */
.values { background: var(--navy-900); overflow: hidden; }
.values__bg { position: absolute; inset: 0; opacity: 0.25; }
.values__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  position: relative;
  z-index: 1;
}
.value-card {
  padding: 2rem;
  transition: all 0.3s var(--ease-out);
}
.value-card:hover {
  transform: translateY(-5px);
  border-color: rgba(34,211,238,0.25);
}
.value-card__emoji { font-size: 2rem; margin-bottom: 1rem; }
.value-card__title {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--white);
  margin-bottom: 0.6rem;
}
.value-card__desc {
  font-size: 0.875rem;
  color: var(--white-70);
  line-height: 1.7;
}

/* Skills */
.skills__inner {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 5rem;
  align-items: center;
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
  margin-bottom: 0.6rem;
}
.skill-bar__name {
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--white);
}
.skill-bar__pct {
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 700;
}
.skill-bar__track {
  height: 6px;
  background: var(--white-08);
  border-radius: 100px;
  overflow: hidden;
}
.skill-bar__fill {
  height: 100%;
  border-radius: 100px;
  transition: width 1.5s var(--ease-out);
}

@media (max-width: 1024px) {
  .story__inner { grid-template-columns: 1fr; gap: 3rem; }
  .story__img-side { max-width: 500px; }
  .skills__inner { grid-template-columns: 1fr; gap: 3rem; }
  .values__grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .values__grid { grid-template-columns: 1fr; }
  .story__stats { grid-template-columns: repeat(2, 1fr); }
}
</style>
