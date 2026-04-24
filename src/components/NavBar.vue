<template>
  <header class="navbar" :class="{ 'navbar--scrolled': scrolled, 'navbar--open': menuOpen }">
    <div class="container navbar__inner">
      <!-- Logo -->
      <router-link to="/" class="navbar__logo" @click="closeMenu">
        <img src="@/assets/logo.png" alt="Millenium Tech Logo" class="navbar__logo-img" />
        <span class="navbar__logo-text">
          <span class="navbar__logo-name">Millenium<span class="text-cyan">Tech</span></span>
          <span class="navbar__logo-sub">IT Solutions Point</span>
        </span>
      </router-link>

      <!-- Desktop Nav -->
      <nav class="navbar__links">
        <router-link
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="navbar__link"
          :class="{ active: $route.path === link.path }"
        >
          {{ link.label }}
          <span class="navbar__link-dot"></span>
        </router-link>
      </nav>

      <!-- CTA + Hamburger -->
      <div class="navbar__actions">
        <router-link to="/contact" class="btn btn-primary navbar__cta">
          <span>Get in Touch</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </router-link>
        <button class="navbar__burger" @click="toggleMenu" :aria-label="menuOpen ? 'Close menu' : 'Open menu'">
          <span class="burger-line" :class="{ open: menuOpen }"></span>
          <span class="burger-line" :class="{ open: menuOpen }"></span>
          <span class="burger-line" :class="{ open: menuOpen }"></span>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div class="navbar__mobile" :class="{ 'navbar__mobile--open': menuOpen }">
      <nav class="navbar__mobile-links">
        <router-link
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="navbar__mobile-link"
          @click="closeMenu"
        >
          <span class="mobile-link-num">{{ link.num }}</span>
          {{ link.label }}
        </router-link>
      </nav>
      <router-link to="/contact" class="btn btn-primary navbar__mobile-cta" @click="closeMenu">
        <span>Get in Touch</span>
      </router-link>
      <div class="navbar__mobile-contacts">
        <a href="tel:+255755794664">+255 755 794 664</a>
        <a href="tel:+255616533644">+255 616 533 644</a>
      </div>
    </div>
  </header>
  <!-- Backdrop -->
  <div class="navbar__backdrop" :class="{ active: menuOpen }" @click="closeMenu"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)
const menuOpen = ref(false)

const navLinks = [
  { path: '/',          label: 'Home',      num: '01' },
  { path: '/services',  label: 'Services',  num: '02' },
  { path: '/about',     label: 'About',     num: '03' },
  { path: '/portfolio', label: 'Portfolio', num: '04' },
  { path: '/contact',   label: 'Contact',   num: '05' },
]

const toggleMenu = () => { menuOpen.value = !menuOpen.value }
const closeMenu = () => { menuOpen.value = false }

const handleScroll = () => { scrolled.value = window.scrollY > 50 }

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1.5rem 0;
  transition: all 0.4s var(--ease-out);
}
.navbar--scrolled {
  background: rgba(6, 8, 46, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 1rem 0;
  border-bottom: 1px solid var(--white-08);
  box-shadow: 0 4px 40px rgba(0,0,0,0.3);
}
.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

/* Logo */
.navbar__logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
}
.navbar__logo-img {
  width: 44px;
  height: 44px;
  object-fit: contain;
}
.navbar__logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}
.navbar__logo-name {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: var(--white);
}
.navbar__logo-sub {
  font-size: 0.65rem;
  font-weight: 400;
  color: var(--white-40);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-top: 3px;
}

/* Desktop links */
.navbar__links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
.navbar__link {
  position: relative;
  font-family: var(--font-display);
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--white-70);
  padding: 0.4rem 0.85rem;
  border-radius: 6px;
  transition: color 0.3s, background 0.3s;
  letter-spacing: 0.02em;
}
.navbar__link:hover,
.navbar__link.active {
  color: var(--white);
  background: var(--white-05);
}
.navbar__link-dot {
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%) scale(0);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--cyan-400);
  transition: transform 0.3s var(--ease-out);
}
.navbar__link.active .navbar__link-dot,
.navbar__link:hover .navbar__link-dot {
  transform: translateX(-50%) scale(1);
}

/* Actions */
.navbar__actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.navbar__cta {
  font-size: 0.82rem;
  padding: 0.65rem 1.3rem;
}

/* Burger */
.navbar__burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  width: 36px;
  height: 36px;
}
.burger-line {
  display: block;
  height: 2px;
  background: var(--white);
  border-radius: 2px;
  transition: all 0.35s var(--ease-out);
  transform-origin: center;
}
.burger-line:nth-child(1).open { transform: translateY(7px) rotate(45deg); }
.burger-line:nth-child(2).open { opacity: 0; transform: scaleX(0); }
.burger-line:nth-child(3).open { transform: translateY(-7px) rotate(-45deg); }

/* Mobile menu */
.navbar__mobile {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--navy-900);
  border-top: 1px solid var(--white-08);
  border-bottom: 1px solid var(--white-08);
  padding: 0;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s var(--ease-out), padding 0.4s;
}
.navbar__mobile--open {
  max-height: 600px;
  padding: 1.5rem 0 2rem;
}
.navbar__mobile-links {
  display: flex;
  flex-direction: column;
  padding: 0 1.5rem;
  gap: 0.25rem;
}
.navbar__mobile-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--white-70);
  padding: 0.85rem 0;
  border-bottom: 1px solid var(--white-05);
  transition: color 0.3s;
}
.navbar__mobile-link:hover { color: var(--cyan-400); }
.mobile-link-num {
  font-size: 0.68rem;
  font-weight: 400;
  color: var(--cyan-400);
  font-family: var(--font-body);
  letter-spacing: 0.1em;
  min-width: 22px;
}
.navbar__mobile-cta {
  margin: 1.25rem 1.5rem 1rem;
  justify-content: center;
  width: calc(100% - 3rem);
}
.navbar__mobile-contacts {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0 1.5rem;
}
.navbar__mobile-contacts a {
  font-size: 0.85rem;
  color: var(--white-40);
  transition: color 0.3s;
}
.navbar__mobile-contacts a:hover { color: var(--cyan-400); }

/* Backdrop */
.navbar__backdrop {
  position: fixed;
  inset: 0;
  background: rgba(6, 8, 46, 0.6);
  backdrop-filter: blur(4px);
  z-index: 999;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s;
}
.navbar__backdrop.active {
  opacity: 1;
  pointer-events: all;
}

/* Responsive */
@media (max-width: 900px) {
  .navbar__links { display: none; }
  .navbar__cta { display: none; }
  .navbar__burger { display: flex; }
}
</style>
