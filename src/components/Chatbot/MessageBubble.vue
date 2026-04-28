<template>
  <div :class="['bubble-row', role]">
    <div class="bubble">
      <span class="text">{{ text }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  role: { type: String, required: true }, // 'user' | 'bot'
  text: { type: String, required: true },
});
</script>

<style scoped>
.bubble-row {
  display: flex;
  margin: 6px 0;
}
.bubble-row.user { justify-content: flex-end; }
.bubble-row.bot  { justify-content: flex-start; }

.bubble {
  max-width: 78%;
  padding: 10px 14px;
  border-radius: 14px;
  font-size: 14px;
  line-height: 1.4;
  white-space: pre-wrap;
  word-wrap: break-word;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}
.user .bubble {
  background: linear-gradient(135deg, #4f8cff, #2f6dfc);
  color: #fff;
  border-bottom-right-radius: 4px;
}
.bot .bubble {
  background: #1f2937;
  color: #e5e7eb;
  border-bottom-left-radius: 4px;
}
</style>
