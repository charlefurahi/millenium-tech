<template>
  <div class="not-found noise">
    <!-- Background orbs -->
    <div class="nf__orb nf__orb--1"></div>
    <div class="nf__orb nf__orb--2"></div>
    <div class="nf__orb nf__orb--3"></div>

    <!-- Animated grid lines -->
    <div class="nf__grid">
      <div class="nf__grid-line" v-for="n in 8" :key="n" :style="{ animationDelay: `${n * 0.15}s` }"></div>
    </div>

    <div class="container nf__inner">
      <!-- Glitching 404 -->
      <div class="nf__code-wrap animate-fade-up">
        <span class="nf__code" data-text="404">404</span>
      </div>

      <!-- Icon -->
      <div class="nf__icon-ring animate-scale-in delay-100">
        <div class="nf__icon-inner animate-float">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
            <path d="M11 8v3M11 14h.01" stroke-linecap="round"/>
          </svg>
        </div>
      </div>

      <!-- Text -->
      <h1 class="nf__title animate-fade-up delay-200">
        Page Not <span class="gradient-text">Found</span>
      </h1>
      <p class="nf__subtitle animate-fade-up delay-300">
        Looks like this page took a wrong turn somewhere in Tanzania.<br />
        Let's get you back on track.
      </p>

      <!-- Actions -->
      <div class="nf__actions animate-fade-up delay-400">
        <router-link to="/" class="btn btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span>Back to Home</span>
        </router-link>
        <router-link to="/contact" class="btn btn-outline">
          Contact Support
        </router-link>
      </div>

      <!-- Quick nav links -->
      <div class="nf__nav animate-fade-up delay-500">
        <span class="nf__nav-label">Or explore:</span>
        <div class="nf__nav-links">
          <router-link
            v-for="link in quickLinks"
            :key="link.path"
            :to="link.path"
            class="nf__nav-link"
          >
            <span class="nf__nav-link-icon">{{ link.icon }}</span>
            {{ link.label }}
          </router-link>
        </div>
      </div>
    </div>

    <!-- Bottom brand stamp -->
    <div class="nf__stamp animate-fade-in delay-600">
      <img src="@/assets/logo.png" alt="Millenium Tech" class="nf__stamp-logo" />
      <span>Millenium<span class="text-cyan">Tech</span></span>
    </div>
  </div>
</template>

<script setup lang="ts">
const quickLinks = [
  { path: '/services',  label: 'Services',  icon: '⚙️' },
  { path: '/portfolio', label: 'Portfolio', icon: '🎨' },
  { path: '/about',     label: 'About Us',  icon: '👋' },
]
</script>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--navy-950);
  position: relative;
  overflow: hidden;
  padding: 6rem 1.5rem 4rem;
  text-align: center;
}

/* Orbs */
.nf__orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.nf__orb--1 {
  width: 700px; height: 700px;
  background: radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 65%);
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
}
.nf__orb--2 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(251,191,36,0.05) 0%, transparent 70%);
  top: -80px; right: -80px;
}
.nf__orb--3 {
  width: 350px; height: 350px;
  background: radial-gradient(circle, rgba(26, 33, 104, 0.5) 0%, transparent 70%);
  bottom: -60px; left: -60px;
}

/* Animated grid */
.nf__grid {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: space-around;
  pointer-events: none;
}
.nf__grid-line {
  width: 1px;
  height: 100%;
  background: linear-gradient(to bottom, transparent 0%, rgba(34,211,238,0.06) 40%, rgba(34,211,238,0.06) 60%, transparent 100%);
  animation: fadeIn 1.2s var(--ease-out) both;
}

/* Inner */
.nf__inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  max-width: 700px;
}

/* 404 glitch code */
.nf__code-wrap {
  position: relative;
  margin-bottom: 2rem;
  line-height: 1;
}
.nf__code {
  font-family: var(--font-display);
  font-size: clamp(7rem, 22vw, 14rem);
  font-weight: 800;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 2px rgba(34, 211, 238, 0.25);
  position: relative;
  display: block;
  user-select: none;
}
/* Glitch layers */
.nf__code::before,
.nf__code::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  font-family: var(--font-display);
  font-size: inherit;
  font-weight: 800;
  letter-spacing: inherit;
}
.nf__code::before {
  color: transparent;
  -webkit-text-stroke: 2px rgba(34, 211, 238, 0.5);
  animation: glitch-1 4s infinite;
  clip-path: polygon(0 30%, 100% 30%, 100% 50%, 0 50%);
}
.nf__code::after {
  color: transparent;
  -webkit-text-stroke: 2px rgba(251, 191, 36, 0.35);
  animation: glitch-2 4s infinite;
  clip-path: polygon(0 60%, 100% 60%, 100% 75%, 0 75%);
}

@keyframes glitch-1 {
  0%, 90%, 100% { transform: translate(0); opacity: 1; }
  91%  { transform: translate(-4px, 1px); opacity: 0.9; }
  92%  { transform: translate(4px, -1px); opacity: 0.8; }
  93%  { transform: translate(-2px, 2px); opacity: 1; }
  94%  { transform: translate(0); opacity: 0.7; }
  95%  { transform: translate(3px, -2px); opacity: 1; }
}
@keyframes glitch-2 {
  0%, 88%, 100% { transform: translate(0); opacity: 1; }
  89%  { transform: translate(5px, 2px); opacity: 0.8; }
  90%  { transform: translate(-3px, -1px); opacity: 0.9; }
  91%  { transform: translate(2px, 1px); opacity: 1; }
  92%  { transform: translate(0); opacity: 0.6; }
  93%  { transform: translate(-4px, 2px); opacity: 1; }
}

/* Icon ring */
.nf__icon-ring {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: rgba(34, 211, 238, 0.08);
  border: 1.5px solid rgba(34, 211, 238, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  color: var(--cyan-400);
  box-shadow: 0 0 40px rgba(34, 211, 238, 0.1);
  animation: pulse-cyan 3s infinite;
}
.nf__icon-inner {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Text */
.nf__title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin-bottom: 1.1rem;
}
.nf__subtitle {
  font-size: clamp(0.9rem, 2vw, 1.05rem);
  color: var(--white-70);
  line-height: 1.8;
  max-width: 460px;
  margin-bottom: 2.5rem;
}

/* Actions */
.nf__actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 3rem;
}

/* Quick nav */
.nf__nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding-top: 2.5rem;
  border-top: 1px solid var(--white-08);
  width: 100%;
}
.nf__nav-label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--white-40);
  font-family: var(--font-display);
}
.nf__nav-links {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
}
.nf__nav-link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background: var(--white-05);
  border: 1px solid var(--white-08);
  color: var(--white-70);
  padding: 0.5rem 1.1rem;
  border-radius: 100px;
  font-family: var(--font-display);
  font-size: 0.82rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s var(--ease-out);
}
.nf__nav-link:hover {
  background: rgba(34, 211, 238, 0.08);
  border-color: rgba(34, 211, 238, 0.3);
  color: var(--cyan-400);
  transform: translateY(-2px);
}
.nf__nav-link-icon { font-size: 0.9rem; }

/* Brand stamp */
.nf__stamp {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--white-40);
  white-space: nowrap;
}
.nf__stamp-logo {
  width: 24px;
  height: 24px;
  object-fit: contain;
  opacity: 0.5;
}
</style>
