<template>
  <Teleport to="body">
    <!-- =========================================================
         BACKDROP
         ========================================================= -->
    <Transition name="sidebar-backdrop">
      <div
        v-if="open"
        class="sidebar-backdrop"
        aria-hidden="true"
        @click="close"
      ></div>
    </Transition>

    <!-- =========================================================
         RIGHT SIDEBAR
         ========================================================= -->
    <Transition name="sidebar">
      <aside
        v-if="open"
        id="mobile-sidebar"
        class="sidebar"
        aria-label="Mobile navigation"
        @click.stop
      >
        <!-- =======================================================
             HEADER
             ======================================================= -->
        <header class="sidebar__header">
          <router-link
            to="/"
            class="sidebar__brand"
            aria-label="Millenium Tech home"
            @click="close"
          >
            <span class="sidebar__brand-mark">
              <img
                src="@/assets/logo.png"
                alt="Millenium Tech"
              />
            </span>

            <span class="sidebar__brand-text">
              <span class="sidebar__brand-name">
                Millenium <b>Tech</b>
              </span>

              <span class="sidebar__brand-sub">
                IT Solutions Point
              </span>
            </span>
          </router-link>

          <button
            type="button"
            class="sidebar__close"
            aria-label="Close navigation menu"
            @click="close"
          >
            <span></span>
            <span></span>
          </button>
        </header>


        <!-- =======================================================
             NAVIGATION
             ======================================================= -->
        <nav
          class="sidebar__nav"
          aria-label="Primary navigation"
        >
          <router-link
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="sidebar__link"
            :class="{
              'sidebar__link--active': isActive(link.path)
            }"
            :aria-current="
              isActive(link.path)
                ? 'page'
                : undefined
            "
            @click="close"
          >
            <span class="sidebar__link-text">
              {{ link.label }}
            </span>

            <span
              class="sidebar__link-indicator"
              aria-hidden="true"
            ></span>
          </router-link>
        </nav>


        <!-- =======================================================
             BOTTOM
             ======================================================= -->
        <div class="sidebar__bottom">

          <!-- Theme -->

          <button
            type="button"
            class="sidebar__theme"
            :aria-label="
              theme === 'dark'
                ? 'Switch to light mode'
                : 'Switch to dark mode'
            "
            @click="toggleTheme"
          >
            <span class="sidebar__theme-content">
              <span class="sidebar__theme-icon">

                <!-- Sun -->

                <svg
                  v-if="theme === 'dark'"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                  />

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
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M21 12.79A9 9 0 1 1 11.21 3
                    7 7 0 0 0 21 12.79Z"
                  />
                </svg>

              </span>

              <span class="sidebar__theme-label">
                {{
                  theme === 'dark'
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
              aria-hidden="true"
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
            <span>
              Get a free consultation
            </span>

            <span
              class="sidebar__cta-arrow"
              aria-hidden="true"
            >
              →
            </span>
          </router-link>


          <!-- Contact -->

          <div class="sidebar__contact">
            <span class="sidebar__contact-label">
              Contact
            </span>

            <a href="tel:+255755794664">
              +255 755 794 664
            </a>

            <a href="tel:+255616533644">
              +255 616 533 644
            </a>
          </div>


          <!-- Copyright -->

          <div class="sidebar__copyright">
            © {{ currentYear }} Millenium Tech
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
  onMounted,
  ref,
  watch
} from 'vue'

import { useRoute } from 'vue-router'
import { useTheme } from '@/composables/useTheme'


/* ===============================================================
   PROPS / EVENTS
   =============================================================== */

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()


/* ===============================================================
   ROUTER
   =============================================================== */

const route = useRoute()


/* ===============================================================
   THEME
   =============================================================== */

const {
  theme,
  toggleTheme
} = useTheme()


/* ===============================================================
   NAVIGATION
   =============================================================== */

const navLinks = [
  {
    path: '/',
    label: 'Home'
  },
  {
    path: '/about',
    label: 'About'
  },
  {
    path: '/services',
    label: 'Services'
  },
  {
    path: '/solutions',
    label: 'Solutions'
  },
  {
    path: '/portfolio',
    label: 'Portfolio'
  },
  {
    path: '/pricing',
    label: 'Packages'
  },
  {
    path: '/contact',
    label: 'Contact'
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


/* ===============================================================
   CLOSE
   =============================================================== */

const close = () => {
  emit('close')
}


/* ===============================================================
   CURRENT YEAR
   =============================================================== */

const currentYear = computed(() => {
  return new Date().getFullYear()
})


/* ===============================================================
   BODY SCROLL LOCK
   =============================================================== */

const previousBodyOverflow = ref('')

watch(
  () => props.open,
  (isOpen) => {
    if (typeof document === 'undefined') {
      return
    }

    if (isOpen) {
      previousBodyOverflow.value =
        document.body.style.overflow

      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow =
        previousBodyOverflow.value
    }
  },
  {
    immediate: true
  }
)


/* ===============================================================
   ESCAPE KEY
   =============================================================== */

const handleKeydown = (event: KeyboardEvent) => {
  if (
    event.key === 'Escape' &&
    props.open
  ) {
    close()
  }
}


/* ===============================================================
   LIFECYCLE
   =============================================================== */

onMounted(() => {
  window.addEventListener(
    'keydown',
    handleKeydown
  )
})


onBeforeUnmount(() => {
  window.removeEventListener(
    'keydown',
    handleKeydown
  )

  if (typeof document !== 'undefined') {
    document.body.style.overflow =
      previousBodyOverflow.value
  }
})
</script>


<style scoped>

/* ================================================================
   BACKDROP
   ================================================================ */

.sidebar-backdrop {
  position: fixed;
  inset: 0;

  z-index: 1190;

  background:
    rgba(2, 8, 18, 0.48);

  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
}


/* ================================================================
   SIDEBAR
   ================================================================ */

.sidebar {
  /* -----------------------------------------------------------
     Local aliases — the tokens this component was written
     against (--surface-bg, --text-primary, --cyan-text, etc.)
     don't exist in tokens.css, which left the sidebar with no
     real background. Map them here to the tokens that do
     exist, light theme first.
     ----------------------------------------------------------- */
  --surface-bg: linear-gradient(
    165deg,
    #ffffff 0%,
    var(--blue-50) 52%,
    var(--aqua-100) 100%
  );
  --surface-bg-soft: var(--blue-50);
  --text-primary: var(--ink);
  --text-secondary: var(--ink-2);
  --text-muted: var(--muted);
  --border-color: var(--line-strong);
  --border-soft: var(--line);
  --cyan-text: var(--blue-600);
  --cyan-400: var(--aqua-400);
  --cyan-600: var(--blue-600);

  position: fixed;

  top: 12px;
  right: 12px;
  bottom: 12px;

  z-index: 1200;

  width: 380px;
  max-width: calc(100vw - 24px);

  display: flex;
  flex-direction: column;

  overflow: hidden;

  background: var(--surface-bg);
  color: var(--text-primary);

  border: 1px solid var(--border-color);
  border-radius: 20px;

  box-shadow:
    -18px 20px 70px rgba(7, 27, 58, 0.22),
    0 1px 0 rgba(255, 255, 255, 0.6) inset;

  isolation: isolate;
}

/* Dark theme — lighter navy blend rather than the near-black
   --navy-950, so the panel still reads as an elevated surface
   instead of a flat dark slab. */
[data-theme='dark'] .sidebar {
  --surface-bg: linear-gradient(
    165deg,
    #17375f 0%,
    #102a4d 55%,
    #0c2140 100%
  );
  --surface-bg-soft: rgba(95, 216, 238, 0.09);
  --text-primary: var(--on-dark);
  --text-secondary: var(--on-dark-2);
  --text-muted: var(--on-dark-3);
  --border-color: var(--line-dark);
  --border-soft: var(--line-dark);
  --cyan-text: var(--aqua-300);

  box-shadow:
    -18px 20px 70px rgba(0, 0, 0, 0.45),
    0 1px 0 rgba(255, 255, 255, 0.05) inset;
}


/* ================================================================
   HEADER
   ================================================================ */

.sidebar__header {
  position: relative;

  min-height: 76px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 1rem;

  padding: 0.9rem 1rem;

  border-bottom:
    1px solid var(--border-soft);

  flex: 0 0 auto;

  overflow: hidden;
}

/* Soft accent glow behind the brand mark — echoes the football-glow
   motif used across the rest of the site. */
.sidebar__header::before {
  content: '';

  position: absolute;
  top: -60px;
  left: -40px;

  width: 180px;
  height: 180px;

  background: radial-gradient(
    circle,
    var(--glow-b) 0%,
    transparent 70%
  );

  pointer-events: none;
}


/* ================================================================
   BRAND
   ================================================================ */

.sidebar__brand {
  display: flex;
  align-items: center;

  gap: 0.7rem;

  min-width: 0;

  color: var(--text-primary);

  text-decoration: none;

  transition:
    opacity 0.2s ease;
}

.sidebar__brand:hover {
  opacity: 0.86;
}

.sidebar__brand-mark {
  width: 40px;
  height: 40px;

  flex: 0 0 40px;

  display: grid;
  place-items: center;

  overflow: hidden;

  border: 1px solid var(--border-color);
  border-radius: 10px;

  background: var(--surface-bg-soft);
}

.sidebar__brand-mark img {
  display: block;

  width: 100%;
  height: 100%;

  object-fit: contain;
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

.sidebar__brand-name b {
  color: var(--cyan-text);

  font-weight: 800;
}

.sidebar__brand-sub {
  margin-top: 5px;

  color: var(--text-muted);

  font-size: 0.53rem;
  font-weight: 700;

  letter-spacing: 0.12em;

  text-transform: uppercase;
}


/* ================================================================
   CLOSE BUTTON
   ================================================================ */

.sidebar__close {
  position: relative;

  width: 40px;
  height: 40px;

  flex: 0 0 40px;

  display: grid;
  place-items: center;

  padding: 0;

  border: 1px solid var(--border-color);
  border-radius: 10px;

  background: var(--surface-bg-soft);
  color: var(--text-primary);

  cursor: pointer;

  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

.sidebar__close:hover {
  background: var(--cyan-soft);

  border-color:
    var(--cyan-text);

  color: var(--cyan-text);

  transform: translateY(-1px);
}

.sidebar__close:active {
  transform: scale(0.95);
}

.sidebar__close span {
  position: absolute;

  width: 15px;
  height: 1.5px;

  border-radius: 999px;

  background: currentColor;
}

.sidebar__close span:first-child {
  transform: rotate(45deg);
}

.sidebar__close span:last-child {
  transform: rotate(-45deg);
}

.sidebar__close:focus-visible {
  outline: 2px solid var(--cyan-400);
  outline-offset: 3px;
}


/* ================================================================
   NAVIGATION
   ================================================================ */

.sidebar__nav {
  flex: 1 1 auto;

  min-height: 0;

  display: flex;
  flex-direction: column;

  overflow-y: auto;

  padding: 0.8rem;

  scrollbar-width: thin;

  scrollbar-color:
    var(--border-color)
    transparent;
}


/* ================================================================
   NAVIGATION LINK
   ================================================================ */

.sidebar__link {
  position: relative;

  display: flex;
  align-items: center;

  min-height: 52px;

  padding: 0 0.9rem;

  color: var(--text-secondary);

  text-decoration: none;

  border-radius: 10px;

  transition:
    color 0.2s ease,
    background-color 0.2s ease,
    padding-left 0.2s ease;
}

.sidebar__link:hover {
  color: var(--text-primary);

  background:
    var(--surface-bg-soft);

  padding-left: 1.05rem;
}

.sidebar__link--active {
  color: var(--text-primary);

  background:
    linear-gradient(
      90deg,
      var(--cyan-soft),
      transparent
    );
}

.sidebar__link--active::before {
  content: '';

  position: absolute;

  left: 0;
  top: 10px;
  bottom: 10px;

  width: 2px;

  border-radius: 999px;

  background:
    var(--cyan-400);
}

.sidebar__link-text {
  font-family: var(--font-display);

  font-size: 0.94rem;
  font-weight: 650;

  line-height: 1;
}


/* ================================================================
   LINK INDICATOR
   ================================================================ */

.sidebar__link-indicator {
  position: absolute;

  right: 1rem;

  width: 0;
  height: 1px;

  background:
    var(--cyan-text);

  opacity: 0;

  transition:
    width 0.2s ease,
    opacity 0.2s ease;
}

.sidebar__link:hover
.sidebar__link-indicator,
.sidebar__link--active
.sidebar__link-indicator {
  width: 14px;
  opacity: 0.7;
}


/* ================================================================
   BOTTOM
   ================================================================ */

.sidebar__bottom {
  flex: 0 0 auto;

  padding: 0.9rem 1rem 1rem;

  border-top:
    1px solid var(--border-soft);
}


/* ================================================================
   THEME BUTTON
   ================================================================ */

.sidebar__theme {
  width: 100%;

  min-height: 48px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 1rem;

  padding: 0 0.8rem;

  border: 1px solid var(--border-color);
  border-radius: 10px;

  background: transparent;

  color: var(--text-primary);

  cursor: pointer;

  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
}

.sidebar__theme:hover {
  background:
    var(--surface-bg-soft);

  border-color:
    var(--cyan-text);
}

.sidebar__theme:focus-visible {
  outline: 2px solid var(--cyan-400);
  outline-offset: 3px;
}

.sidebar__theme-content {
  display: flex;
  align-items: center;

  gap: 0.65rem;
}

.sidebar__theme-icon {
  width: 28px;
  height: 28px;

  display: grid;
  place-items: center;

  border-radius: 8px;

  background:
    var(--surface-bg-soft);

  color:
    var(--cyan-text);
}

.sidebar__theme-icon svg {
  width: 16px;
  height: 16px;

  fill: none;

  stroke: currentColor;

  stroke-width: 1.8;

  stroke-linecap: round;
  stroke-linejoin: round;
}

.sidebar__theme-label {
  color: var(--text-secondary);

  font-family: var(--font-display);

  font-size: 0.78rem;
  font-weight: 650;
}


/* ================================================================
   THEME SWITCH
   ================================================================ */

.sidebar__switch {
  position: relative;

  width: 38px;
  height: 22px;

  flex: 0 0 38px;

  padding: 2px;

  border-radius: 999px;

  background:
    var(--border-color);

  transition:
    background-color 0.2s ease;
}

.sidebar__switch--light {
  background:
    var(--cyan-600);
}

.sidebar__switch-thumb {
  display: block;

  width: 18px;
  height: 18px;

  border-radius: 50%;

  background: #fff;

  box-shadow:
    0 1px 4px rgba(0, 0, 0, 0.22);

  transform: translateX(0);

  transition:
    transform 0.2s ease;
}

.sidebar__switch--light
.sidebar__switch-thumb {
  transform:
    translateX(16px);
}


/* ================================================================
   CTA
   ================================================================ */

.sidebar__cta {
  width: 100%;

  min-height: 52px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 0.6rem;

  padding: 0 1rem;

  border-radius: 10px;

  background:
    var(--cyan-400);

  color:
    var(--navy-950);

  font-family: var(--font-display);

  font-size: 0.82rem;
  font-weight: 800;

  text-decoration: none;

  transition:
    transform 0.2s ease,
    filter 0.2s ease,
    box-shadow 0.2s ease;
}

.sidebar__cta:hover {
  transform: translateY(-1px);

  filter: brightness(1.04);

  box-shadow:
    0 8px 24px rgba(56, 221, 220, 0.2);
}

.sidebar__cta:active {
  transform: translateY(0);
}

.sidebar__cta-arrow {
  font-size: 1.05rem;

  transition:
    transform 0.2s ease;
}

.sidebar__cta:hover
.sidebar__cta-arrow {
  transform: translateX(3px);
}


/* ================================================================
   CONTACT
   ================================================================ */

.sidebar__contact {
  display: flex;
  flex-direction: column;

  gap: 0.25rem;

  margin-top: 1rem;

  padding-top: 0.9rem;

  border-top:
    1px solid var(--border-soft);
}

.sidebar__contact-label {
  margin-bottom: 0.15rem;

  color:
    var(--text-muted);

  font-size: 0.58rem;
  font-weight: 700;

  letter-spacing: 0.13em;

  text-transform: uppercase;
}

.sidebar__contact a {
  width: fit-content;

  color:
    var(--text-secondary);

  font-size: 0.72rem;

  text-decoration: none;

  transition:
    color 0.2s ease;
}

.sidebar__contact a:hover {
  color:
    var(--cyan-text);
}


/* ================================================================
   COPYRIGHT
   ================================================================ */

.sidebar__copyright {
  margin-top: 0.8rem;

  color:
    var(--text-muted);

  font-size: 0.6rem;
}


/* ================================================================
   SIDEBAR ANIMATION
   ================================================================ */

.sidebar-enter-active,
.sidebar-leave-active {
  transition:
    transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.2s ease;
}

.sidebar-enter-from,
.sidebar-leave-to {
  opacity: 0;

  transform:
    translateX(calc(100% + 20px));
}


/* ================================================================
   BACKDROP ANIMATION
   ================================================================ */

.sidebar-backdrop-enter-active,
.sidebar-backdrop-leave-active {
  transition:
    opacity 0.25s ease;
}

.sidebar-backdrop-enter-from,
.sidebar-backdrop-leave-to {
  opacity: 0;
}


/* ================================================================
   TABLET
   ================================================================ */

@media (max-width: 1099px) {
  .sidebar {
    width: min(
      390px,
      calc(100vw - 24px)
    );
  }
}


/* ================================================================
   MOBILE
   ================================================================ */

@media (max-width: 600px) {
  .sidebar {
    top: 8px;
    right: 8px;
    bottom: 8px;

    width: min(
      350px,
      calc(100vw - 16px)
    );

    border-radius: 18px;
  }

  .sidebar__header {
    min-height: 70px;

    padding-inline: 0.9rem;
  }

  .sidebar__brand-mark {
    width: 38px;
    height: 38px;

    flex-basis: 38px;
  }

  .sidebar__brand-name {
    font-size: 0.95rem;
  }

  .sidebar__nav {
    padding: 0.7rem;
  }

  .sidebar__link {
    min-height: 52px;
  }

  .sidebar__bottom {
    padding:
      0.8rem
      0.9rem
      0.9rem;
  }
}


/* ================================================================
   SMALL PHONES

   Still a RIGHT SIDEBAR.
   Never becomes full-screen.
   ================================================================ */

@media (max-width: 380px) {
  .sidebar {
    top: 6px;
    right: 6px;
    bottom: 6px;

    width: calc(100vw - 12px);

    max-width: 350px;

    border-radius: 16px;
  }

  .sidebar__brand-sub {
    display: none;
  }

  .sidebar__link {
    min-height: 50px;
  }

  .sidebar__contact {
    display: none;
  }

  .sidebar__copyright {
    margin-top: 0.65rem;
  }
}


/* ================================================================
   LANDSCAPE / SHORT SCREENS

   Keeps the sidebar usable without affecting the page.
   ================================================================ */

@media (max-height: 620px) {
  .sidebar__header {
    min-height: 64px;

    padding-block: 0.65rem;
  }

  .sidebar__nav {
    padding-block: 0.45rem;
  }

  .sidebar__link {
    min-height: 46px;
  }

  .sidebar__bottom {
    padding-block: 0.65rem;
  }

  .sidebar__theme {
    min-height: 44px;
  }

  .sidebar__cta {
    min-height: 46px;
  }

  .sidebar__contact {
    margin-top: 0.7rem;
    padding-top: 0.65rem;
  }

  .sidebar__copyright {
    margin-top: 0.55rem;
  }
}


/* ================================================================
   REDUCED MOTION
   ================================================================ */

@media (prefers-reduced-motion: reduce) {
  .sidebar,
  .sidebar *,
  .sidebar-backdrop {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}

</style>