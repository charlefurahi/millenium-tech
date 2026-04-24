<template>
  <div class="app-wrapper">
    <NavBar />
    <main>
      <router-view v-slot="{ Component, route }">
        <transition name="page" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import FooterSection from '@/components/FooterSection.vue'
</script>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
main {
  flex: 1;
}
</style>
