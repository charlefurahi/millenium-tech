<script setup lang="ts">
withDefaults(defineProps<{ eyebrow?: string; title: string; lead?: string; center?: boolean; level?: 1 | 2 }>(), {
  level: 2
})
</script>

<template>
  <header class="section-head" :class="{ 'section-head--center': center }" v-reveal>
    <span v-if="eyebrow" class="eyebrow">{{ eyebrow }}</span>
    <component :is="`h${level}`">{{ title }}</component>
    <p v-if="lead">{{ lead }}</p>
    <slot />
  </header>
</template>
