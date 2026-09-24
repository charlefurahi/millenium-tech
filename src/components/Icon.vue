<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path v-for="(path, i) in paths" :key="'p'+i" :d="path" />
    <circle v-for="(c, i) in circles" :key="'c'+i" :cx="c[0]" :cy="c[1]" :r="c[2]" />
    <rect v-for="(r, i) in rects" :key="'r'+i" :x="r[0]" :y="r[1]" :width="r[2]" :height="r[3]" :rx="r[4] || 0" />
    <line v-for="(l, i) in lines" :key="'l'+i" :x1="l[0]" :y1="l[1]" :x2="l[2]" :y2="l[3]" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  name: string
  size?: number | string
  strokeWidth?: number
}>(), { size: 20, strokeWidth: 1.8 })

const data: Record<string, { paths?: string[]; circles?: number[][]; rects?: number[][]; lines?: number[][] }> = {
  target: { circles: [[12,12,8],[12,12,3]], paths: ['M12 2v2','M12 20v2','M2 12h2','M20 12h2'] },
  handshake: { paths: ['M7 11l2-2 3 3 3-3 2 2','M3 12l4-4 3 1 2-2 4 1 5 4-3 3-4-3-3 3-3-3-3 3-2-2z'] },
  lightbulb: { paths: ['M9 18h6','M10 22h4','M8.2 14.5A7 7 0 1 1 15.8 14.5c-.9.7-1.3 1.4-1.3 2.5h-5c0-1.1-.4-1.8-1.3-2.5z'] },
  globe: { circles: [[12,12,9]], paths: ['M3 12h18','M12 3a14 14 0 0 1 0 18','M12 3a14 14 0 0 0 0 18'] },
  bolt: { paths: ['M13 2L4 14h6l-1 8 9-12h-6l1-8z'] },
  diamond: { paths: ['M12 2l9 10-9 10L3 12 12 2z','M3 12h18','M12 2l4 10-4 10-4-10 4-10z'] },
  arrow: { paths: ['M5 12h14','M12 5l7 7-7 7'] },
  check: { paths: ['M5 12l4 4L19 6'] },
  code: { paths: ['M8 8l-4 4 4 4','M16 8l4 4-4 4','M14 4l-4 16'] },
  palette: { paths: ['M12 3a9 9 0 0 0 0 18h1.5a2 2 0 0 0 0-4H12a2 2 0 0 1 0-4h4a5 5 0 0 0 0-10h-4z'], circles: [[7.5,8,0.5],[11,6.5,0.5],[15,7.5,0.5]] },
  monitor: { rects: [[3,4,18,13,2]], paths: ['M8 21h8','M12 17v4'] },
  wrench: { paths: ['M14.7 6.3a4.5 4.5 0 0 0-5.9 5.9L3 18a2 2 0 0 0 2.8 2.8l5.8-5.8a4.5 4.5 0 0 0 5.9-5.9l-2.6 2.6-2.8-.8-.8-2.8 2.6-2.6z'] },
  layers: { paths: ['M12 3l9 5-9 5-9-5 9-5z','M3 12l9 5 9-5','M3 16l9 5 9-5'] },
  users: { circles: [[9,8,3],[17,9,2]], paths: ['M3 20a6 6 0 0 1 12 0','M15 19a5 5 0 0 1 6 0'] },
  building: { rects: [[4,3,16,18,1]], paths: ['M8 21v-4h4v4','M8 7h2','M14 7h2','M8 11h2','M14 11h2'] },
  settings: { circles: [[12,12,3]], paths: ['M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2 2-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V20h-3v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-2-2 .1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H5v-3h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 2-2 .1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V5h3v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 2 2-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1v3h-.1a1.7 1.7 0 0 0-1.4.8z'] },
  search: { circles: [[11,11,7]], paths: ['M20 20l-4-4'] },
  mail: { rects: [[3,5,18,14,2]], paths: ['M3 7l9 6 9-6'] },
  phone: { paths: ['M6 3h3l2 5-2 2a14 14 0 0 0 5 5l2-2 5 2v3a2 2 0 0 1-2 2C10.3 20 4 13.7 4 6a2 2 0 0 1 2-2z'] },
  map: { paths: ['M9 18l-6 3V6l6-3 6 3 6-3v15l-6 3-6-3z','M9 3v15','M15 6v15'] },
  quote: { paths: ['M7 7h5v5H7z','M14 7h5v5h-5z','M7 12c0 4 1 5 4 5','M14 12c0 4 1 5 4 5'] },
  clock: { circles: [[12,12,9]], paths: ['M12 7v5l3 2'] },
  chevron: { paths: ['M6 9l6 6 6-6'] },
  external: { paths: ['M14 4h6v6','M20 4l-9 9','M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5'] },
  menu: { paths: ['M4 6h16','M4 12h16','M4 18h16'] },
  close: { paths: ['M6 6l12 12','M18 6L6 18'] }
}
const icon = computed(() => data[props.name] || data.layers)
const paths = computed(() => icon.value.paths || [])
const circles = computed(() => icon.value.circles || [])
const rects = computed(() => icon.value.rects || [])
const lines = computed(() => icon.value.lines || [])
</script>
