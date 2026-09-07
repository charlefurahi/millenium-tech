<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition name="sidebar-backdrop">
      <div
        v-if="open"
        class="sidebar-backdrop"
        aria-hidden="true"
        @click="close"
      ></div>
    </Transition>

    <!-- Sidebar -->
    <Transition name="sidebar">
      <aside
        v-if="open"
        class="sidebar"
        aria-label="Mobile navigation"
        @click.stop
      >
        <!-- Header -->
        <div class="sidebar__header">
          <router-link
            to="/"
            class="sidebar__brand"
            aria-label="Millenium Tech - Home"
            @click="close"
          >
            <div class="sidebar__brand-mark">
              <img
                src="@/assets/logo.png"
                alt="Millenium Tech"
              />
            </div>

            <div class="sidebar__brand-text">
              <span class="sidebar__brand-name">
                Millenium<span>Tech</span>
              </span>

              <span class="sidebar__brand-sub">
                IT Solutions Point
              </span>
            </div>
          </router-link>

          <!-- Close -->
          <button
            type="button"
            class="sidebar__close"
            aria-label="Close navigation menu"
            @click="close"
          >
            <span></span>
            <span></span>
          </button>
        </div>

        <!-- Small label -->
        <div class="sidebar__label">
          <span>Navigation</span>
          <i></i>
        </div>

        <!-- Navigation -->
        <nav class="sidebar__nav">
          <router-link
            v-for="(link, index) in navLinks"
            :key="link.path"
            :to="link.path"
            class="sidebar__link"
            :class="{ 'sidebar__link--active': isActive(link.path) }"
            :style="{ '--i': index }"
            :aria-current="
              isActive(link.path)
                ? 'page'
                : undefined
            "
            @click="close"
          >
            <span class="sidebar__number">
              {{ link.num }}
            </span>

            <span class="sidebar__link-content">
              <span class="sidebar__link-title">
                {{ link.label }}
              </span>

              <span class="sidebar__link-description">
                {{ link.description }}
              </span>
            </span>
          </router-link>
        </nav>

        <!-- Bottom section -->
        <div class="sidebar__bottom">
          <!-- Theme -->
          <button
            type="button"
            class="sidebar__theme"
            @click="toggleTheme"
          >
            <span class="sidebar__theme-left">
              <span class="sidebar__theme-icon">
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
              class="sidebar__switch"
              :class="{
                'sidebar__switch--light':
                  theme === 'light'
              }"
            >
              <span class="sidebar__switch-thumb"></span>
            </span>
          </button>

          <!-- CTA -->
          <router-link
            to="/contact"
            class="sidebar__cta"
            @click="close"
          >
            <span>Let's talk</span>
          </router-link>

          <!-- Contact -->
          <div class="sidebar__contact">
            <span class="sidebar__contact-label">
              Talk to us
            </span>

            <a href="tel:+255755794664">
              +255 755 794 664
            </a>

            <a href="tel:+255616533644">
              +255 616 533 644
            </a>
          </div>

          <div class="sidebar__copyright">
            © {{ new Date().getFullYear() }} Millenium Tech
          </div>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  watch
} from 'vue'

import { useRoute } from 'vue-router'

import { useTheme } from '@/composables/useTheme'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const route = useRoute()

const {
  theme,
  toggleTheme
} = useTheme()

const navLinks = [
  {
    path: '/',
    label: 'Home',
    num: '01',
    description: 'Back to the homepage'
  },
  {
    path: '/services',
    label: 'Services',
    num: '02',
    description: 'What we do for businesses'
  },
  {
    path: '/about',
    label: 'About',
    num: '03',
    description: 'Learn about our company'
  },
  {
    path: '/portfolio',
    label: 'Portfolio',
    num: '04',
    description: 'Explore our work'
  },
  {
    path: '/contact',
    label: 'Contact',
    num: '05',
    description: 'Start a conversation'
  }
]

const isActive = (path: string) => {
  if (path === '/') {
    return route.path === '/'
  }

  return (
    route.path === path ||
    route.path.startsWith(`${path}/`)
  )
}

const close = () => {
  emit('close')
}

/*
 * Prevent the page behind the sidebar from scrolling.
 */
watch(
  () => props.open,
  (isOpen) => {
    if (typeof document === 'undefined') {
      return
    }

    document.body.style.overflow =
      isOpen ? 'hidden' : ''
  },
  { immediate: true }
)

/*
 * Escape closes the sidebar.
 */
const handleKeydown = (event: KeyboardEvent) => {
  if (
    event.key === 'Escape' &&
    props.open
  ) {
    close()
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener(
    'keydown',
    handleKeydown
  )
}

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener(
      'keydown',
      handleKeydown
    )
  }

  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
/* =========================================================
   BACKDROP
========================================================= */

.sidebar-backdrop {
  position: fixed;
  inset: 0;

  z-index: 1190;

  background:
    rgba(2, 4, 20, 0.5);

  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}


/* =========================================================
   SIDEBAR
========================================================= */

.sidebar {
  position: fixed;

  top: 0.75rem;
  right: 0.75rem;
  bottom: 0.75rem;

  z-index: 1200;

  width: min(88vw, 400px);

  display: flex;
  flex-direction: column;

  overflow-y: auto;
  overscroll-behavior: contain;

  background: var(--surface-bg);

  color: var(--text-primary);

  border: 1px solid var(--border-color);
  border-radius: 26px;

  backdrop-filter: blur(24px) saturate(160%);
  -webkit-backdrop-filter: blur(24px) saturate(160%);

  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.05) inset,
    -24px 30px 90px rgba(0, 0, 0, 0.4);

  isolation: isolate;
}


/* =========================================================
   SUBTLE BACKGROUND
========================================================= */

.sidebar::before {
  content: '';

  position: absolute;
  inset: 0;

  z-index: -1;

  pointer-events: none;

  background:
    radial-gradient(
      620px circle at 100% 0%,
      var(--cyan-soft),
      transparent 48%
    );
}

.sidebar::after {
  content: '';

  position: absolute;
  inset: 0;

  z-index: -1;

  pointer-events: none;
  border-radius: inherit;

  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.05) 0%,
    transparent 18%
  );
}


/* =========================================================
   HEADER
========================================================= */

.sidebar__header {
  min-height: 78px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 1rem;

  padding: 1.15rem 1.15rem 1rem;
}


/* =========================================================
   BRAND
========================================================= */

.sidebar__brand {
  display: flex;
  align-items: center;

  gap: 0.65rem;

  min-width: 0;

  color: var(--text-primary);

  text-decoration: none;
}

.sidebar__brand-mark {
  width: 40px;
  height: 40px;

  flex: 0 0 40px;

  display: grid;
  place-items: center;
  border-radius: 11px;

  background:
    linear-gradient(
      155deg,
      var(--navy-900, #0f172a) 0%,
      var(--navy-950, #020617) 100%
    );

  overflow: hidden;
}

.sidebar__brand-mark img {
  width: 100%;
  height: 100%;

  object-fit: contain;

  transform: scale(1.3);
}

.sidebar__brand-text {
  display: flex;
  flex-direction: column;

  min-width: 0;

  line-height: 1;
}

.sidebar__brand-name {
  font-family: var(--font-display);

  font-size: 1rem;
  font-weight: 800;

  letter-spacing: -0.025em;

  white-space: nowrap;
}

.sidebar__brand-name span {
  color: var(--cyan-text);
}

.sidebar__brand-sub {
  margin-top: 0.3rem;

  color: var(--text-muted);

  font-size: 0.5rem;
  font-weight: 600;

  letter-spacing: 0.1em;

  text-transform: uppercase;
}


/* =========================================================
   CLOSE BUTTON
========================================================= */

.sidebar__close {
  position: relative;

  width: 38px;
  height: 38px;

  flex: 0 0 38px;

  display: grid;
  place-items: center;

  border: none;
  border-radius: 50%;

  background: var(--surface-bg-soft);

  color: var(--text-primary);

  cursor: pointer;

  transition:
    background-color var(--transition-base),
    color var(--transition-base),
    transform var(--transition-base);
}

.sidebar__close:hover {
  background: var(--cyan-400);
  color: var(--navy-950);

  transform: rotate(90deg);
}

.sidebar__close span {
  position: absolute;

  width: 15px;
  height: 1.5px;

  border-radius: 2px;

  background: currentColor;
}

.sidebar__close span:first-child {
  transform: rotate(45deg);
}

.sidebar__close span:last-child {
  transform: rotate(-45deg);
}


/* =========================================================
   LABEL
========================================================= */

.sidebar__label {
  display: flex;
  align-items: center;

  gap: 0.65rem;

  padding: 0.6rem 1.25rem 0.9rem;

  color: var(--text-subtle);

  font-size: 0.62rem;
  font-weight: 700;

  letter-spacing: 0.16em;

  text-transform: uppercase;
}

.sidebar__label i {
  width: 20px;
  height: 1px;

  background: linear-gradient(
    90deg,
    var(--border-color),
    transparent
  );
}


/* =========================================================
   NAVIGATION
========================================================= */

.sidebar__nav {
  display: flex;
  flex-direction: column;

  gap: 0.3rem;

  padding: 0 0.85rem;
}


/* =========================================================
   NAV LINK

   Rounded, self-contained "tiles" instead of a bordered
   list — each link floats on its own with generous
   padding, no dividers, no arrow. Active state reads as
   a soft filled pill with a small glowing dot rather than
   a border accent.
========================================================= */

.sidebar__link {
  position: relative;

  display: flex;
  align-items: center;

  gap: 0.85rem;

  min-height: 64px;

  padding: 0.7rem 0.9rem;

  color: var(--text-secondary);

  text-decoration: none;

  border-radius: 16px;

  opacity: 0;
  transform: translateX(10px);

  animation:
    sidebar-link-in 0.4s var(--ease-out) forwards;

  animation-delay:
    calc(60ms * var(--i));

  transition:
    color 0.2s ease,
    background-color 0.2s ease,
    transform 0.2s ease;
}

.sidebar__link:hover {
  color: var(--text-primary);
  background: var(--surface-bg-soft);

  transform: translateX(2px);
}

.sidebar__link--active {
  color: var(--text-primary);

  background:
    linear-gradient(
      120deg,
      var(--cyan-soft) 0%,
      transparent 100%
    );

  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.04) inset;
}

.sidebar__link--active::after {
  content: '';

  position: absolute;

  right: 0.9rem;
  top: 50%;

  width: 6px;
  height: 6px;

  border-radius: 50%;

  background: var(--cyan-400);
  box-shadow: 0 0 0 4px var(--cyan-soft);

  transform: translateY(-50%);
}

.sidebar__link--active:hover {
  transform: none;
}


/* =========================================================
   NUMBER
========================================================= */

.sidebar__number {
  flex: 0 0 auto;

  display: grid;
  place-items: center;

  width: 30px;
  height: 30px;

  border-radius: 9px;

  background: var(--surface-bg-soft);

  color: var(--text-muted);

  font-size: 0.62rem;
  font-weight: 700;

  letter-spacing: 0.04em;

  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.sidebar__link--active .sidebar__number {
  background: var(--cyan-400);
  color: var(--navy-950);
}


/* =========================================================
   LINK CONTENT
========================================================= */

.sidebar__link-content {
  display: flex;
  flex-direction: column;

  min-width: 0;
}

.sidebar__link-title {
  font-family: var(--font-display);

  font-size: 0.98rem;
  font-weight: 700;

  line-height: 1.2;
}

.sidebar__link-description {
  margin-top: 0.2rem;

  color: var(--text-muted);

  font-size: 0.72rem;

  line-height: 1.4;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


/* =========================================================
   LINK ENTRANCE ANIMATION
========================================================= */

@keyframes sidebar-link-in {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}


/* =========================================================
   BOTTOM
========================================================= */

.sidebar__bottom {
  margin-top: auto;

  padding: 1.25rem;
}


/* =========================================================
   THEME
========================================================= */

.sidebar__theme {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 1rem;

  min-height: 52px;

  padding: 0.75rem 0.9rem;

  border: none;
  border-radius: 14px;

  background: var(--surface-bg-soft);

  color: var(--text-primary);

  font-family: var(--font-display);

  font-size: 0.78rem;
  font-weight: 700;

  cursor: pointer;

  transition: background-color var(--transition-base);
}

.sidebar__theme:hover {
  background: var(--cyan-soft);
}

.sidebar__theme-left {
  display: flex;
  align-items: center;

  gap: 0.65rem;
}

.sidebar__theme-icon {
  display: grid;
  place-items: center;

  width: 30px;
  height: 30px;

  border-radius: 50%;

  background: rgba(34, 211, 238, 0.1);
  color: var(--cyan-text);
}


/* =========================================================
   SWITCH
========================================================= */

.sidebar__switch {
  position: relative;

  width: 40px;
  height: 22px;

  flex: 0 0 40px;

  padding: 2px;

  border-radius: 999px;

  background: var(--navy-700);

  transition: background-color var(--transition-base);
}

.sidebar__switch--light {
  background: var(--cyan-600);
}

.sidebar__switch-thumb {
  display: block;

  width: 18px;
  height: 18px;

  border-radius: 50%;

  background: #ffffff;

  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.2);

  transform: translateX(0);

  transition: transform var(--transition-base);
}

.sidebar__switch--light
.sidebar__switch-thumb {
  transform: translateX(18px);
}


/* =========================================================
   CTA
========================================================= */

.sidebar__cta {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 54px;

  margin-top: 0.6rem;

  padding: 0.8rem 1.1rem;

  border: none;
  border-radius: 14px;

  background: linear-gradient(
    135deg,
    var(--cyan-400) 0%,
    var(--cyan-300) 100%
  );

  color: var(--navy-950);

  font-family: var(--font-display);

  font-size: 0.85rem;
  font-weight: 800;

  letter-spacing: 0.01em;

  text-decoration: none;

  transition:
    transform var(--transition-base),
    box-shadow var(--transition-base),
    filter var(--transition-base);
}

.sidebar__cta:hover {
  transform: translateY(-2px);

  box-shadow: var(--shadow-cyan);

  filter: brightness(1.03);
}

.sidebar__cta:active {
  transform: translateY(0) scale(0.98);
}


/* =========================================================
   CONTACT
========================================================= */

.sidebar__contact {
  display: flex;
  flex-direction: column;

  gap: 0.3rem;

  margin-top: 1.2rem;

  padding-top: 1rem;

  border-top: 1px solid var(--border-soft);
}

.sidebar__contact-label {
  margin-bottom: 0.2rem;

  color: var(--text-subtle);

  font-size: 0.6rem;
  font-weight: 700;

  letter-spacing: 0.13em;

  text-transform: uppercase;
}

.sidebar__contact a {
  width: fit-content;

  color: var(--text-secondary);

  font-size: 0.75rem;

  transition: color var(--transition-base);
}

.sidebar__contact a:hover {
  color: var(--cyan-text);
}


/* =========================================================
   COPYRIGHT
========================================================= */

.sidebar__copyright {
  margin-top: 1rem;

  color: var(--text-subtle);

  font-size: 0.62rem;
}


/* =========================================================
   SIDEBAR TRANSITION
========================================================= */

.sidebar-enter-active,
.sidebar-leave-active {
  transition:
    transform 0.38s var(--ease-out),
    opacity 0.28s ease;
}

.sidebar-enter-from,
.sidebar-leave-to {
  opacity: 0;

  transform: translateX(24px) scale(0.98);
}


/* =========================================================
   BACKDROP TRANSITION
========================================================= */

.sidebar-backdrop-enter-active,
.sidebar-backdrop-leave-active {
  transition: opacity 0.28s ease;
}

.sidebar-backdrop-enter-from,
.sidebar-backdrop-leave-to {
  opacity: 0;
}


/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 480px) {
  .sidebar {
    top: 0;
    right: 0;
    bottom: 0;

    width: 100vw;

    border-radius: 0;
    border: none;
  }

  .sidebar__header {
    min-height: 74px;

    padding-inline: 1rem;
  }

  .sidebar__brand-mark {
    width: 38px;
    height: 38px;

    flex-basis: 38px;
  }

  .sidebar__brand-name {
    font-size: 0.95rem;
  }

  .sidebar__link {
    min-height: 62px;
  }
}


/* =========================================================
   REDUCED MOTION
========================================================= */

@media (prefers-reduced-motion: reduce) {
  .sidebar,
  .sidebar *,
  .sidebar-backdrop {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }

  .sidebar__link {
    opacity: 1;
    transform: none;
    animation: none;
  }
}
</style>