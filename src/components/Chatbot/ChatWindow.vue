<template>
  <div class="chat-window">
    <header class="chat-header">
      <div class="title">
        <span class="dot"></span>
        <div>
          <strong>MilleBot</strong>
          <small>Millenium Tech Assistant</small>
        </div>
      </div>
      <button class="close-btn" @click="$emit('close')">✕</button>
    </header>

    <div ref="scrollArea" class="messages">
      <MessageBubble
        v-for="(m, i) in messages"
        :key="i"
        :role="m.role"
        :text="m.text"
      />
      <div v-if="loading" class="bubble-row bot">
        <div class="bubble typing">
          <span></span><span></span><span></span>
        </div>
      </div>
    </div>

    <ChatInput :disabled="loading" @send="$emit('send', $event)" />
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import MessageBubble from "./MessageBubble.vue";
import ChatInput from "./ChatInput.vue";

const props = defineProps({
  messages: { type: Array, required: true },
  loading: { type: Boolean, default: false },
});
defineEmits(["send", "close"]);

const scrollArea = ref(null);

watch(
  () => [props.messages.length, props.loading],
  async () => {
    await nextTick();
    if (scrollArea.value) {
      scrollArea.value.scrollTop = scrollArea.value.scrollHeight;
    }
  }
);
</script>

<style scoped>
.chat-window {
  width: 360px;
  height: 520px;
  background: #0b1020;
  border: 1px solid #2a3142;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0,0,0,0.4);
  animation: pop 0.22s ease-out;
}
@keyframes pop {
  from { opacity: 0; transform: translateY(12px) scale(0.96); }
  to   { opacity: 1; transform: translateY(0)    scale(1); }
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  background: linear-gradient(135deg, #1a2240, #0f1525);
  border-bottom: 1px solid #2a3142;
  color: #fff;
}
.title { display: flex; align-items: center; gap: 10px; }
.title small { display: block; color: #94a3b8; font-size: 11px; }
.dot {
  width: 10px; height: 10px; border-radius: 50%;
  background: #22c55e; box-shadow: 0 0 8px #22c55e;
}
.close-btn {
  background: transparent; color: #cbd5e1; border: none;
  font-size: 18px; cursor: pointer;
}
.close-btn:hover { color: #fff; }

.messages {
  flex: 1;
  padding: 12px;
  overflow-y: auto;
  background: #0b1020;
}

.bubble-row { display: flex; margin: 6px 0; }
.bubble-row.bot { justify-content: flex-start; }
.bubble.typing {
  background: #1f2937; padding: 12px 14px; border-radius: 14px;
  display: inline-flex; gap: 4px;
}
.bubble.typing span {
  width: 6px; height: 6px; border-radius: 50%; background: #94a3b8;
  animation: blink 1.2s infinite ease-in-out;
}
.bubble.typing span:nth-child(2) { animation-delay: 0.2s; }
.bubble.typing span:nth-child(3) { animation-delay: 0.4s; }
@keyframes blink {
  0%, 80%, 100% { opacity: 0.3; transform: translateY(0); }
  40%           { opacity: 1;   transform: translateY(-3px); }
}

@media (max-width: 480px) {
  .chat-window {
    width: 92vw;
    height: 70vh;
  }
}
</style>
