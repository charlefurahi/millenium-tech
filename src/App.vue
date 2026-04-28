<template>
  <div class="app-wrapper">
    <!-- ===== NAVIGATION ===== -->
    <NavBar />

    <!-- ===== MAIN CONTENT ===== -->
    <main class="app-main">
      <router-view v-slot="{ Component, route }">
        <transition name="page" mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </transition>
      </router-view>
    </main>

    <!-- ===== FOOTER ===== -->
    <FooterSection />

    <!-- ===== GLOBAL CHATBOT (FLOATING) ===== -->
    <Chatbot />
  </div>
</template>

<script setup lang="ts">
// ===== COMPONENT IMPORTS =====
import NavBar from '@/components/NavBar.vue'
import FooterSection from '@/components/FooterSection.vue'

// ✅ Better import path consistency
import Chatbot from '@/components/Chatbot/Chatbot.vue'
</script>

<style scoped>
/* ===== LAYOUT ===== */
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--navy-950);
}

/* ===== MAIN CONTENT AREA ===== */
.app-main {
  flex: 1;
  position: relative;
  overflow-x: hidden;
}

/* ===== PAGE TRANSITIONS ===== */
.page-enter-active,
.page-leave-active {
  transition: all 0.35s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>