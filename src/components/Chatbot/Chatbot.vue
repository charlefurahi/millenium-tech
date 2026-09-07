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

    <!-- "Ask MilleBot" pill — appears above the FAB while
         closed, auto-fades after a few seconds so it isn't
         naggy, and re-appears on hover or on a new bot
         reply so the user is gently reminded it's there. -->
    <transition name="pill-fade">
      <button
        v-if="!open && showPill"
        type="button"
        class="millebot-pill"
        @click="toggle"
        @mouseenter="keepPillVisible"
        @mouseleave="schedulePillHide"
      >
        <span class="millebot-pill-icon" aria-hidden="true">🤖</span>
        <span class="millebot-pill-text">Ask MilleBot</span>
      </button>
    </transition>

    <div
      v-if="!open"
      class="fab-wrap"
      @mouseenter="keepPillVisible"
      @mouseleave="schedulePillHide"
    >
      <!-- Decorative sparkles, respect prefers-reduced-motion
           (see <style>). -->
      <span class="sparkle sparkle--a" aria-hidden="true"></span>
      <span class="sparkle sparkle--b" aria-hidden="true"></span>

      <button
        class="fab"
        @click="toggle"
        aria-label="Open chat with MilleBot"
        :aria-expanded="open"
      >
        <span class="fab-icon" aria-hidden="true">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8A2.5 2.5 0 0 1 17.5 16H10l-4.5 4v-4H6.5A2.5 2.5 0 0 1 4 13.5v-8Z" fill="currentColor"/>
            <circle cx="9" cy="9.5" r="1.15" fill="var(--fab-icon-dot, #0b1120)"/>
            <circle cx="13.2" cy="9.5" r="1.15" fill="var(--fab-icon-dot, #0b1120)"/>
          </svg>
        </span>

        <transition name="badge-pop">
          <span
            v-if="unreadCount > 0"
            class="fab-badge"
            role="status"
            :aria-label="`${unreadCount} unread message${unreadCount > 1 ? 's' : ''}`"
          >
            {{ unreadCount > 9 ? '9+' : unreadCount }}
          </span>
        </transition>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import ChatWindow from "./ChatWindow.vue";
import { sendMessage } from "../../services/chatbotService.js";

const open = ref(false);
const loading = ref(false);
const unreadCount = ref(0);
const showPill = ref(true);

const messages = ref([
  {
    role: "bot",
    text: "Hi 👋 I'm MilleBot from Millenium Tech. How can I help you today? (Karibu! Naweza kukusaidiaje?)",
  },
]);

let pillHideTimer = null;

/* --------------------------------------------------
   Pill visibility

   Shown on load, auto-hides after a few seconds so it
   doesn't sit there nagging the user forever. Hovering
   the launcher (pill or FAB) keeps it visible; leaving
   restarts the hide countdown. A fresh bot reply while
   the chat is closed also brings it back, since that's
   exactly when a nudge is useful.
-------------------------------------------------- */

function keepPillVisible() {
  showPill.value = true;
  if (pillHideTimer) {
    clearTimeout(pillHideTimer);
    pillHideTimer = null;
  }
}

function schedulePillHide() {
  if (pillHideTimer) clearTimeout(pillHideTimer);
  pillHideTimer = setTimeout(() => {
    showPill.value = false;
  }, 4000);
}

onMounted(() => {
  schedulePillHide();
});

onBeforeUnmount(() => {
  if (pillHideTimer) clearTimeout(pillHideTimer);
});

/* --------------------------------------------------
   Open / close
-------------------------------------------------- */

watch(open, (isOpen) => {
  if (isOpen) {
    unreadCount.value = 0;
    if (pillHideTimer) {
      clearTimeout(pillHideTimer);
      pillHideTimer = null;
    }
  } else {
    keepPillVisible();
    schedulePillHide();
  }
});

function toggle() {
  open.value = !open.value;
}

/* --------------------------------------------------
   Messaging
-------------------------------------------------- */

async function onSend(text) {
  messages.value.push({ role: "user", text });
  loading.value = true;

  try {
    const data = await sendMessage(text);
    messages.value.push({ role: "bot", text: data.response });

    if (!open.value) {
      unreadCount.value += 1;
      keepPillVisible();
      schedulePillHide();
    }
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
/* ==================================================
   Uses the app's shared theme variables (same ones as
   the navbar: --cyan-400, --navy-950, --surface-bg,
   --surface-bg-soft, --border-color, --text-primary,
   --text-secondary, --ease-out) so this widget follows
   whatever light/dark theme is active app-wide, with no
   theme logic duplicated here. Sensible fallbacks are
   provided in case a variable isn't defined globally.
================================================== */

.millebot-root {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;

  display: flex;
  flex-direction: column;
  align-items: flex-end;

  gap: 10px;
}

/* ==================================================
   ASK MILLEBOT PILL
================================================== */

.millebot-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  padding: 0.55rem 0.95rem 0.55rem 0.65rem;

  border: 1px solid var(--border-color, rgba(148, 163, 184, 0.25));
  border-radius: 999px;

  background: var(--surface-bg, #0f172a);
  color: var(--text-primary, #f1f5f9);

  font-family: var(--font-display, inherit);
  font-size: 0.85rem;
  font-weight: 700;

  cursor: pointer;

  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.04) inset,
    0 10px 26px -12px rgba(2, 6, 23, 0.5);

  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  animation: pill-float 3.2s ease-in-out infinite;

  transition:
    transform 0.2s var(--ease-out, ease),
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.millebot-pill:hover {
  transform: translateY(-2px);
  border-color: var(--cyan-400, #22d3ee);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.04) inset,
    0 14px 30px -12px rgba(34, 211, 238, 0.35);
}

.millebot-pill:active {
  transform: translateY(0) scale(0.98);
}

.millebot-pill-icon {
  display: grid;
  place-items: center;

  width: 22px;
  height: 22px;

  border-radius: 50%;

  background: rgba(34, 211, 238, 0.12);

  font-size: 13px;
  line-height: 1;
}

.millebot-pill-text {
  white-space: nowrap;
}

@keyframes pill-float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-3px); }
}

/* ==================================================
   FAB WRAPPER + SPARKLES
================================================== */

.fab-wrap {
  position: relative;

  display: inline-flex;
}

.sparkle {
  position: absolute;

  width: 8px;
  height: 8px;

  border-radius: 2px;

  background: var(--cyan-400, #22d3ee);

  clip-path: polygon(
    50% 0%, 61% 39%, 100% 50%,
    61% 61%, 50% 100%, 39% 61%,
    0% 50%, 39% 39%
  );

  pointer-events: none;

  animation: twinkle 2.4s ease-in-out infinite;
}

.sparkle--a {
  top: -6px;
  left: -4px;
  animation-delay: 0s;
}

.sparkle--b {
  bottom: -2px;
  right: -8px;
  width: 6px;
  height: 6px;
  animation-delay: 1.1s;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.25; transform: scale(0.7) rotate(0deg); }
  50%      { opacity: 1;    transform: scale(1.05) rotate(20deg); }
}

/* ==================================================
   FAB
================================================== */

.fab {
  position: relative;

  width: 60px;
  height: 60px;

  display: grid;
  place-items: center;

  border-radius: 50%;
  border: none;

  cursor: pointer;

  color: var(--navy-950, #04121a);

  background: radial-gradient(
    circle at 32% 28%,
    #5eead4 0%,
    var(--cyan-400, #22d3ee) 45%,
    #0ea5b8 100%
  );

  box-shadow:
    0 0 0 4px rgba(34, 211, 238, 0.12),
    0 14px 30px -8px rgba(34, 211, 238, 0.55);

  animation: breathe 2.8s ease-in-out infinite;

  transition:
    transform 0.2s var(--ease-out, ease),
    box-shadow 0.25s ease,
    background 0.25s ease;
}

.fab:hover {
  transform: scale(1.06);
}

.fab:active {
  transform: scale(0.96);
}

.fab-icon {
  display: grid;
  place-items: center;
}

/* Gentle "breathing" glow — a living, idle presence on
   the page rather than a static button, without being
   distracting. Disabled entirely for users who prefer
   reduced motion (see bottom of file). */
@keyframes breathe {
  0%, 100% {
    transform: scale(1);
    box-shadow:
      0 0 0 4px rgba(34, 211, 238, 0.12),
      0 14px 30px -8px rgba(34, 211, 238, 0.55);
  }
  50% {
    transform: scale(1.045);
    box-shadow:
      0 0 0 8px rgba(34, 211, 238, 0.16),
      0 18px 38px -8px rgba(34, 211, 238, 0.7);
  }
}

/* ==================================================
   UNREAD BADGE
================================================== */

.fab-badge {
  position: absolute;
  top: -4px;
  right: -4px;

  min-width: 22px;
  height: 22px;
  padding: 0 5px;

  display: grid;
  place-items: center;

  border-radius: 999px;
  border: 2px solid var(--surface-bg, #0f172a);

  background: #ef4444;
  color: #fff;

  font-size: 0.68rem;
  font-weight: 800;
  line-height: 1;
}

/* ==================================================
   TRANSITIONS
================================================== */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.pill-fade-enter-active,
.pill-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s var(--ease-out, ease);
}

.pill-fade-enter-from,
.pill-fade-leave-to {
  opacity: 0;
  transform: translateY(6px) scale(0.96);
}

.badge-pop-enter-active {
  animation: badge-pop 0.3s var(--ease-out, ease);
}

@keyframes badge-pop {
  0%   { transform: scale(0.4); opacity: 0; }
  60%  { transform: scale(1.15); opacity: 1; }
  100% { transform: scale(1); }
}

/* ==================================================
   ACCESSIBILITY / KEYBOARD FOCUS
================================================== */

.millebot-pill:focus-visible,
.fab:focus-visible {
  outline: 2px solid var(--cyan-400, #22d3ee);
  outline-offset: 3px;
}

/* ==================================================
   REDUCED MOTION
================================================== */

@media (prefers-reduced-motion: reduce) {
  .fab,
  .millebot-pill,
  .sparkle {
    animation: none !important;
  }
}

/* ==================================================
   SMALL SCREENS
================================================== */

@media (max-width: 480px) {
  .millebot-root {
    bottom: 14px;
    right: 14px;
  }

  .millebot-pill-text {
    display: none;
  }

  .millebot-pill {
    padding: 0.5rem;
  }

  .fab {
    width: 54px;
    height: 54px;
  }
}
</style>