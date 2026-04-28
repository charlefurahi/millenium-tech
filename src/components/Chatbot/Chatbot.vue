<template>
  <div class="millebot-root">
    <transition name="fade">
      <ChatWindow
        v-if="open"
        :messages="messages"
        :loading="loading"
        @send="onSend"
        @close="open = false"
      />
    </transition>

    <button
      class="fab"
      :class="{ open }"
      @click="toggle"
      :aria-label="open ? 'Close chat' : 'Open chat'"
    >
      <span v-if="!open">💬</span>
      <span v-else>✕</span>
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ChatWindow from "./ChatWindow.vue";
import { sendMessage } from "../../services/chatbotService.js";

const open = ref(false);
const loading = ref(false);
const messages = ref([
  {
    role: "bot",
    text: "Hi 👋 I'm MilleBot from Millenium Tech. How can I help you today? (Karibu! Naweza kukusaidiaje?)",
  },
]);

function toggle() { open.value = !open.value; }

async function onSend(text) {
  messages.value.push({ role: "user", text });
  loading.value = true;
  try {
    const data = await sendMessage(text);
    messages.value.push({ role: "bot", text: data.response });
  } catch (e) {
    messages.value.push({
      role: "bot",
      text: "⚠️ Sorry, I couldn't reach the server. Please try again.",
    });
    console.error(e);
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.millebot-root {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
}

.fab {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: white;
  background: linear-gradient(135deg, #4f8cff, #2f6dfc);
  box-shadow: 0 10px 24px rgba(47, 109, 252, 0.45);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.fab:hover { transform: scale(1.08); }
.fab.open  { background: linear-gradient(135deg, #ef4444, #dc2626); }

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
