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

      <button
        class="close-btn"
        type="button"
        aria-label="Close chat"
        @click="$emit('close')"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" />
        </svg>
      </button>
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
/* ==================================================
   Every color below comes from the app's shared theme
   variables (the same ones the navbar/widget use:
   --surface-bg, --surface-bg-soft, --border-color,
   --text-primary, --text-secondary, --text-muted,
   --cyan-400, --navy-950, --ease-out) instead of fixed
   hex values, so the whole panel follows the app's
   light/dark toggle automatically. Fallbacks are given
   in case a variable isn't defined globally.
================================================== */

.chat-window {
  /* Fluid sizing instead of a rigid 360x520 box:
     - Width never exceeds 380px on large screens, but
       shrinks to fit narrow viewports (accounting for the
       ~14-20px side margins the launcher sits in).
     - Height never exceeds 560px, but shrinks on short
       viewports (phones in landscape, small laptop windows,
       browser chrome/toolbars eating vertical space) so the
       window — and its input bar — always stays fully
       visible and never gets clipped off-screen. */
  width: min(380px, calc(100vw - 28px));
  height: min(560px, calc(100vh - 100px));
  max-height: 82vh;

  display: flex;
  flex-direction: column;
  overflow: hidden;

  background: var(--surface-bg, #0b1020);
  border: 1px solid var(--border-color, #2a3142);
  border-radius: 16px;

  box-shadow: 0 20px 50px rgba(2, 6, 23, 0.35);

  animation: pop 0.22s var(--ease-out, ease-out);
}

@keyframes pop {
  from { opacity: 0; transform: translateY(12px) scale(0.96); }
  to   { opacity: 1; transform: translateY(0)    scale(1); }
}

/* ==================================================
   HEADER
================================================== */

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 12px 14px;

  background: var(--surface-bg-soft, #1a2240);
  border-bottom: 1px solid var(--border-color, #2a3142);

  color: var(--text-primary, #fff);
}

.title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.title small {
  display: block;
  color: var(--text-secondary, #94a3b8);
  font-size: 11px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;

  background: #22c55e;
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.7);

  flex-shrink: 0;
}

/* Close button: a quiet ghost circle rather than a bold
   red X — closing the panel isn't a destructive action,
   so it shouldn't read as an alarm/danger control. */
.close-btn {
  display: grid;
  place-items: center;

  width: 24px;
  height: 24px;

  border: 1px solid transparent;
  border-radius: 50%;

  background: transparent;
  color: var(--text-secondary, #cbd5e1);

  cursor: pointer;

  transition:
    color 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease;
}

.close-btn:hover {
  color: var(--text-primary, #fff);
  background: rgba(148, 163, 184, 0.12);
  border-color: var(--border-color, #2a3142);
}

.close-btn:active {
  transform: scale(0.92);
}

.close-btn:focus-visible {
  outline: 2px solid var(--cyan-400, #22d3ee);
  outline-offset: 2px;
}

/* ==================================================
   MESSAGES
================================================== */

.messages {
  flex: 1;

  padding: 12px;
  overflow-y: auto;

  background: var(--surface-bg, #0b1020);
}

.bubble-row {
  display: flex;
  margin: 6px 0;
}

.bubble-row.bot {
  justify-content: flex-start;
}

.bubble.typing {
  display: inline-flex;
  gap: 4px;

  padding: 12px 14px;
  border-radius: 14px;

  background: var(--surface-bg-soft, #1f2937);
}

.bubble.typing span {
  width: 6px;
  height: 6px;
  border-radius: 50%;

  background: var(--text-muted, #94a3b8);

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
    /* On very small phones, use nearly the full width/height
       (the fluid calc() above already scales it — this just
       trims a touch more margin so it doesn't feel cramped
       against the screen edges). */
    width: calc(100vw - 20px);
    height: min(560px, calc(100vh - 84px));
    border-radius: 14px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .chat-window,
  .bubble.typing span {
    animation: none !important;
  }
}
</style>