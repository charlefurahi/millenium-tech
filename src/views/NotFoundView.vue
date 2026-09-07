<template>
  <div class="not-found noise">

    <!-- =====================================================
         BACKGROUND
    ====================================================== -->

    <div class="nf__orb nf__orb--1"></div>
    <div class="nf__orb nf__orb--2"></div>
    <div class="nf__orb nf__orb--3"></div>

    <div class="nf__grid" aria-hidden="true">

      <div
        v-for="n in 8"
        :key="n"
        class="nf__grid-line"
        :style="{
          animationDelay: `${n * 0.12}s`
        }"
      ></div>

    </div>

    <!-- =====================================================
         CONTENT
    ====================================================== -->

    <main class="nf__inner">

      <!-- 404 -->

      <div
        class="nf__code-wrap animate-fade-up"
        aria-hidden="true"
      >

        <span
          class="nf__code"
          data-text="404"
        >
          404
        </span>

      </div>

      <!-- ICON -->

      <div
        class="
          nf__icon-ring
          animate-scale-in
          delay-100
        "
      >

        <div class="nf__icon-inner animate-float">

          <svg
            width="42"
            height="42"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            aria-hidden="true"
          >

            <circle
              cx="11"
              cy="11"
              r="8"
            />

            <path
              d="M21 21l-4.35-4.35"
            />

            <path
              d="M11 8v3M11 14h.01"
              stroke-linecap="round"
            />

          </svg>

        </div>

      </div>

      <!-- TEXT -->

      <div
        class="
          nf__copy
          animate-fade-up
          delay-200
        "
      >

        <span class="nf__eyebrow">
          ERROR 404
        </span>

        <h1 class="nf__title">

          Page Not

          <span class="gradient-text">
            Found
          </span>

        </h1>

        <p class="nf__subtitle">

          Looks like this page took a wrong turn
          somewhere in Tanzania.

          <br />

          Let's get you back on track.

        </p>

      </div>

      <!-- ACTIONS -->

      <div
        class="
          nf__actions
          animate-fade-up
          delay-300
        "
      >

        <router-link
          to="/"
          class="btn btn-primary nf__primary-action"
        >

          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            aria-hidden="true"
          >

            <path
              d="
                M3 9
                l9-7
                9 7
                v11
                a2 2 0 01-2 2
                H5
                a2 2 0 01-2-2
                z
              "
            />

            <polyline
              points="
                9 22
                9 12
                15 12
                15 22
              "
            />

          </svg>

          <span>
            Back to Home
          </span>

        </router-link>

        <router-link
          to="/contact"
          class="btn btn-outline nf__secondary-action"
        >
          Contact Support
        </router-link>

      </div>

      <!-- QUICK NAV -->

      <nav
        class="
          nf__nav
          animate-fade-up
          delay-400
        "
        aria-label="Quick navigation"
      >

        <span class="nf__nav-label">
          Or explore
        </span>

        <div class="nf__nav-links">

          <router-link
            v-for="link in quickLinks"
            :key="link.path"
            :to="link.path"
            class="nf__nav-link"
          >

            <span class="nf__nav-link-icon">
              {{ link.icon }}
            </span>

            <span>
              {{ link.label }}
            </span>

            <svg
              class="nf__nav-link-arrow"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>

          </router-link>

        </div>

      </nav>

    </main>

    <!-- =====================================================
         BRAND
    ====================================================== -->

    <div
      class="
        nf__stamp
        animate-fade-in
        delay-500
      "
    >

      <img
        src="@/assets/logo.png"
        alt="Millenium Tech"
        class="nf__stamp-logo"
      />

      <span class="nf__stamp-name">
        Millenium<span>Tech</span>
      </span>

    </div>

  </div>
</template>

<script setup lang="ts">

const quickLinks = [
  {
    path: '/services',
    label: 'Services',
    icon: '⚙️'
  },
  {
    path: '/portfolio',
    label: 'Portfolio',
    icon: '🎨'
  },
  {
    path: '/about',
    label: 'About Us',
    icon: '👋'
  }
]

</script>

<style scoped>

/* =========================================================
   PAGE
========================================================= */

.not-found {
  position: relative;

  min-height: 100vh;

  display: flex;

  align-items: center;
  justify-content: center;

  padding:
    6.5rem
    1.5rem
    6rem;

  overflow: hidden;

  background:
    var(--bg-primary);

  color:
    var(--text-primary);

  text-align: center;
}

/* =========================================================
   BACKGROUND ORBS
========================================================= */

.nf__orb {
  position: absolute;

  border-radius: 50%;

  pointer-events: none;

  filter: blur(2px);
}

.nf__orb--1 {
  width: 720px;
  height: 720px;

  top: 50%;
  left: 50%;

  transform:
    translate(-50%, -50%);

  background:
    radial-gradient(
      circle,
      var(--cyan-soft),
      transparent 68%
    );
}

.nf__orb--2 {
  width: 420px;
  height: 420px;

  top: -120px;
  right: -100px;

  background:
    radial-gradient(
      circle,
      var(--gold-soft),
      transparent 70%
    );
}

.nf__orb--3 {
  width: 360px;
  height: 360px;

  left: -100px;
  bottom: -100px;

  background:
    radial-gradient(
      circle,
      var(--surface-bg-strong),
      transparent 70%
    );
}

/* =========================================================
   BACKGROUND GRID
========================================================= */

.nf__grid {
  position: absolute;

  inset: 0;

  display: flex;

  justify-content:
    space-around;

  pointer-events: none;

  opacity: 0.5;
}

.nf__grid-line {
  width: 1px;
  height: 100%;

  background:
    linear-gradient(
      to bottom,
      transparent,
      var(--cyan-soft) 40%,
      var(--cyan-soft) 60%,
      transparent
    );

  animation:
    fadeIn
    1.2s
    var(--ease-out)
    both;
}

/* =========================================================
   CONTENT
========================================================= */

.nf__inner {
  position: relative;

  z-index: 2;

  width: 100%;

  max-width: 760px;

  display: flex;

  flex-direction: column;

  align-items: center;
}

/* =========================================================
   404 NUMBER
========================================================= */

.nf__code-wrap {
  position: relative;

  margin-bottom: 0.5rem;

  line-height: 0.85;
}

.nf__code {
  position: relative;

  display: block;

  font-family:
    var(--font-display);

  font-size:
    clamp(
      7rem,
      20vw,
      12.5rem
    );

  font-weight: 900;

  letter-spacing: -0.075em;

  line-height: 0.85;

  color: transparent;

  background:
    linear-gradient(
      135deg,
      var(--cyan-text),
      var(--cyan-400) 45%,
      var(--gold-text)
    );

  -webkit-background-clip: text;
  background-clip: text;

  user-select: none;

  filter:
    drop-shadow(
      0 12px 35px
      var(--cyan-soft)
    );
}

/* subtle offset duplicate */

.nf__code::before {
  content:
    attr(data-text);

  position: absolute;

  inset: 0;

  color: transparent;

  -webkit-text-stroke:
    1px var(--cyan-soft);

  transform:
    translate(5px, 4px);

  opacity: 0.5;

  z-index: -1;
}

/* =========================================================
   ICON
========================================================= */

.nf__icon-ring {
  width: 88px;
  height: 88px;

  display: flex;

  align-items: center;
  justify-content: center;

  margin-bottom: 1.75rem;

  border-radius: 50%;

  background:
    var(--cyan-soft);

  border:
    1px solid
    var(--cyan-glow-strong);

  color:
    var(--cyan-text);

  box-shadow:
    0 0 0 8px
    var(--cyan-soft),
    0 0 45px
    var(--cyan-soft);

  animation:
    pulse-cyan
    3s
    infinite;
}

.nf__icon-inner {
  display: flex;

  align-items: center;
  justify-content: center;
}

/* =========================================================
   COPY
========================================================= */

.nf__copy {
  display: flex;

  flex-direction: column;

  align-items: center;
}

.nf__eyebrow {
  margin-bottom: 0.65rem;

  color:
    var(--cyan-text);

  font-family:
    var(--font-display);

  font-size: 0.68rem;

  font-weight: 800;

  letter-spacing: 0.18em;

  text-transform: uppercase;
}

.nf__title {
  margin:
    0 0 1rem;

  color:
    var(--text-primary);

  font-family:
    var(--font-display);

  font-size:
    clamp(
      2rem,
      5vw,
      3.1rem
    );

  font-weight: 800;

  line-height: 1.1;

  letter-spacing: -0.035em;
}

.nf__subtitle {
  max-width: 500px;

  margin:
    0 0 2.25rem;

  color:
    var(--text-secondary);

  font-size:
    clamp(
      0.88rem,
      2vw,
      1rem
    );

  line-height: 1.8;
}

/* =========================================================
   ACTIONS
========================================================= */

.nf__actions {
  display: flex;

  align-items: center;
  justify-content: center;

  flex-wrap: wrap;

  gap: 0.8rem;

  margin-bottom: 2.75rem;
}

.nf__primary-action,
.nf__secondary-action {
  min-height: 44px;
}

.nf__secondary-action {
  border-color:
    var(--border-color);

  color:
    var(--text-primary);
}

.nf__secondary-action:hover {
  border-color:
    var(--cyan-text);

  background:
    var(--cyan-soft);

  color:
    var(--cyan-text);
}

/* =========================================================
   QUICK NAV
========================================================= */

.nf__nav {
  width: 100%;

  padding-top: 2rem;

  border-top:
    1px solid
    var(--border-soft);
}

.nf__nav-label {
  display: block;

  margin-bottom: 0.9rem;

  color:
    var(--text-subtle);

  font-family:
    var(--font-display);

  font-size: 0.68rem;

  font-weight: 700;

  letter-spacing: 0.14em;

  text-transform: uppercase;
}

.nf__nav-links {
  display: flex;

  align-items: center;
  justify-content: center;

  flex-wrap: wrap;

  gap: 0.65rem;
}

.nf__nav-link {
  display: inline-flex;

  align-items: center;

  gap: 0.45rem;

  min-height: 38px;

  padding:
    0.45rem 0.8rem;

  border:
    1px solid
    var(--border-soft);

  border-radius:
    var(--radius-pill);

  background:
    var(--surface-bg-soft);

  color:
    var(--text-secondary);

  font-family:
    var(--font-display);

  font-size: 0.74rem;

  font-weight: 650;

  text-decoration: none;

  transition:
    transform var(--transition-base),
    background-color var(--transition-base),
    border-color var(--transition-base),
    color var(--transition-base);
}

.nf__nav-link:hover {
  transform:
    translateY(-2px);

  background:
    var(--cyan-soft);

  border-color:
    var(--cyan-text);

  color:
    var(--cyan-text);
}

.nf__nav-link-icon {
  font-size: 0.9rem;
}

.nf__nav-link-arrow {
  opacity: 0.5;

  transition:
    transform var(--transition-fast),
    opacity var(--transition-fast);
}

.nf__nav-link:hover
.nf__nav-link-arrow {
  opacity: 1;

  transform:
    translateX(2px);
}

/* =========================================================
   BRAND
========================================================= */

.nf__stamp {
  position: absolute;

  z-index: 3;

  left: 50%;
  bottom: 1.75rem;

  transform:
    translateX(-50%);

  display: flex;

  align-items: center;

  gap: 0.5rem;

  white-space: nowrap;
}

.nf__stamp-logo {
  width: 25px;
  height: 25px;

  object-fit: contain;

  opacity: 0.55;
}

.nf__stamp-name {
  color:
    var(--text-subtle);

  font-family:
    var(--font-display);

  font-size: 0.8rem;

  font-weight: 750;
}

.nf__stamp-name span {
  color:
    var(--cyan-text);
}

/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 600px) {

  .not-found {
    min-height: 100svh;

    padding:
      5.5rem
      1rem
      5rem;
  }

  .nf__code-wrap {
    margin-bottom: 0.25rem;
  }

  .nf__icon-ring {
    width: 76px;
    height: 76px;

    margin-bottom: 1.5rem;
  }

  .nf__subtitle {
    margin-bottom: 2rem;
  }

  .nf__subtitle br {
    display: none;
  }

  .nf__actions {
    width: 100%;

    flex-direction: column;

    margin-bottom: 2.25rem;
  }

  .nf__primary-action,
  .nf__secondary-action {
    width: 100%;

    justify-content: center;
  }

  .nf__nav {
    padding-top: 1.75rem;
  }

  .nf__nav-links {
    gap: 0.5rem;
  }

  .nf__nav-link {
    flex: 1 1 auto;

    justify-content: center;
  }

  .nf__stamp {
    bottom: 1.1rem;
  }

}

/* =========================================================
   VERY SMALL SCREENS
========================================================= */

@media (max-width: 380px) {

  .nf__code {
    font-size: 6.5rem;
  }

  .nf__nav-links {
    flex-direction: column;

    width: 100%;
  }

  .nf__nav-link {
    width: 100%;
  }

}

/* =========================================================
   REDUCED MOTION
========================================================= */

@media (prefers-reduced-motion: reduce) {

  .nf__grid-line,
  .nf__icon-ring,
  .nf__code {
    animation: none;
  }

}

</style>