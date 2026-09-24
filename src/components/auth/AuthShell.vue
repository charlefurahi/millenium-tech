<script setup lang="ts">
/**
 * Standalone layout for login / register / password pages and the account area.
 *
 * Deliberately NOT built from the site chrome: no hero banner, no navbar and
 * no footer columns. The only footer content is the copyright line.
 */
import Icon from '@/components/ui/Icon.vue'
import ThemeToggle from '@/components/ui/ThemeToggle.vue'
import monogram from '@/assets/img/monogram-white.png'
import '@/styles/auth.css'

withDefaults(defineProps<{ title: string; subtitle?: string; wide?: boolean }>(), {
  subtitle: '',
  wide: false
})

const year = new Date().getFullYear()
</script>

<template>
  <div class="auth">
    <div class="auth__glow" aria-hidden="true"></div>

    <header class="auth__top">
      <router-link to="/" class="auth__brand" aria-label="Millenium Tech — home">
        <span class="auth__mark"><img :src="monogram" alt="" width="34" height="23" /></span>
        <span class="auth__name">Millenium <b>Tech</b></span>
      </router-link>
      <div class="auth__top-actions">
        <router-link to="/" class="auth__back"><Icon name="arrow-left" :size="16" /><span>Back to website</span></router-link>
        <ThemeToggle />
      </div>
    </header>

    <div class="auth__main">
      <div class="auth__card" :class="{ 'auth__card--wide': wide }">
        <div class="auth__head">
          <h1>{{ title }}</h1>
          <p v-if="subtitle">{{ subtitle }}</p>
        </div>
        <slot />
      </div>
      <div v-if="$slots.below" class="auth__below"><slot name="below" /></div>
    </div>

    <footer class="auth__foot">
      <p>© {{ year }} Millenium Tech. All rights reserved.</p>
    </footer>
  </div>
</template>
