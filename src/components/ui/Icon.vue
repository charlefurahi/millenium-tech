<script setup lang="ts">
import { computed } from 'vue'
import { brandIcons, lineIcons, type IconName } from './icons'

const props = withDefaults(defineProps<{ name: IconName; size?: number; stroke?: number }>(), {
  size: 20,
  stroke: 2
})

const isBrand = computed(() => props.name in brandIcons)
const markup = computed(() =>
  isBrand.value ? '' : (lineIcons[props.name as keyof typeof lineIcons] as string)
)
const brandPath = computed(() => (isBrand.value ? brandIcons[props.name as keyof typeof brandIcons] : ''))
</script>

<template>
  <svg
    v-if="isBrand"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path :d="brandPath" />
  </svg>
  <svg
    v-else
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="stroke"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
    v-html="markup"
  ></svg>
</template>
