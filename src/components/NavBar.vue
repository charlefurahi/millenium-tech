<template>
  <header
    class="navbar"
    :class="{
      'navbar--scrolled': scrolled,
      'navbar--open': menuOpen
    }"
  >
    <!-- Accessibility -->
    <a href="#main-content" class="navbar__skip-link">
      Skip to content
    </a>

    <div class="container navbar__inner">
      <!-- Logo -->
      <router-link
        to="/"
        class="navbar__logo"
        aria-label="Millenium Tech - Home"
        @click="closeMenu"
      >
        <span class="navbar__logo-mark">
          <img
            src="@/assets/logo.png"
            alt="Millenium Tech"
            class="navbar__logo-img"
          />
        </span>

        <span class="navbar__logo-text">
          <span class="navbar__logo-name">
            Millenium<span class="text-cyan">Tech</span>
          </span>

          <span class="navbar__logo-sub">
            IT Solutions Point
          </span>
        </span>
      </router-link>

      <!-- Desktop Navigation -->
      <nav
        class="navbar__links"
        aria-label="Primary navigation"
      >
        <router-link
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="navbar__link"
          :class="{ active: isActive(link.path) }"
          :aria-current="isActive(link.path) ? 'page' : undefined"
        >
          <span>{{ link.label }}</span>
          <span class="navbar__link-dot" aria-hidden="true"></span>
        </router-link>
      </nav>

      <!-- Actions -->
      <div class="navbar__actions">
        <router-link
          to="/contact"
          class="navbar__cta"
          @click="closeMenu"
        >
          <span>Let's talk</span>

          <svg
            class="navbar__cta-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </router-link>

        <!-- Mobile menu button -->
        <button
          type="button"
          class="navbar__burger"
          :class="{ 'navbar__burger--open': menuOpen }"
          :aria-expanded="menuOpen"
          aria-controls="mobile-navigation"
          :aria-label="menuOpen ? 'Close navigation menu' : 'Open navigation menu'"
          @click="toggleMenu"
        >
          <span class="burger-line"></span>
          <span class="burger-line"></span>
          <span class="burger-line"></span>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <Transition name="mobile-menu">
      <div
        v-if="menuOpen"
        id="mobile-navigation"
        class="navbar__mobile"
      >
        <div class="navbar__mobile-inner">
          <div class="navbar__mobile-heading">
            <span>Navigation</span>
            <span class="navbar__mobile-line"></span>
          </div>

          <nav
            class="navbar__mobile-links"
            aria-label="Mobile navigation"
          >
            <router-link
              v-for="link in navLinks"
              :key="link.path"
              :to="link.path"
              class="navbar__mobile-link"
              :class="{ active: isActive(link.path) }"
              :aria-current="isActive(link.path) ? 'page' : undefined"
              @click="closeMenu"
            >
              <span class="mobile-link-num">
                {{ link.num }}
              </span>

              <span class="mobile-link-label">
                {{ link.label }}
              </span>

              <svg
                class="mobile-link-arrow"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </router-link>
          </nav>

          <!-- Mobile CTA -->
          <router-link
            to="/contact"
            class="navbar__mobile-cta"
            @click="closeMenu"
          >
            <span>Start a conversation</span>

            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </router-link>

          <!-- Contact information -->
          <div class="navbar__mobile-footer">
            <span class="navbar__mobile-footer-label">
              Talk to us
            </span>

            <div class="navbar__mobile-contacts">
              <a href="tel:+255755794664">
                +255 755 794 664
              </a>

              <a href="tel:+255616533644">
                +255 616 533 644
              </a>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </header>

  <!-- Mobile backdrop -->
  <Transition name="backdrop">
    <div
      v-if="menuOpen"
      class="navbar__backdrop"
      aria-hidden="true"
      @click="closeMenu"
    ></div>
  </Transition>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
  onUnmounted,
  watch
} from 'vue'

import { useRoute } from 'vue-router'

const route = useRoute()

const scrolled = ref(false)
const menuOpen = ref(false)

const navLinks = [
  {
    path: '/',
    label: 'Home',
    num: '01'
  },
  {
    path: '/services',
    label: 'Services',
    num: '02'
  },
  {
    path: '/about',
    label: 'About',
    num: '03'
  },
  {
    path: '/portfolio',
    label: 'Portfolio',
    num: '04'
  },
  {
    path: '/contact',
    label: 'Contact',
    num: '05'
  }
]

/* --------------------------------------------------
   Navigation state
-------------------------------------------------- */

const isActive = (path: string) => {
  if (path === '/') {
    return route.path === '/'
  }

  return route.path === path || route.path.startsWith(`${path}/`)
}

/* --------------------------------------------------
   Mobile menu
-------------------------------------------------- */

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
}

/* --------------------------------------------------
   Scroll state
-------------------------------------------------- */

const handleScroll = () => {
  scrolled.value = window.scrollY > 24
}

/* --------------------------------------------------
   Keyboard controls
-------------------------------------------------- */

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && menuOpen.value) {
    closeMenu()
  }
}

/* --------------------------------------------------
   Responsive behaviour
-------------------------------------------------- */

const handleResize = () => {
  if (window.innerWidth > 900 && menuOpen.value) {
    closeMenu()
  }
}

/* --------------------------------------------------
   Prevent background scrolling while mobile menu
   is open.
-------------------------------------------------- */

watch(menuOpen, (isOpen) => {
  if (typeof document === 'undefined') return

  document.body.style.overflow = isOpen ? 'hidden' : ''
})

/* --------------------------------------------------
   Lifecycle
-------------------------------------------------- */

onMounted(() => {
  handleScroll()

  window.addEventListener('scroll', handleScroll, {
    passive: true
  })

  window.addEventListener('resize', handleResize, {
    passive: true
  })

  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('keydown', handleKeydown)

  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
/* ==================================================
   NAVBAR
================================================== */

.navbar {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 1000;

  padding: 1.2rem 0;

  transition:
    padding 0.35s var(--ease-out),
    background-color 0.35s ease,
    border-color 0.35s ease,
    box-shadow 0.35s ease;
}

/* Subtle glass state after scrolling */
.navbar--scrolled {
  padding: 0.75rem 0;

  background: rgba(6, 8, 46, 0.84);

  border-bottom: 1px solid var(--white-08);

  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);

  box-shadow:
    0 10px 35px rgba(0, 0, 0, 0.18);
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 1.5rem;
}

/* ==================================================
   SKIP LINK
================================================== */

.navbar__skip-link {
  position: absolute;
  left: 1rem;
  top: -100px;

  z-index: 2000;

  padding: 0.7rem 1rem;

  border-radius: 8px;

  background: var(--cyan-400);
  color: var(--navy-950);

  font-size: 0.85rem;
  font-weight: 700;

  transition: top 0.2s ease;
}

.navbar__skip-link:focus {
  top: 1rem;
}

/* ==================================================
   LOGO
================================================== */

.navbar__logo {
  display: inline-flex;
  align-items: center;

  gap: 0.65rem;

  color: var(--white);
  text-decoration: none;

  flex-shrink: 0;
}

.navbar__logo-mark {
  width: 48px;
  height: 48px;

  display: grid;
  place-items: center;

  transition:
    transform 0.35s var(--ease-out),
    opacity 0.3s ease;
}

.navbar__logo:hover .navbar__logo-mark {
  transform: translateY(-1px);
}

.navbar__logo-img {
  width: 100%;
  height: 100%;

  object-fit: contain;
}

.navbar__logo-text {
  display: flex;
  flex-direction: column;

  line-height: 1;
}

.navbar__logo-name {
  font-family: var(--font-display);

  font-size: 1.08rem;
  font-weight: 800;

  letter-spacing: -0.025em;

  color: var(--white);
}

.navbar__logo-sub {
  margin-top: 0.32rem;

  font-size: 0.55rem;
  font-weight: 500;

  color: var(--white-40);

  letter-spacing: 0.095em;
  text-transform: uppercase;
}

/* ==================================================
   DESKTOP NAVIGATION
================================================== */

.navbar__links {
  display: flex;
  align-items: center;

  gap: 0.15rem;

  margin-left: auto;
  margin-right: 1.5rem;
}

.navbar__link {
  position: relative;

  display: inline-flex;
  align-items: center;

  min-height: 40px;

  padding: 0 0.85rem;

  border-radius: 7px;

  color: var(--white-60);

  font-family: var(--font-display);
  font-size: 0.82rem;
  font-weight: 600;

  letter-spacing: 0.015em;

  text-decoration: none;

  transition:
    color 0.25s ease,
    background-color 0.25s ease;
}

.navbar__link:hover {
  color: var(--white);
  background: var(--white-05);
}

.navbar__link.active {
  color: var(--white);
}

/* Small active indicator */
.navbar__link-dot {
  position: absolute;

  left: 50%;
  bottom: 3px;

  width: 4px;
  height: 4px;

  border-radius: 50%;

  background: var(--cyan-400);

  transform:
    translateX(-50%)
    scale(0);

  opacity: 0;

  transition:
    transform 0.25s var(--ease-out),
    opacity 0.25s ease;
}

.navbar__link.active .navbar__link-dot {
  transform:
    translateX(-50%)
    scale(1);

  opacity: 1;
}

/* ==================================================
   DESKTOP CTA
================================================== */

.navbar__actions {
  display: flex;
  align-items: center;

  gap: 0.8rem;
}

.navbar__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  gap: 0.55rem;

  min-height: 42px;

  padding: 0.65rem 1.05rem;

  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 8px;

  background: rgba(255, 255, 255, 0.06);

  color: var(--white);

  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 700;

  text-decoration: none;

  transition:
    background-color 0.25s ease,
    border-color 0.25s ease,
    transform 0.25s var(--ease-out);
}

.navbar__cta:hover {
  background: var(--cyan-400);
  border-color: var(--cyan-400);

  color: var(--navy-950);

  transform: translateY(-1px);
}

.navbar__cta-icon {
  transition: transform 0.25s var(--ease-out);
}

.navbar__cta:hover .navbar__cta-icon {
  transform: translateX(3px);
}

/* ==================================================
   MOBILE BURGER
================================================== */

.navbar__burger {
  display: none;

  width: 42px;
  height: 42px;

  padding: 0;

  align-items: center;
  justify-content: center;
  flex-direction: column;

  gap: 5px;

  border: 1px solid var(--white-08);
  border-radius: 8px;

  background: rgba(255, 255, 255, 0.04);

  cursor: pointer;

  transition:
    background-color 0.25s ease,
    border-color 0.25s ease;
}

.navbar__burger:hover,
.navbar__burger--open {
  background: var(--white-05);
  border-color: var(--white-15);
}

.burger-line {
  display: block;

  width: 17px;
  height: 1.5px;

  border-radius: 2px;

  background: var(--white);

  transform-origin: center;

  transition:
    transform 0.3s var(--ease-out),
    opacity 0.2s ease;
}

.navbar__burger--open .burger-line:nth-child(1) {
  transform: translateY(6.5px) rotate(45deg);
}

.navbar__burger--open .burger-line:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.navbar__burger--open .burger-line:nth-child(3) {
  transform: translateY(-6.5px) rotate(-45deg);
}

/* ==================================================
   MOBILE MENU
================================================== */

.navbar__mobile {
  position: absolute;

  top: 100%;
  left: 0;
  right: 0;

  max-height: calc(100vh - 70px);

  overflow-y: auto;

  background:
    linear-gradient(
      180deg,
      rgba(8, 11, 55, 0.98),
      rgba(6, 8, 46, 0.98)
    );

  border-top: 1px solid var(--white-08);
  border-bottom: 1px solid var(--white-08);

  box-shadow:
    0 25px 60px rgba(0, 0, 0, 0.35);

  overscroll-behavior: contain;
}

.navbar__mobile-inner {
  padding: 1.25rem 1.25rem 1.5rem;
}

/* Mobile heading */

.navbar__mobile-heading {
  display: flex;
  align-items: center;

  gap: 0.75rem;

  margin-bottom: 0.5rem;

  color: var(--white-40);

  font-size: 0.65rem;
  font-weight: 600;

  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.navbar__mobile-line {
  flex: 1;
  height: 1px;

  background: var(--white-08);
}

/* Links */

.navbar__mobile-links {
  display: flex;
  flex-direction: column;
}

.navbar__mobile-link {
  display: grid;

  grid-template-columns: 32px 1fr auto;

  align-items: center;

  gap: 0.5rem;

  min-height: 62px;

  border-bottom: 1px solid var(--white-05);

  color: var(--white-65);

  text-decoration: none;

  transition:
    color 0.25s ease,
    padding-left 0.25s var(--ease-out);
}

.navbar__mobile-link:hover,
.navbar__mobile-link.active {
  color: var(--white);
}

.navbar__mobile-link:hover {
  padding-left: 0.35rem;
}

.mobile-link-num {
  color: var(--cyan-400);

  font-family: var(--font-body);

  font-size: 0.65rem;
  font-weight: 600;

  letter-spacing: 0.08em;
}

.mobile-link-label {
  font-family: var(--font-display);

  font-size: 1.05rem;
  font-weight: 700;
}

.mobile-link-arrow {
  opacity: 0.25;

  transition:
    opacity 0.25s ease,
    transform 0.25s var(--ease-out);
}

.navbar__mobile-link:hover .mobile-link-arrow,
.navbar__mobile-link.active .mobile-link-arrow {
  opacity: 1;
  transform: translateX(3px);
}

/* Mobile CTA */

.navbar__mobile-cta {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 1.25rem;

  min-height: 52px;

  padding: 0 1rem;

  border-radius: 8px;

  background: var(--cyan-400);

  color: var(--navy-950);

  font-size: 0.85rem;
  font-weight: 750;

  text-decoration: none;

  transition:
    transform 0.25s var(--ease-out),
    filter 0.25s ease;
}

.navbar__mobile-cta:hover {
  transform: translateY(-2px);
  filter: brightness(1.05);
}

/* Mobile contact footer */

.navbar__mobile-footer {
  display: flex;
  flex-direction: column;

  gap: 0.55rem;

  margin-top: 1.5rem;
  padding-top: 1.15rem;

  border-top: 1px solid var(--white-08);
}

.navbar__mobile-footer-label {
  color: var(--white-30);

  font-size: 0.62rem;
  font-weight: 600;

  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.navbar__mobile-contacts {
  display: flex;
  flex-wrap: wrap;

  gap: 0.4rem 1.25rem;
}

.navbar__mobile-contacts a {
  color: var(--white-55);

  font-size: 0.78rem;

  text-decoration: none;

  transition: color 0.25s ease;
}

.navbar__mobile-contacts a:hover {
  color: var(--cyan-400);
}

/* ==================================================
   BACKDROP
================================================== */

.navbar__backdrop {
  position: fixed;
  inset: 0;

  z-index: -1;

  background: rgba(2, 4, 20, 0.65);

  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
}

/* ==================================================
   TRANSITIONS
================================================== */

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.3s var(--ease-out);
  transform-origin: top;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity 0.25s ease;
}

.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}

/* ==================================================
   RESPONSIVE
================================================== */

@media (max-width: 900px) {
  .navbar {
    padding: 0.8rem 0;
  }

  .navbar--scrolled {
    padding: 0.65rem 0;
  }

  .navbar__links {
    display: none;
  }

  .navbar__cta {
    display: none;
  }

  .navbar__burger {
    display: flex;
  }

  .navbar__logo-mark {
    width: 44px;
    height: 44px;
  }

  .navbar__logo-name {
    font-size: 1rem;
  }

  .navbar__logo-sub {
    font-size: 0.5rem;
  }
}

@media (max-width: 480px) {
  .navbar__logo-text {
    display: none;
  }

  .navbar__logo-mark {
    width: 42px;
    height: 42px;
  }

  .navbar__inner {
    gap: 0.75rem;
  }

  .navbar__mobile-inner {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* ==================================================
   REDUCED MOTION
================================================== */

@media (prefers-reduced-motion: reduce) {
  .navbar *,
  .navbar__backdrop {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
</style>
