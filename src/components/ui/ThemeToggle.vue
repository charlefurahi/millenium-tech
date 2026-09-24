<script setup lang="ts">
import Icon from '@/components/ui/Icon.vue'
import { useTheme } from '@/utils/theme'

withDefaults(defineProps<{ labeled?: boolean }>(), { labeled: false })

const { theme, toggleTheme } = useTheme()
</script>

<template>
  <button
    type="button"
    class="theme-toggle"
    :class="{ 'theme-toggle--labeled': labeled }"
    role="switch"
    :aria-checked="theme === 'dark'"
    :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggleTheme"
  >
    <span class="theme-toggle__icon">
      <Icon :name="theme === 'dark' ? 'moon' : 'sun'" :size="18" />
    </span>
    <span v-if="labeled">{{ theme === 'dark' ? 'Dark mode' : 'Light mode' }}</span>
  </button>
</template>

<style scoped>
.theme-toggle {
  display: inline-grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid var(--line-dark);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  color: inherit;
  transition: background-color 0.2s var(--ease), transform 0.2s var(--ease), border-color 0.2s;
}
.theme-toggle:hover {
  background: rgba(255, 255, 255, 0.14);
  transform: translateY(-1px);
}
.theme-toggle__icon {
  display: grid;
  place-items: center;
  transition: transform 0.35s var(--ease);
}
.theme-toggle[aria-checked='true'] .theme-toggle__icon {
  transform: rotate(-14deg);
}
.theme-toggle--labeled {
  width: auto;
  height: 48px;
  padding: 0 1rem;
  border-radius: var(--radius-m);
  gap: 0.6rem;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.95rem;
}
</style>
