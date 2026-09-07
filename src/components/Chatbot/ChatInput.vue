<template>
  <form class="chat-input" @submit.prevent="submit">
    <input
      ref="inputEl"
      v-model="text"
      type="text"
      class="chat-input__field"
      placeholder="Type a message…"
      autocomplete="off"
      :disabled="disabled"
      @keydown.enter.exact.prevent="submit"
    />

    <button
      type="submit"
      class="chat-input__send"
      :disabled="disabled || !text.trim()"
      aria-label="Send message"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        <path d="m12 5 7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </form>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  disabled: { type: Boolean, default: false },
});

const emit = defineEmits(["send"]);

const text = ref("");
const inputEl = ref(null);

function submit() {
  const value = text.value.trim();
  if (!value) return;

  emit("send", value);
  text.value = "";
  inputEl.value?.focus();
}
</script>

<style scoped>
/* Same shared theme variables as ChatWindow.vue, so the
   input bar follows light/dark automatically. */

.chat-input {
  display: flex;
  align-items: center;
  gap: 8px;

  padding: 10px 12px;

  background: var(--surface-bg-soft, #10182b);
  border-top: 1px solid var(--border-color, #2a3142);
}

.chat-input__field {
  flex: 1;
  min-width: 0;

  height: 40px;
  padding: 0 14px;

  border: 1px solid var(--border-color, #2a3142);
  border-radius: 999px;

  background: var(--surface-bg, #0b1020);
  color: var(--text-primary, #f1f5f9);

  font-size: 0.88rem;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.chat-input__field::placeholder {
  color: var(--text-muted, #64748b);
}

.chat-input__field:focus-visible {
  outline: none;
  border-color: var(--cyan-400, #22d3ee);
  box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.18);
}

.chat-input__field:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.chat-input__send {
  display: grid;
  place-items: center;
  flex-shrink: 0;

  width: 40px;
  height: 40px;

  border: none;
  border-radius: 50%;

  background: var(--cyan-400, #22d3ee);
  color: var(--navy-950, #04121a);

  cursor: pointer;

  transition:
    transform 0.2s ease,
    opacity 0.2s ease,
    background-color 0.2s ease;
}

.chat-input__send:hover:not(:disabled) {
  transform: translateY(-1px);
}

.chat-input__send:active:not(:disabled) {
  transform: translateY(0) scale(0.94);
}

.chat-input__send:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.chat-input__send:focus-visible {
  outline: 2px solid var(--cyan-400, #22d3ee);
  outline-offset: 2px;
}
</style>