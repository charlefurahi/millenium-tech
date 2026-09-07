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
          <span
            class="navbar__link-dot"
            aria-hidden="true"
          ></span>
        </router-link>
      </nav>

      <!-- Mobile inline navigation: first 3 links only.
           Hidden on desktop by default; only shown at the
           same breakpoint where `.navbar__links` (the full
           desktop nav) hides itself. -->
      <nav
        class="navbar__links-mobile"
        aria-label="Primary navigation (mobile)"
      >
        <router-link
          v-for="link in mobileTopLinks"
          :key="link.path"
          :to="link.path"
          class="navbar__link-mobile"
          :class="{ active: isActive(link.path) }"
          :aria-current="isActive(link.path) ? 'page' : undefined"
        >
          {{ link.label }}
        </router-link>
      </nav>

      <!-- Actions -->
      <div class="navbar__actions">

        <!-- Theme Toggle -->
        <button
          type="button"
          class="navbar__theme-toggle"
          :aria-label="
            theme === 'dark'
              ? 'Switch to light mode'
              : 'Switch to dark mode'
          "
          :title="
            theme === 'dark'
              ? 'Switch to light mode'
              : 'Switch to dark mode'
          "
          @click="toggleTheme"
        >
          <!-- Sun -->
          <svg
            v-if="theme === 'dark'"
            class="navbar__theme-icon"
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.42 1.42" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>

          <!-- Moon -->
          <svg
            v-else
            class="navbar__theme-icon"
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path
              d="M21 12.79A9 9 0 1 1 11.21 3
              7 7 0 0 0 21 12.79Z"
            />
          </svg>

          <span class="navbar__theme-label">
            {{ theme === 'dark' ? 'Light' : 'Dark' }}
          </span>
        </button>

        <!-- Desktop CTA -->
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
          :aria-label="
            menuOpen
              ? 'Close navigation menu'
              : 'Open navigation menu'
          "
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

          <!-- Mobile heading -->
          <div class="navbar__mobile-heading">
            <span>Navigation</span>
            <span class="navbar__mobile-line"></span>
          </div>

          <!-- Mobile links -->
          <nav
            class="navbar__mobile-links"
            aria-label="Mobile navigation"
          >
            <router-link
              v-for="link in mobileSidebarLinks"
              :key="link.path"
              :to="link.path"
              class="navbar__mobile-link"
              :class="{ active: isActive(link.path) }"
              :aria-current="
                isActive(link.path)
                  ? 'page'
                  : undefined
              "
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

          <!-- Mobile Theme Toggle -->
          <button
            type="button"
            class="navbar__mobile-theme"
            @click="toggleTheme"
          >
            <span class="navbar__mobile-theme-left">

              <span class="navbar__mobile-theme-icon">

                <!-- Sun -->
                <svg
                  v-if="theme === 'dark'"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.42 1.42" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>

                <!-- Moon -->
                <svg
                  v-else
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path
                    d="M21 12.79A9 9 0 1 1 11.21 3
                    7 7 0 0 0 21 12.79Z"
                  />
                </svg>

              </span>

              <span>
                {{ theme === 'dark'
                  ? 'Light mode'
                  : 'Dark mode'
                }}
              </span>
            </span>

            <span
              class="navbar__theme-switch"
              :class="{
                'navbar__theme-switch--light':
                  theme === 'light'
              }"
              aria-hidden="true"
            >
              <span class="navbar__theme-switch-thumb"></span>
            </span>
          </button>

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
  onMounted,
  onUnmounted,
  watch
} from 'vue'

import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { useTheme } from '@/composables/useTheme'

const route = useRoute()

const scrolled = ref(false)
const menuOpen = ref(false)

/* --------------------------------------------------
   Theme

   Uses the shared composable (single source of truth,
   see src/composables/useTheme.ts) instead of keeping
   its own local copy — this is what actually makes the
   toggle affect the whole app, not just this component.
-------------------------------------------------- */

const { theme, toggleTheme, initTheme } = useTheme()

/* --------------------------------------------------
   Navigation
-------------------------------------------------- */

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
   Mobile link split
   - First 3 links show inline in the mobile navbar
     itself (Home / Services / About).
   - The remaining links stay only in the mobile
     sidebar/drawer (Portfolio / Contact).
   - Desktop is untouched: it keeps using the full
     `navLinks` list via `.navbar__links` as before.
-------------------------------------------------- */

const mobileTopLinks = navLinks.slice(0, 3)
const mobileSidebarLinks = navLinks.slice(3)

/* --------------------------------------------------
   Navigation state
-------------------------------------------------- */

const isActive = (path: string) => {
  if (path === '/') {
    return route.path === '/'
  }

  return (
    route.path === path ||
    route.path.startsWith(`${path}/`)
  )
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
  if (typeof window === 'undefined') {
    return
  }

  scrolled.value =
    window.scrollY > 24
}

/* --------------------------------------------------
   Keyboard controls
-------------------------------------------------- */

const handleKeydown = (
  event: KeyboardEvent
) => {
  if (
    event.key === 'Escape' &&
    menuOpen.value
  ) {
    closeMenu()
  }
}

/* --------------------------------------------------
   Responsive behaviour
-------------------------------------------------- */

const handleResize = () => {
  if (
    typeof window === 'undefined'
  ) {
    return
  }

  if (
    window.innerWidth > 900 &&
    menuOpen.value
  ) {
    closeMenu()
  }
}

/* --------------------------------------------------
   Prevent background scrolling
-------------------------------------------------- */

watch(
  menuOpen,
  (isOpen) => {
    if (
      typeof document === 'undefined'
    ) {
      return
    }

    document.body.style.overflow =
      isOpen
        ? 'hidden'
        : ''
  }
)

/* --------------------------------------------------
   Lifecycle
-------------------------------------------------- */

onMounted(() => {
  initTheme()
  handleScroll()

  window.addEventListener(
    'scroll',
    handleScroll,
    { passive: true }
  )

  window.addEventListener(
    'resize',
    handleResize,
    { passive: true }
  )

  window.addEventListener(
    'keydown',
    handleKeydown
  )
})

onUnmounted(() => {
  if (
    typeof window !== 'undefined'
  ) {
    window.removeEventListener(
      'scroll',
      handleScroll
    )

    window.removeEventListener(
      'resize',
      handleResize
    )

    window.removeEventListener(
      'keydown',
      handleKeydown
    )
  }

  if (
    typeof document !== 'undefined'
  ) {
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

  color: var(--text-primary);
}

/* Remove the default mobile tap-flash so our own
   :active feedback states (below) read cleanly. */
.navbar a,
.navbar button {
  -webkit-tap-highlight-color: transparent;
}

/* ==================================================
   SCROLLED NAVBAR
================================================== */

.navbar--scrolled {
  padding: 0.75rem 0;

  background: var(--header-bg);

  border-bottom: 1px solid var(--border-color);

  backdrop-filter: blur(18px) saturate(160%);
  -webkit-backdrop-filter: blur(18px) saturate(160%);

  /* Layered, semi-transparent elevation instead of a
     single opaque shadow — softer and theme-agnostic,
     so it reads correctly in both light and dark mode. */
  box-shadow:
    0 1px 0 rgba(2, 6, 23, 0.04),
    0 12px 30px -10px rgba(2, 6, 23, 0.28);
}

/* ==================================================
   INNER
================================================== */

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

  color: var(--text-primary);
  text-decoration: none;

  flex-shrink: 0;

  border-radius: 10px;
}

/* The logo artwork itself is white/light, so the chip
   behind it can't track the page's surface color the way
   it used to — on the light theme "surface-bg-soft" is
   nearly white too, and the mark disappeared into it.
   Instead the chip now uses a fixed dark, slightly
   gradient background in BOTH themes, so there's always
   guaranteed contrast behind the white artwork. Bumped up
   a little (44px -> 50px) per request as well. */
.navbar__logo-mark {
  width: 58px;
  height: 58px;

  display: grid;
  place-items: center;
  border-radius: 12px;

  background: linear-gradient(
    155deg,
    var(--navy-900, #0f172a) 0%,
    var(--navy-950, #020617) 100%
  );

  border: 1.5px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;

  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    0 2px 8px rgba(2, 6, 23, 0.35);

  transition:
    transform 0.35s var(--ease-out),
    opacity 0.3s ease,
    box-shadow 0.3s ease,
    border-color var(--transition-base);
}

.navbar__logo:hover
.navbar__logo-mark {
  transform: translateY(-1px) scale(1.05);
  border-color: rgba(34, 211, 238, 0.35);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 6px 16px rgba(2, 6, 23, 0.4);
}

/* Base styles scoped strictly to the logo class */
.navbar__logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;

  /* If logo.png has transparent padding baked into the
     canvas, 100%/contain will faithfully render that empty
     space too — no amount of width/height here can make the
     drawn mark itself bigger than what's actually in the
     file. This scale zooms past that padding; the chip has
     overflow:hidden so the excess is cropped rather than
     spilling out. Tune 1.35 up/down to taste, or better:
     re-export logo.png cropped tight to the mark and drop
     this back to scale(1). */
  transform: scale(1.35);
  transform-origin: center;
  /* Prevent browser-level rendering bleed */
  isolation: isolate;
  transition: filter 0.2s ease-in-out;
}

.navbar__logo-text {
  display: flex;
  flex-direction: column;

  line-height: 1;
}

.navbar__logo-name {
  font-family: var(--font-display);

  /* Fixed size — this had been set to grow with viewport
     width, which reads as the logo visibly stretching/
     enlarging rather than a stable wordmark. */
  font-size: 1.05rem;
  font-weight: 700;

  letter-spacing: -0.03em;

  color: var(--text-primary);
}

.navbar__logo-sub {
  margin-top: 0.32rem;

  font-size: 0.55rem;
  font-weight: 500;

  color: var(--text-muted);

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

  color: var(--text-secondary);

  font-family: var(--font-display);
  font-size: 0.875rem;
  font-weight: 600;

  letter-spacing: 0.01em;

  text-decoration: none;

  transition:
    color 0.25s ease,
    background-color 0.25s ease,
    transform 0.25s var(--ease-out);
}

/* Hover now lifts slightly and previews the underline
   indicator (see .navbar__link-dot below) instead of just
   swapping to a flat background — makes hover feel like a
   step toward "active" rather than a completely separate
   visual language. */
.navbar__link:hover {
  color: var(--text-primary);
  background: var(--surface-bg-soft);
  transform: translateY(-1px);
}

.navbar__link:active {
  transform: translateY(0);
}

/* Active state is color + underline only, no filled
   pill — the pill made hover and active look like the
   same treatment, which reads as templated. A thin
   underline is a clearer, more deliberate "you are
   here" signal. */
.navbar__link.active {
  color: var(--text-primary);
}

/* Active indicator: a short underline bar instead of a
   dot, positioned like a tab indicator. On hover it now
   fades in at half-strength/width as a preview, then
   snaps to full width + full opacity + brighter color
   once the link is actually active. */

.navbar__link-dot {
  position: absolute;

  left: 50%;
  bottom: 3px;

  width: 20px;
  height: 2px;

  border-radius: 2px;

  background: var(--cyan-400);

  transform:
    translateX(-50%)
    scaleX(0);

  opacity: 0;

  transition:
    transform 0.25s var(--ease-out),
    opacity 0.25s ease,
    background-color 0.25s ease;
}

.navbar__link:hover
.navbar__link-dot {
  transform:
    translateX(-50%)
    scaleX(0.55);

  opacity: 0.45;
}

.navbar__link.active
.navbar__link-dot {
  transform:
    translateX(-50%)
    scaleX(1);

  opacity: 1;
}

.navbar__link.active:hover
.navbar__link-dot {
  opacity: 1;
  transform:
    translateX(-50%)
    scaleX(1.08);
}

/* ==================================================
   MOBILE INLINE NAVIGATION (Home / Services / About)

   Hidden by default so desktop is completely unaffected —
   only becomes visible inside the same max-width: 900px
   breakpoint where `.navbar__links` (the full desktop nav)
   is hidden, further down in this file.
================================================== */

.navbar__links-mobile {
  display: none;
  align-items: center;

  gap: 0.1rem;
}

.navbar__link-mobile {
  display: inline-flex;
  align-items: center;

  min-height: 36px;

  padding: 0 0.55rem;

  border-radius: 6px;

  color: var(--text-secondary);

  font-family: var(--font-display);
  font-size: 0.82rem;
  font-weight: 700;

  letter-spacing: 0.01em;

  text-decoration: none;
  white-space: nowrap;

  transition:
    color 0.25s ease,
    background-color 0.25s ease;
}

.navbar__link-mobile:hover,
.navbar__link-mobile.active {
  color: var(--text-primary);
}

.navbar__link-mobile:active {
  background: var(--surface-bg-soft);
}

/* ==================================================
   ACTIONS
================================================== */

.navbar__actions {
  display: flex;
  align-items: center;

  gap: 0.65rem;
}

/* ==================================================
   THEME TOGGLE
================================================== */

.navbar__theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  gap: 0.45rem;

  min-height: 40px;

  padding: 0 0.75rem;

  border: 1px solid var(--border-color);
  border-radius: 999px;

  background: var(--surface-bg-soft);
  color: var(--text-primary);

  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 700;

  cursor: pointer;

  white-space: nowrap;

  transition:
    background-color 0.25s ease,
    color 0.25s ease,
    border-color 0.25s ease,
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.navbar__theme-toggle:hover {
  color: var(--cyan-400);

  border-color: var(--cyan-400);

  background: rgba(
    34,
    211,
    238,
    0.08
  );

  transform: translateY(-1px);
}

.navbar__theme-toggle:active {
  transform: translateY(0) scale(0.96);
}

.navbar__theme-icon {
  flex-shrink: 0;
}

/* ==================================================
   DESKTOP CTA
================================================== */

.navbar__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  gap: 0.55rem;

  min-height: 42px;

  padding: 0.65rem 1.05rem;

  border: 1px solid var(--navy-950);
  border-radius: 8px;

  /* Solid by default rather than the same neutral grey
     as the theme toggle — this is the one control on the
     bar meant to grab attention, so it shouldn't blend
     in until hovered. */
  background: var(--navy-950);

  color: #fff;

  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 700;

  text-decoration: none;

  transition:
    background-color 0.25s ease,
    border-color 0.25s ease,
    color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.25s var(--ease-out);
}

.navbar__cta:hover {
  background: var(--cyan-400);
  border-color: var(--cyan-400);

  color: var(--navy-950);

  box-shadow: 0 10px 24px -8px rgba(34, 211, 238, 0.55);

  transform: translateY(-1px);
}

.navbar__cta:active {
  transform: translateY(0) scale(0.98);
  box-shadow: none;
}

.navbar__cta-icon {
  transition:
    transform 0.25s var(--ease-out);
}

.navbar__cta:hover
.navbar__cta-icon {
  transform: translateX(3px);
}

/* ==================================================
   MOBILE BURGER
================================================== */

.navbar__burger {
  display: none;

  width: 44px;
  height: 44px;

  padding: 0;

  align-items: center;
  justify-content: center;
  flex-direction: column;

  gap: 5px;

  border: 1px solid var(--border-color);
  border-radius: 8px;

  background: var(--surface-bg-soft);

  color: var(--text-primary);

  cursor: pointer;

  transition:
    background-color 0.25s ease,
    border-color 0.25s ease,
    transform 0.15s ease;
}

.navbar__burger:hover,
.navbar__burger--open {
  background: var(--surface-bg-soft);
  border-color: var(--cyan-400);
}

.navbar__burger:active {
  transform: scale(0.94);
}

.burger-line {
  display: block;

  width: 17px;
  height: 1.5px;

  border-radius: 2px;

  background: currentColor;

  transform-origin: center;

  transition:
    transform 0.3s var(--ease-out),
    opacity 0.2s ease;
}

.navbar__burger--open
.burger-line:nth-child(1) {
  transform:
    translateY(6.5px)
    rotate(45deg);
}

.navbar__burger--open
.burger-line:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.navbar__burger--open
.burger-line:nth-child(3) {
  transform:
    translateY(-6.5px)
    rotate(-45deg);
}

/* ==================================================
   MOBILE MENU
================================================== */

.navbar__mobile {
  position: absolute;

  top: 100%;
  left: 0;
  right: 0;

  max-height:
    calc(100vh - 70px);

  overflow-y: auto;

  background:
    var(--surface-bg);

  color: var(--text-primary);

  border-top:
    1px solid var(--border-color);

  border-bottom:
    1px solid var(--border-color);

  border-radius: 0 0 20px 20px;

  box-shadow:
    0 1px 0 rgba(2, 6, 23, 0.04),
    0 25px 60px -12px rgba(2, 6, 23, 0.32);

  overscroll-behavior: contain;
}

.navbar__mobile-inner {
  padding:
    1.25rem
    1.25rem
    1.5rem;
}

/* ==================================================
   MOBILE HEADING
================================================== */

.navbar__mobile-heading {
  display: flex;
  align-items: center;

  gap: 0.75rem;

  margin-bottom: 0.5rem;

  color: var(--text-muted);

  font-size: 0.65rem;
  font-weight: 600;

  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.navbar__mobile-line {
  flex: 1;

  height: 1px;

  background:
    var(--border-color);
}

/* ==================================================
   MOBILE LINKS
================================================== */

.navbar__mobile-links {
  display: flex;
  flex-direction: column;
}

.navbar__mobile-link {
  display: grid;

  grid-template-columns:
    32px
    1fr
    auto;

  align-items: center;

  gap: 0.5rem;

  min-height: 62px;

  border-bottom:
    1px solid var(--border-soft);

  border-radius: 8px;

  color: var(--text-secondary);

  text-decoration: none;

  transition:
    color 0.25s ease,
    background-color 0.15s ease,
    padding-left 0.25s var(--ease-out);
}

.navbar__mobile-link:hover,
.navbar__mobile-link.active {
  color: var(--text-primary);
}

.navbar__mobile-link:hover {
  padding-left: 0.35rem;
}

.navbar__mobile-link:active {
  background: var(--surface-bg-soft);
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
  opacity: 0.35;

  transition:
    opacity 0.25s ease,
    transform 0.25s var(--ease-out);
}

.navbar__mobile-link:hover
.mobile-link-arrow,
.navbar__mobile-link.active
.mobile-link-arrow {
  opacity: 1;
  transform: translateX(3px);
}

/* ==================================================
   MOBILE THEME
================================================== */

.navbar__mobile-theme {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  min-height: 52px;

  margin-top: 1rem;
  padding: 0 0.9rem;

  border: 1px solid var(--border-color);
  border-radius: 9px;

  background: var(--surface-bg-soft);
  color: var(--text-primary);

  font-family: var(--font-display);
  font-size: 0.82rem;
  font-weight: 700;

  cursor: pointer;

  transition:
    background-color 0.25s ease,
    border-color 0.25s ease,
    color 0.25s ease,
    transform 0.15s ease;
}

.navbar__mobile-theme:hover {
  border-color: var(--cyan-400);

  color: var(--cyan-400);
}

.navbar__mobile-theme:active {
  transform: scale(0.98);
}

.navbar__mobile-theme-left {
  display: flex;
  align-items: center;

  gap: 0.7rem;
}

.navbar__mobile-theme-icon {
  display: grid;
  place-items: center;

  width: 32px;
  height: 32px;

  border-radius: 50%;

  background:
    rgba(
      34,
      211,
      238,
      0.08
    );

  color: var(--cyan-400);
}

/* Theme switch */

.navbar__theme-switch {
  position: relative;

  width: 42px;
  height: 24px;

  padding: 3px;

  border-radius: 999px;

  background: var(--border-color);

  transition:
    background-color 0.25s ease;
}

.navbar__theme-switch--light {
  background: var(--cyan-400);
}

.navbar__theme-switch-thumb {
  display: block;

  width: 18px;
  height: 18px;

  border-radius: 50%;

  background: var(--text-primary);

  box-shadow: 0 1px 3px rgba(2, 6, 23, 0.35);

  transform: translateX(0);

  transition:
    transform 0.25s var(--ease-out),
    background-color 0.25s ease;
}

.navbar__theme-switch--light
.navbar__theme-switch-thumb {
  transform: translateX(18px);

  background: var(--navy-950);
}

/* ==================================================
   MOBILE CTA
================================================== */

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
    box-shadow 0.25s ease,
    filter 0.25s ease;
}

.navbar__mobile-cta:hover {
  transform: translateY(-2px);
  filter: brightness(1.05);
  box-shadow: 0 12px 24px -8px rgba(34, 211, 238, 0.5);
}

.navbar__mobile-cta:active {
  transform: translateY(0) scale(0.98);
  box-shadow: none;
}

/* ==================================================
   MOBILE CONTACT FOOTER
================================================== */

.navbar__mobile-footer {
  display: flex;
  flex-direction: column;

  gap: 0.55rem;

  margin-top: 1.5rem;
  padding-top: 1.15rem;

  border-top:
    1px solid var(--border-color);
}

.navbar__mobile-footer-label {
  color: var(--text-subtle);

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
  color: var(--text-secondary);

  font-size: 0.78rem;

  text-decoration: none;

  transition:
    color 0.25s ease;
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

  /* Was -1, which (with no positioned ancestor) sat the
     backdrop BEHIND ordinary page content instead of
     dimming it. 998 keeps it under the navbar/menu
     (z-index 1000) but above everything else. */
  z-index: 998;

  background:
    rgba(2, 4, 20, 0.6);

  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
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
  transition:
    opacity 0.25s ease;
}

.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}

/* ==================================================
   ACCESSIBILITY: KEYBOARD FOCUS

   Every interactive element gets a consistent, visible
   focus ring (not just the theme toggle, as before) —
   this matters for anyone navigating with a keyboard.
================================================== */

.navbar__logo:focus-visible,
.navbar__link:focus-visible,
.navbar__link-mobile:focus-visible,
.navbar__theme-toggle:focus-visible,
.navbar__cta:focus-visible,
.navbar__burger:focus-visible,
.navbar__mobile-link:focus-visible,
.navbar__mobile-theme:focus-visible,
.navbar__mobile-cta:focus-visible {
  outline: 2px solid var(--cyan-400);
  outline-offset: 3px;
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

  .navbar__links-mobile {
    display: flex;
  }

  .navbar__cta {
    display: none;
  }

  .navbar__burger {
    display: flex;
  }

  .navbar__logo-sub {
    font-size: 0.5rem;
  }

  .navbar__theme-toggle {
    min-height: 38px;

    padding:
      0 0.65rem;
  }
}

@media (max-width: 480px) {

  .navbar__logo-text {
    display: none;
  }

  .navbar__logo-mark {
    width: 52px;
    height: 52px;
  }

  .navbar__inner {
    gap: 0.55rem;
  }

  .navbar__actions {
    gap: 0.45rem;
  }

  .navbar__theme-label {
    display: none;
  }

  .navbar__links-mobile {
    gap: 0;
  }

  .navbar__link-mobile {
    padding: 0 0.4rem;
    font-size: 0.78rem;
  }

  .navbar__theme-toggle {
    width: 44px;
    height: 44px;

    padding: 0;
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
    transition-duration:
      0.01ms !important;

    animation-duration:
      0.01ms !important;
  }
}
</style>