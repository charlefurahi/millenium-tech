<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import FooterSection from '@/components/FooterSection.vue'
import FloatingActions from '@/components/FloatingActions.vue'
import Sidebar from '@/components/Sidebar.vue'

const route = useRoute()

// Login, register, password and account pages use their own standalone
// layout (AuthShell): no navbar, hero, footer columns or floating chat —
// only a copyright line. Everything else gets the full site chrome.
const isAuthLayout = computed(() => route.meta.layout === 'auth')

// Shared open/close state for the mobile Sidebar, toggled by NavBar's
// hamburger button and closed by the Sidebar itself (backdrop click,
// close button, Escape key, or picking a nav link).
const sidebarOpen = ref(false)

watch(sidebarOpen, (isOpen) => {
  document.body.classList.toggle('menu-open', isOpen)
})

// Safety net: close the sidebar on any route change, in case navigation
// happens some other way (e.g. browser back/forward) while it's open.
watch(
  () => route.fullPath,
  () => {
    sidebarOpen.value = false
  }
)
</script>

<template>
  <a class="skip-link" href="#main-content">Skip to main content</a>
  <NavBar v-if="!isAuthLayout" :open="sidebarOpen" @toggle-menu="sidebarOpen = !sidebarOpen" />
  <main id="main-content" class="app-main" :class="{ 'app-main--auth': isAuthLayout }" tabindex="-1">
    <router-view v-slot="{ Component, route: r }">
      <transition name="page" mode="out-in">
        <component :is="Component" :key="r.path" />
      </transition>
    </router-view>
  </main>
  <FooterSection v-if="!isAuthLayout" />
  <FloatingActions v-if="!isAuthLayout" />
  <Sidebar v-if="!isAuthLayout" :open="sidebarOpen" @close="sidebarOpen = false" />
</template>

<style>
.app-main {
  min-height: 60vh;
  outline: none;
  overflow-x: clip;
}
.app-main--auth {
  min-height: 100dvh;
}
.skip-link {
  position: absolute;
  left: 1rem;
  top: -100px;
  z-index: 100;
  padding: 0.7rem 1rem;
  border-radius: var(--radius-s);
  background: #fff;
  color: var(--navy-900);
  font-weight: 700;
}
.skip-link:focus {
  top: 0.75rem;
}
</style>
