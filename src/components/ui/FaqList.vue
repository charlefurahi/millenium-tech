<script setup lang="ts">
import type { Faq } from '@/data/services'
defineProps<{ items: Faq[] }>()
</script>

<template>
  <div class="faq">
    <details v-for="item in items" :key="item.q">
      <summary>
        <span>{{ item.q }}</span>
        <span class="faq__icon" aria-hidden="true"></span>
      </summary>
      <p>{{ item.a }}</p>
    </details>
  </div>
</template>

<style scoped>
.faq {
  display: grid;
  gap: 0.75rem;
}
details {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: var(--radius-m);
  transition: border-color 0.2s, box-shadow 0.2s;
}
details[open] {
  border-color: var(--blue-500);
  box-shadow: var(--shadow-s);
}
summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.05rem 1.25rem;
  min-height: 56px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.02rem;
  cursor: pointer;
  list-style: none;
}
summary::-webkit-details-marker {
  display: none;
}
.faq__icon {
  position: relative;
  flex: none;
  width: 22px;
  height: 22px;
}
.faq__icon::before,
.faq__icon::after {
  content: '';
  position: absolute;
  inset: 0;
  margin: auto;
  width: 14px;
  height: 2px;
  background: var(--blue-700);
  border-radius: 2px;
  transition: transform 0.25s var(--ease);
}
.faq__icon::after {
  transform: rotate(90deg);
}
details[open] .faq__icon::after {
  transform: rotate(0);
}
details p {
  padding: 0 1.25rem 1.2rem;
  color: var(--ink-2);
  max-width: 68ch;
}
</style>
