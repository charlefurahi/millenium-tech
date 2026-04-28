<template>
  <form class="chat-input" @submit.prevent="submit">
    <input
      v-model="text"
      type="text"
      :placeholder="disabled ? 'MilleBot is typing…' : 'Type a message…'"
      :disabled="disabled"
      autocomplete="off"
    />
    <button type="submit" :disabled="disabled || !text.trim()">➤</button>
  </form>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  disabled: { type: Boolean, default: false },
});
const emit = defineEmits(["send"]);

const text = ref("");

function submit() {
  const v = text.value.trim();
  if (!v || props.disabled) return;
  emit("send", v);
  text.value = "";
}
</script>

<style scoped>
.chat-input {
  display: flex;
  gap: 8px;
  padding: 10px;
  border-top: 1px solid #2a3142;
  background: #0f1525;
}
input {
  flex: 1;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #2a3142;
  background: #131a2c;
  color: #e5e7eb;
  outline: none;
  font-size: 14px;
}
input:focus { border-color: #4f8cff; }
button {
  border: none;
  background: linear-gradient(135deg, #4f8cff, #2f6dfc);
  color: white;
  padding: 0 16px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  transition: transform 0.15s ease;
}
button:disabled { opacity: 0.5; cursor: not-allowed; }
button:not(:disabled):hover { transform: scale(1.05); }
</style>
