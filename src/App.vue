<template>
  <div class="app-wrapper">
    <!-- Navigation -->
    <NavBar />

    <!-- Main application content -->
    <main class="app-main">
      <router-view v-slot="{ Component, route }">
        <transition name="page" mode="out-in">
          <component
            :is="Component"
            :key="route.fullPath"
          />
        </transition>
      </router-view>
    </main>

    <!-- Footer -->
    <FooterSection />

    <!-- Global floating assistant -->
    <Chatbot />
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import FooterSection from '@/components/FooterSection.vue'
import Chatbot from '@/components/Chatbot/Chatbot.vue'
</script>

<style scoped>
/* --------------------------------------------------
   Application shell
-------------------------------------------------- */

.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  background: var(--navy-950);

  /*
   * Prevent small horizontal shifts caused by
   * overflowing elements on individual pages.
   */
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
}

/* --------------------------------------------------
   Main content
-------------------------------------------------- */

.app-main {
  flex: 1;
  position: relative;
  width: 100%;
  min-width: 0;
  overflow-x: clip;
}

/* --------------------------------------------------
   Page transition
   Subtle rather than exaggerated.
-------------------------------------------------- */

.page-enter-active,
.page-leave-active {
  transition:
    opacity 220ms ease,
    transform 220ms ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* --------------------------------------------------
   Accessibility
-------------------------------------------------- */

@media (prefers-reduced-motion: reduce) {
  .page-enter-active,
  .page-leave-active {
    transition: opacity 120ms ease;
  }

  .page-enter-from,
  .page-leave-to {
    transform: none;
  }
}
</style>
