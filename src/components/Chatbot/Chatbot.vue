<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import Icon from '@/components/ui/Icon.vue'
import { site, waLink } from '@/config/site'
import { ChatError, resetSession, sendMessage } from '@/services/chatbotService'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ (e: 'close'): void }>()

interface Msg {
  role: 'bot' | 'user'
  text: string
  error?: boolean
}

const STORE_KEY = 'millebot_messages'
const MAX_LEN = 1000
const WELCOME: Msg = {
  role: 'bot',
  text: 'Hello, I’m MilleBot, the Millenium Tech assistant. Ask me about our services or how to get a quote. (Karibu! Naweza kukusaidiaje?)'
}
const quick = ['What services do you offer?', 'How do I get a quotation?', 'What are your business hours?']

function restore(): Msg[] {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORE_KEY) || '[]') as Msg[]
    const ok = Array.isArray(saved) ? saved.filter((m) => m && (m.role === 'bot' || m.role === 'user') && typeof m.text === 'string') : []
    return ok.length ? ok : [WELCOME]
  } catch {
    return [WELCOME]
  }
}

const messages = ref<Msg[]>(restore())
const draft = ref('')
const loading = ref(false)
const listEl = ref<HTMLElement | null>(null)
const inputEl = ref<HTMLTextAreaElement | null>(null)
let controller: AbortController | null = null

const persist = () => {
  try {
    sessionStorage.setItem(STORE_KEY, JSON.stringify(messages.value.slice(-40)))
  } catch {
    /* private mode / storage full — chat still works, just isn't remembered */
  }
}

const scrollDown = () =>
  nextTick(() => {
    if (listEl.value) listEl.value.scrollTo({ top: listEl.value.scrollHeight, behavior: 'smooth' })
  })

watch(
  () => props.open,
  (v) => {
    if (v) {
      scrollDown()
      nextTick(() => inputEl.value?.focus())
    }
  }
)
watch(messages, persist, { deep: true })
onBeforeUnmount(() => controller?.abort())

function autosize() {
  const el = inputEl.value
  if (!el) return
  el.style.height = 'auto'
  el.style.height = `${Math.min(el.scrollHeight, 110)}px`
}

async function ask(text: string) {
  loading.value = true
  scrollDown()
  controller = new AbortController()
  try {
    const reply = await sendMessage(text, controller.signal)
    messages.value.push({ role: 'bot', text: reply })
  } catch (err) {
    if (err instanceof ChatError && err.code === 'cancelled') return
    const reason = err instanceof ChatError ? err.message : 'Something went wrong.'
    messages.value.push({
      role: 'bot',
      error: true,
      text: `${reason} If it keeps happening, message us on WhatsApp (${site.whatsapp.display}) and a person will help.`
    })
  } finally {
    loading.value = false
    scrollDown()
    nextTick(() => inputEl.value?.focus())
  }
}

async function send(text: string) {
  const value = text.trim().slice(0, MAX_LEN)
  if (!value || loading.value) return
  messages.value.push({ role: 'user', text: value })
  draft.value = ''
  nextTick(autosize)
  await ask(value)
}

/** Resend the last question after an error, replacing the error bubble. */
async function retry() {
  if (loading.value) return
  const last = messages.value[messages.value.length - 1]
  if (!last?.error) return
  const lastUser = [...messages.value].reverse().find((m) => m.role === 'user')
  if (!lastUser) return
  messages.value.pop()
  await ask(lastUser.text)
}

function newChat() {
  controller?.abort()
  resetSession()
  messages.value = [WELCOME]
  loading.value = false
  draft.value = ''
  nextTick(() => inputEl.value?.focus())
}

function onKey(e: KeyboardEvent) {
  // Enter sends, Shift+Enter makes a new line.
  if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
    e.preventDefault()
    send(draft.value)
  }
}

/** Safe, tiny formatter: **bold** and links only — never v-html. */
type Token = { t: string; kind: 'text' | 'bold' | 'link' }
function tokens(line: string): Token[] {
  return line
    .split(/(\*\*[^*]+\*\*|https?:\/\/[^\s)]+)/g)
    .filter(Boolean)
    .map((t): Token => {
      if (/^https?:\/\//.test(t)) return { t: t.replace(/[.,;:!?]+$/, ''), kind: 'link' }
      if (/^\*\*[^*]+\*\*$/.test(t)) return { t: t.slice(2, -2), kind: 'bold' }
      return { t, kind: 'text' }
    })
}
function blocks(text: string) {
  return text
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => ({ bullet: /^[-•*]\s+/.test(l), tokens: tokens(l.replace(/^[-•*]\s+/, '')) }))
}
</script>

<template>
  <transition name="chat">
    <section v-if="open" class="chat" role="dialog" aria-label="Chat with MilleBot" @keydown.esc="emit('close')">
      <header class="chat__head brand-surface hex-bg">
        <span class="chat__avatar"><Icon name="bot" :size="20" /><i class="chat__online" aria-hidden="true"></i></span>
        <div>
          <strong>MilleBot</strong>
          <small>Millenium Tech assistant · Online</small>
        </div>
        <button class="chat__icon-btn" type="button" aria-label="Start a new chat" title="New chat" @click="newChat">
          <Icon name="rotate-ccw" :size="18" />
        </button>
        <button class="chat__icon-btn" type="button" aria-label="Close chat" @click="emit('close')">
          <Icon name="x" :size="20" />
        </button>
      </header>

      <div ref="listEl" class="chat__list" aria-live="polite">
        <template v-for="(m, i) in messages" :key="i">
          <div class="msg" :class="[`msg--${m.role}`, { 'msg--error': m.error }]">
            <p v-for="(b, k) in blocks(m.text)" :key="k" :class="{ 'msg__bullet': b.bullet }">
              <template v-for="(p, j) in b.tokens" :key="j">
                <a v-if="p.kind === 'link'" :href="p.t" target="_blank" rel="noopener noreferrer">{{ p.t }}</a>
                <strong v-else-if="p.kind === 'bold'">{{ p.t }}</strong>
                <template v-else>{{ p.t }}</template>
              </template>
            </p>
            <button v-if="m.error && i === messages.length - 1 && !loading" class="msg__retry" type="button" @click="retry">
              Try again
            </button>
          </div>
        </template>
        <div v-if="loading" class="msg msg--bot msg--typing" role="status" aria-label="MilleBot is typing"><i></i><i></i><i></i></div>

        <div v-if="messages.length === 1" class="chat__quick">
          <button v-for="q in quick" :key="q" type="button" @click="send(q)">{{ q }}</button>
        </div>
      </div>

      <footer class="chat__foot">
        <a
          class="chat__human"
          :href="waLink('Hello Millenium Tech, I would like to speak to a person.')"
          target="_blank"
          rel="noopener noreferrer"
          data-track="whatsapp_click"
          data-track-label="chatbot_human"
        >
          <Icon name="whatsapp" :size="16" /> Prefer a person? WhatsApp us
        </a>
        <form class="chat__form" @submit.prevent="send(draft)">
          <label class="sr-only" for="chat-input">Type your message</label>
          <textarea
            id="chat-input"
            ref="inputEl"
            v-model="draft"
            rows="1"
            :maxlength="MAX_LEN"
            autocomplete="off"
            placeholder="Type your message…"
            :disabled="loading"
            @keydown="onKey"
            @input="autosize"
          ></textarea>
          <button type="submit" :disabled="loading || !draft.trim()" aria-label="Send message"><Icon name="send" :size="18" /></button>
        </form>
      </footer>
    </section>
  </transition>
</template>

<style scoped>
.chat {
  position: fixed;
  right: 20px;
  bottom: 160px;
  z-index: 60;
  display: flex;
  flex-direction: column;
  width: min(390px, calc(100vw - 24px));
  height: min(560px, calc(100dvh - 190px));
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-l);
  overflow: hidden;
}
.chat__head {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9rem 0.75rem 0.9rem 1rem;
  color: #fff;
}
.chat__head div {
  display: grid;
  line-height: 1.25;
  flex: 1;
  min-width: 0;
}
.chat__head small {
  color: var(--on-dark-3);
  font-size: 0.78rem;
}
.chat__avatar {
  position: relative;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--blue-600);
}
.chat__online {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #2ee59d;
  border: 2px solid var(--blue-700);
}
.chat__icon-btn {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: #fff;
}
.chat__icon-btn:hover {
  background: rgba(255, 255, 255, 0.14);
}
.chat__list {
  flex: 1;
  overflow-y: auto;
  overscroll-behavior: contain;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 1rem;
  background: var(--mist);
}
.msg {
  max-width: 86%;
  padding: 0.65rem 0.9rem;
  border-radius: 16px;
  font-size: 0.93rem;
  line-height: 1.5;
  overflow-wrap: anywhere;
  animation: msg-in 0.22s var(--ease) both;
}
.msg p {
  margin: 0;
}
.msg p + p {
  margin-top: 0.45rem;
}
.msg__bullet {
  position: relative;
  padding-left: 1rem;
}
.msg__bullet::before {
  content: '•';
  position: absolute;
  left: 0.2rem;
}
.msg a {
  text-decoration: underline;
  text-underline-offset: 2px;
}
.msg--bot {
  align-self: flex-start;
  background: var(--card);
  border: 1px solid var(--line);
  border-bottom-left-radius: 4px;
  color: var(--ink);
}
.msg--error {
  background: var(--red-50);
  border-color: #f0c3c6;
  color: var(--red-700);
}
[data-theme='dark'] .msg--error {
  background: rgba(180, 35, 47, 0.18);
  border-color: rgba(255, 130, 140, 0.35);
  color: #ffb4ba;
}
.msg__retry {
  margin-top: 0.5rem;
  min-height: 34px;
  padding: 0 0.85rem;
  border: 1.5px solid currentColor;
  border-radius: 999px;
  background: transparent;
  color: inherit;
  font-size: 0.85rem;
  font-weight: 700;
}
.msg--user {
  align-self: flex-end;
  background: var(--blue-600);
  color: #fff;
  border-bottom-right-radius: 4px;
}
.msg--typing {
  display: flex;
  gap: 5px;
  padding: 0.85rem 1rem;
}
.msg--typing i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--muted);
  animation: blink 1.2s infinite ease-in-out;
}
.msg--typing i:nth-child(2) {
  animation-delay: 0.15s;
}
.msg--typing i:nth-child(3) {
  animation-delay: 0.3s;
}
@keyframes blink {
  0%,
  80%,
  100% {
    opacity: 0.25;
  }
  40% {
    opacity: 1;
  }
}
@keyframes msg-in {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
.chat__quick {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.25rem;
}
.chat__quick button {
  min-height: 40px;
  padding: 0.4rem 0.85rem;
  border: 1.5px solid var(--blue-500);
  border-radius: 999px;
  background: var(--card);
  color: var(--text-brand);
  font-size: 0.86rem;
  font-weight: 600;
  text-align: left;
}
[data-theme='dark'] .chat__quick button {
  color: var(--aqua-300);
}
.chat__quick button:hover {
  background: var(--blue-50);
}
[data-theme='dark'] .chat__quick button:hover {
  background: rgba(17, 118, 212, 0.18);
}
.chat__foot {
  display: grid;
  gap: 0.6rem;
  padding: 0.75rem;
  border-top: 1px solid var(--line);
  background: var(--card);
}
.chat__human {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  justify-self: start;
  font-size: 0.83rem;
  font-weight: 600;
  color: var(--green-700);
}
[data-theme='dark'] .chat__human {
  color: #6be3a2;
}
.chat__form {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
}
.chat__form textarea {
  flex: 1;
  min-width: 0;
  min-height: 46px;
  max-height: 110px;
  padding: 0.7rem 0.9rem;
  border: 1.5px solid var(--line-strong);
  border-radius: var(--radius-m);
  background: var(--card);
  color: var(--ink);
  line-height: 1.4;
  resize: none;
}
.chat__form textarea:focus {
  outline: none;
  border-color: var(--blue-600);
  box-shadow: 0 0 0 4px rgba(17, 118, 212, 0.18);
}
.chat__form button {
  display: grid;
  place-items: center;
  flex: none;
  width: 46px;
  height: 46px;
  border: 0;
  border-radius: var(--radius-m);
  background: var(--blue-600);
  color: #fff;
}
.chat__form button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.chat-enter-active,
.chat-leave-active {
  transition: opacity 0.2s var(--ease), transform 0.2s var(--ease);
}
.chat-enter-from,
.chat-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}
@media (max-width: 599px) {
  .chat {
    right: 12px;
    bottom: 142px;
    height: min(560px, calc(100dvh - 160px));
  }
}
@media (prefers-reduced-motion: reduce) {
  .msg {
    animation: none;
  }
}
</style>
