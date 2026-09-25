<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Icon from '@/components/ui/Icon.vue'
import { useRoute } from 'vue-router'
import ThemeToggle from '@/components/ui/ThemeToggle.vue'
import monogram from '@/assets/img/monogram-white.png'
import { site } from '@/config/site'
import { useAuth } from '@/composables/useAuth'

const route = useRoute()
const { state: auth } = useAuth()

const props = withDefaults(defineProps<{ open?: boolean }>(), { open: false })
const emit = defineEmits<{ 'toggle-menu': [] }>()
const scrolled = ref(false)

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/solutions', label: 'Solutions' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/pricing', label: 'Packages' },
  { to: '/contact', label: 'Contact' }
]

const isActive = (to: string) =>
  to === '/'
    ? route.path === '/'
    : route.path === to || route.path.startsWith(to + '/')

const onScroll = () => {
  scrolled.value = window.scrollY > 8
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header
    class="site-header"
    :class="{ 'is-scrolled': scrolled }"
  >
    <div class="container header__inner">

      <!-- Brand -->
      <router-link
        to="/"
        class="brand"
        aria-label="Millenium Tech — home"
      >
        <span class="brand__logo-wrap">
          <img
            :src="monogram"
            alt=""
            width="44"
            height="30"
          />
        </span>

        <span class="brand__text">
          <span class="brand__name">
            Millenium <b>Tech</b>
          </span>

          <span class="brand__tag">
            {{ site.tagline }}
          </span>
        </span>
      </router-link>


      <!-- Navigation -->
      <nav
        id="primary-nav"
        class="nav"
        aria-label="Primary"
      >

        <ul class="nav__list">
          <li
            v-for="l in links"
            :key="l.to"
            class="nav__item"
          >
            <router-link
              :to="l.to"
              class="nav__link"
              :class="{ 'is-active': isActive(l.to) }"
              :aria-current="
                isActive(l.to)
                  ? 'page'
                  : undefined
              "
            >
              <span class="nav__link-text">
                {{ l.label }}
              </span>
            </router-link>
          </li>
        </ul>


        <!-- Desktop CTA -->
        <div class="nav__cta">

          <ThemeToggle
            class="nav__theme nav__theme--desktop"
          />

          <router-link
            v-if="auth.user"
            class="btn btn--outline btn--sm nav__auth"
            to="/account"
          >
            {{ auth.user.name }}
          </router-link>
          <router-link
            v-else
            class="btn btn--outline btn--sm nav__auth"
            to="/login"
          >
            Log in
          </router-link>

          <router-link
            class="btn btn--accent btn--sm nav__consultation"
            to="/contact"
            data-track="cta_click"
            data-track-label="nav_consultation"
          >
            <span>Get a free consultation</span>

            <span class="nav__cta-arrow" aria-hidden="true">
              →
            </span>
          </router-link>

        </div>


      </nav>


      <!-- Header actions: theme toggle stays visible next to the
           hamburger at all times, instead of being hidden inside
           the drawer until it's opened. -->
      <div class="header__actions">

        <ThemeToggle class="nav__theme nav__theme--header" />

        <!-- Mobile menu -->
        <button
          class="menu-btn"
          type="button"
          :aria-expanded="props.open"
          aria-controls="mobile-sidebar"
          :aria-label="props.open ? 'Close menu' : 'Open menu'"
          @click="emit('toggle-menu')"
        >
          <span class="menu-btn__icon">
            <Icon
              :name="props.open ? 'x' : 'menu'"
              :size="24"
            />
          </span>
        </button>

      </div>

    </div>
  </header>
</template>


<style scoped>

.site-header {
  position: sticky;
  top: 0;
  z-index: 50;

  height: var(--header-h);

  background:
    linear-gradient(
      180deg,
      rgba(8, 19, 34, 0.98),
      rgba(8, 19, 34, 0.96)
    );

  color: #fff;

  border-bottom: 1px solid transparent;

  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease,
    background-color 0.3s ease,
    backdrop-filter 0.3s ease;
}


/* ================================================================
   Scrolled Header
   ================================================================ */

.site-header.is-scrolled {
  border-color: rgba(255, 255, 255, 0.08);

  background:
    linear-gradient(
      180deg,
      rgba(8, 19, 34, 0.98),
      rgba(8, 19, 34, 0.94)
    );

  box-shadow:
    0 12px 35px -20px rgba(0, 0, 0, 0.8),
    0 1px 0 rgba(255, 255, 255, 0.03);
}


/* ================================================================
   Header Inner
   ================================================================ */

.header__inner {
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 1.5rem;
}


/* ================================================================
   Brand
   ================================================================ */

.brand {
  position: relative;

  display: flex;
  align-items: center;

  gap: 0.75rem;

  flex: none;

  color: inherit;
  text-decoration: none;

  border-radius: 14px;

  padding: 0.35rem 0.5rem;

  margin-left: -0.5rem;

  transition:
    background-color 0.25s ease,
    transform 0.25s ease;
}

.brand:hover {
  background: rgba(255, 255, 255, 0.035);

  transform: translateY(-1px);
}


/* Logo wrapper */

.brand__logo-wrap {
  position: relative;

  display: grid;
  place-items: center;

  width: 44px;
  height: 38px;

  border-radius: 11px;

  transition:
    background-color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.25s ease;
}

.brand__logo-wrap::after {
  content: '';

  position: absolute;
  inset: 0;

  border-radius: inherit;

  border: 1px solid transparent;

  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.brand:hover .brand__logo-wrap {
  background: rgba(56, 221, 220, 0.08);

  transform: translateY(-1px);
}

.brand:hover .brand__logo-wrap::after {
  border-color: rgba(56, 221, 220, 0.18);

  box-shadow:
    0 0 18px rgba(56, 221, 220, 0.08);
}

.brand img {
  display: block;

  width: 44px;
  height: auto;

  transition:
    transform 0.3s ease,
    filter 0.3s ease;
}

.brand:hover img {
  transform: scale(1.035);

  filter:
    drop-shadow(
      0 0 8px
      rgba(56, 221, 220, 0.16)
    );
}


/* Brand text */

.brand__text {
  display: grid;

  line-height: 1.05;
}

.brand__name {
  font-family: var(--font-display);

  font-weight: 800;

  font-size: 1.2rem;

  letter-spacing: -0.03em;

  transition: color 0.25s ease;
}

.brand:hover .brand__name {
  color: #fff;
}

.brand__name b {
  color: var(--aqua-400);

  font-weight: 800;

  transition:
    color 0.25s ease,
    text-shadow 0.25s ease;
}

.brand:hover .brand__name b {
  color: #5ce7e5;

  text-shadow:
    0 0 18px rgba(56, 221, 220, 0.18);
}

.brand__tag {
  margin-top: 4px;

  font-size: 0.62rem;
  font-weight: 700;

  letter-spacing: 0.16em;
  text-transform: uppercase;

  color: var(--on-dark-3);

  transition:
    color 0.25s ease;
}

.brand:hover .brand__tag {
  color: var(--on-dark-2);
}


/* ================================================================
   Desktop Navigation
   ================================================================ */

.nav {
  display: flex;
  align-items: center;

  gap: 1.5rem;
}

.nav__list {
  display: flex;
  align-items: center;

  gap: 0.15rem;

  list-style: none;
}


/* Individual nav item */

.nav__item {
  position: relative;
}


/* Main link */

.nav__link {
  position: relative;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-height: 44px;

  padding: 0 0.82rem;

  border-radius: 10px;

  font-family: var(--font-display);

  font-size: 0.93rem;
  font-weight: 600;

  color: var(--on-dark-2);

  text-decoration: none;

  isolation: isolate;

  transition:
    color 0.22s ease,
    background-color 0.22s ease,
    transform 0.22s ease;
}


/*
 * Soft hover background.
 * This stays behind the text.
 */

.nav__link::before {
  content: '';

  position: absolute;

  inset: 4px 0;

  z-index: -1;

  border-radius: 10px;

  background:
    linear-gradient(
      135deg,
      rgba(56, 221, 220, 0.09),
      rgba(56, 221, 220, 0.025)
    );

  opacity: 0;

  transform: scale(0.92);

  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
}


/*
 * Animated aqua line.
 */

.nav__link::after {
  content: '';

  position: absolute;

  left: 50%;
  right: auto;

  bottom: 4px;

  width: calc(100% - 1.64rem);

  height: 2px;

  border-radius: 999px;

  background:
    linear-gradient(
      90deg,
      transparent,
      var(--aqua-400),
      transparent
    );

  opacity: 0;

  transform:
    translateX(-50%)
    scaleX(0.25);

  transform-origin: center;

  box-shadow:
    0 0 10px rgba(56, 221, 220, 0.2);

  transition:
    opacity 0.25s ease,
    transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
}


/* Text layer */

.nav__link-text {
  position: relative;

  transition:
    transform 0.22s ease,
    color 0.22s ease;
}


/* Hover */

.nav__link:hover {
  color: #fff;

  transform: translateY(-1px);
}

.nav__link:hover::before {
  opacity: 1;

  transform: scale(1);
}

.nav__link:hover::after {
  opacity: 1;

  transform:
    translateX(-50%)
    scaleX(1);
}

.nav__link:hover .nav__link-text {
  transform: translateY(-0.5px);
}


/* Active */

.nav__link.is-active {
  color: #fff;
}

.nav__link.is-active::before {
  opacity: 1;

  background:
    linear-gradient(
      135deg,
      rgba(56, 221, 220, 0.11),
      rgba(56, 221, 220, 0.035)
    );

  transform: scale(1);
}

.nav__link.is-active::after {
  opacity: 1;

  transform:
    translateX(-50%)
    scaleX(1);
}


/* Active + hover */

.nav__link.is-active:hover::before {
  background:
    linear-gradient(
      135deg,
      rgba(56, 221, 220, 0.14),
      rgba(56, 221, 220, 0.045)
    );
}


/* ================================================================
   Navigation CTA
   ================================================================ */

.nav__cta {
  display: flex;
  align-items: center;

  gap: 0.75rem;
}


/* Consultation button */

.nav__consultation {
  position: relative;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  gap: 0.55rem;

  overflow: hidden;

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.nav__consultation::before {
  content: '';

  position: absolute;

  top: 0;
  bottom: 0;
  left: -80%;

  width: 55%;

  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.18),
      transparent
    );

  transform: skewX(-18deg);

  transition: left 0.55s ease;
}

.nav__consultation:hover {
  transform: translateY(-2px);

  box-shadow:
    0 10px 25px -14px rgba(56, 221, 220, 0.55);
}

.nav__consultation:hover::before {
  left: 130%;
}

.nav__cta-arrow {
  display: inline-block;

  font-size: 1.05em;

  transition:
    transform 0.25s ease;
}

.nav__consultation:hover .nav__cta-arrow {
  transform: translateX(3px);
}


/* ================================================================
   Header Actions (theme toggle + hamburger, grouped)
   ================================================================ */

.header__actions {
  display: flex;
  align-items: center;

  gap: 0.6rem;
}

.nav__theme--header {
  display: none;
}


/* ================================================================
   Mobile Menu Button
   ================================================================ */

.menu-btn {
  position: relative;

  display: none;

  place-items: center;

  width: 46px;
  height: 46px;

  padding: 0;

  border: 1px solid rgba(255, 255, 255, 0.1);

  border-radius: 12px;

  background:
    rgba(255, 255, 255, 0.025);

  color: #fff;

  cursor: pointer;

  overflow: hidden;

  transition:
    border-color 0.25s ease,
    background-color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.25s ease;
}

.menu-btn::before {
  content: '';

  position: absolute;

  inset: 0;

  background:
    radial-gradient(
      circle at center,
      rgba(56, 221, 220, 0.12),
      transparent 65%
    );

  opacity: 0;

  transition: opacity 0.25s ease;
}

.menu-btn:hover {
  border-color: rgba(56, 221, 220, 0.35);

  background:
    rgba(56, 221, 220, 0.06);

  box-shadow:
    0 0 22px rgba(56, 221, 220, 0.08);

  transform: translateY(-1px);
}

.menu-btn:hover::before {
  opacity: 1;
}

.menu-btn:active {
  transform: translateY(0) scale(0.96);
}

.menu-btn__icon {
  position: relative;
  z-index: 1;

  display: grid;
  place-items: center;

  transition:
    transform 0.25s ease;
}

.menu-btn:hover .menu-btn__icon {
  transform: scale(1.05);
}


/* ================================================================
   Tablet + Mobile Drawer
   ================================================================ */

@media (max-width: 1099px) {

  .menu-btn {
    display: grid;
  }

  .nav__theme--header {
    display: grid;
  }

  .nav {
    display: none;
  }
}


/* ================================================================
   Small Screens
   ================================================================ */

@media (max-width: 599px) {

  .header__inner {
    gap: 0.75rem;
  }


  .brand {
    gap: 0.55rem;
  }


  .brand__logo-wrap {
    width: 40px;
    height: 36px;
  }


  .brand img {
    width: 40px;
  }


  .brand__name {
    font-size: 1.08rem;
  }


  .brand__tag {
    font-size: 0.56rem;

    letter-spacing: 0.12em;
  }


  .menu-btn {
    width: 44px;
    height: 44px;
  }
}


/* ================================================================
   Reduced Motion
   ================================================================ */

@media (prefers-reduced-motion: reduce) {

  .site-header,
  .brand,
  .brand img,
  .brand__logo-wrap,
  .brand__name,
  .brand__name b,
  .brand__tag,
  .nav__link,
  .nav__link::before,
  .nav__link::after,
  .nav__link-text,
  .nav__consultation,
  .nav__consultation::before,
  .nav__cta-arrow,
  .menu-btn,
  .menu-btn::before,
  .menu-btn__icon {
    transition: none !important;
  }
}

</style>