<script setup lang="ts">
import { ref } from 'vue'
import Icon from '@/components/ui/Icon.vue'
import Chatbot from '@/components/Chatbot/Chatbot.vue'
import { site, waLink } from '@/config/site'

const chatOpen = ref(false)
</script>

<template>
  <div class="fab-stack">
    <div v-if="site.chatbotEnabled" class="fab-item">
      <span class="fab-tip" role="tooltip">Ask MilleBot</span>
      <button
        type="button"
        class="fab fab--chat brand-surface hex-bg"
        :class="{ 'is-open': chatOpen }"
        :aria-expanded="chatOpen"
        :aria-label="chatOpen ? 'Close chat' : 'Chat with MilleBot'"
        @click="chatOpen = !chatOpen"
      >
        <Icon :name="chatOpen ? 'x' : 'bot'" :size="24" />
      </button>
    </div>
    <div class="fab-item">
      <span class="fab-tip" role="tooltip">Chat on WhatsApp</span>
      <a
        class="fab fab--wa"
        :href="waLink()"
        target="_blank"
        rel="noopener"
        aria-label="Chat with Millenium Tech on WhatsApp"
        data-track="whatsapp_click"
        data-track-label="floating"
      >
        <Icon name="whatsapp" :size="28" />
      </a>
    </div>
  </div>
  <Chatbot v-if="site.chatbotEnabled" :open="chatOpen" @close="chatOpen = false" />
</template>

<style scoped>
.fab-stack {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 55;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
}
.fab-item {
  position: relative;
  display: flex;
  align-items: center;
}
.fab {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border: 0;
  border-radius: 50%;
  color: #fff;
  box-shadow: 0 10px 24px -8px rgba(4, 13, 32, 0.55);
  transition: transform 0.2s var(--ease), background-color 0.2s, box-shadow 0.2s;
}
.fab:hover,
.fab:focus-visible {
  transform: translateY(-2px);
}
.fab--wa {
  background: var(--green-700);
}
.fab--wa:hover {
  background: color-mix(in srgb, var(--green-700) 85%, black);
}
.fab--chat {
  border: 1px solid var(--line-dark);
  animation: fab-breathe 2.8s ease-in-out infinite;
}
.fab--chat:hover,
.fab--chat:focus-visible,
.fab--chat.is-open {
  animation-play-state: paused;
  transform: translateY(-2px) scale(1.04);
  box-shadow: 0 14px 30px -8px rgba(4, 13, 32, 0.65);
}

/* "Breathing" — a slow, gentle pulse so the launcher reads as alive
   without being distracting. Paused on hover/focus/open, and disabled
   entirely under prefers-reduced-motion (see base.css). */
@keyframes fab-breathe {
  0%,
  100% {
    transform: scale(1);
    box-shadow: 0 10px 24px -8px rgba(4, 13, 32, 0.55), 0 0 0 0 rgba(22, 191, 224, 0.35);
  }
  50% {
    transform: scale(1.055);
    box-shadow: 0 10px 24px -8px rgba(4, 13, 32, 0.55), 0 0 0 8px rgba(22, 191, 224, 0);
  }
}

/* "Ask MilleBot" tooltip — reveals on hover/focus, sits to the left of
   the button so it never drifts over the WhatsApp button underneath. */
.fab-tip {
  position: absolute;
  right: calc(100% + 12px);
  top: 50%;
  transform: translateY(-50%) translateX(6px);
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  background: var(--navy-950);
  color: #fff;
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 700;
  white-space: nowrap;
  box-shadow: var(--shadow-m);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.18s var(--ease), transform 0.18s var(--ease);
}
.fab-item:hover .fab-tip,
.fab-item:has(.fab:focus-visible) .fab-tip {
  opacity: 1;
  transform: translateY(-50%) translateX(0);
}
@media (max-width: 599px) {
  .fab-stack {
    right: 14px;
    bottom: 14px;
  }
  .fab {
    width: 52px;
    height: 52px;
  }
  /* No hover on touch — keep the tooltip out of the way rather than
     risk it covering the button above/below it. */
  .fab-tip {
    display: none;
  }
}
</style>

