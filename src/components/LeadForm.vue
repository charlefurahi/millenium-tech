<script setup lang="ts">
import { computed, nextTick, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Icon from '@/components/ui/Icon.vue'
import { site, waLink, mailtoLink } from '@/config/site'
import { serviceOptions } from '@/data/services'
import { track } from '@/utils/track'

const route = useRoute()

const budgets = [
  'Not sure yet',
  'Under TSh 500,000',
  'TSh 500,000 – 1,500,000',
  'TSh 1,500,000 – 5,000,000',
  'Above TSh 5,000,000',
  'Prefer to discuss'
]
const methods = ['WhatsApp', 'Phone call', 'Email'] as const

const blank = () => ({
  name: '',
  business: '',
  phone: '',
  email: '',
  service: '',
  budget: '',
  contactMethod: 'WhatsApp' as (typeof methods)[number],
  message: '',
  _gotcha: '' // honeypot — real people never fill this in
})

const form = reactive(blank())
type Field = 'name' | 'phone' | 'email' | 'service' | 'message'
const errors = reactive<Record<Field, string>>({ name: '', phone: '', email: '', service: '', message: '' })
const touched = reactive<Record<Field, boolean>>({ name: false, phone: false, email: false, service: false, message: false })

const state = ref<'idle' | 'sending' | 'success' | 'error'>('idle')
const serverMessage = ref('')
const summaryEl = ref<HTMLElement | null>(null)
const successEl = ref<HTMLElement | null>(null)

// Prefill the service from a link such as /contact?service=Website%20development
watch(
  () => route.query.service,
  (s) => {
    if (typeof s === 'string' && serviceOptions.includes(s)) form.service = s
  },
  { immediate: true }
)

const validators: Record<Field, () => string> = {
  name: () => (form.name.trim().length >= 2 ? '' : 'Please enter your name.'),
  phone: () => {
    const digits = form.phone.replace(/[\s\-().]/g, '')
    return /^\+?\d{9,15}$/.test(digits) ? '' : 'Enter a phone or WhatsApp number, e.g. 0755 000 000 or +255 755 000 000.'
  },
  email: () => {
    const v = form.email.trim()
    if (!v) return form.contactMethod === 'Email' ? 'Please add your email, since you prefer to be contacted by email.' : ''
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'Please enter a valid email address.'
  },
  service: () => (form.service ? '' : 'Please choose the service you need.'),
  message: () => (form.message.trim().length >= 10 ? '' : 'Please tell us a little about what you need (at least a sentence).')
}

function check(field: Field) {
  errors[field] = validators[field]()
  return !errors[field]
}
function onBlur(field: Field) {
  touched[field] = true
  check(field)
}
function onInput(field: Field) {
  if (touched[field] || errors[field]) check(field)
}
// email requirement depends on the preferred contact method
watch(
  () => form.contactMethod,
  () => touched.email && check('email')
)

const errorList = computed(() => (Object.keys(errors) as Field[]).filter((f) => errors[f]))
const labels: Record<Field, string> = { name: 'name', phone: 'phone', email: 'email', service: 'service', message: 'message' }
const ids: Record<Field, string> = { name: 'lf-name', phone: 'lf-phone', email: 'lf-email', service: 'lf-service', message: 'lf-message' }

async function submit() {
  if (state.value === 'sending') return
  const fields = Object.keys(errors) as Field[]
  fields.forEach((f) => (touched[f] = true))
  const ok = fields.map(check).every(Boolean)
  if (!ok) {
    await nextTick()
    summaryEl.value?.focus()
    return
  }
  // Bots fill hidden fields; pretend success and drop the message.
  if (form._gotcha) {
    state.value = 'success'
    return
  }

  state.value = 'sending'
  serverMessage.value = ''

  // Formspree's documented AJAX method uses FormData with no explicit
  // Content-Type header — this keeps the request "simple" and avoids a
  // CORS preflight (OPTIONS) call that some Formspree setups don't answer.
  const payload = new FormData()
  payload.set('name', form.name.trim())
  payload.set('phone', form.phone.trim())
  payload.set('service', form.service)
  payload.set('preferred_contact', form.contactMethod)
  payload.set('message', form.message.trim())
  payload.set('page', window.location.href)
  payload.set('_subject', `New enquiry: ${form.service} — ${form.name.trim()}`)
  if (form.business.trim()) payload.set('business', form.business.trim())
  if (form.email.trim()) payload.set('email', form.email.trim())
  if (form.budget) payload.set('budget', form.budget)
  if (typeof route.query.package === 'string') payload.set('package', String(route.query.package))

  try {
    const res = await fetch(`https://formspree.io/f/${site.formspreeId}`, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: payload
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      const first = Array.isArray(data.errors) ? data.errors[0]?.message : ''
      throw new Error(first || 'request failed')
    }
    track('form_submit', { service: form.service })
    Object.assign(form, blank())
    fields.forEach((f) => {
      touched[f] = false
      errors[f] = ''
    })
    state.value = 'success'
    await nextTick()
    successEl.value?.focus()
  } catch (e) {
    serverMessage.value = e instanceof Error && e.message !== 'request failed' ? e.message : ''
    state.value = 'error'
    await nextTick()
    summaryEl.value?.focus()
  }
}

function focusField(f: Field) {
  document.getElementById(ids[f])?.focus()
}

const sending = computed(() => state.value === 'sending')
</script>

<template>
  <!-- Success -->
  <div v-if="state === 'success'" ref="successEl" class="success" tabindex="-1" role="status">
    <span class="success__icon"><Icon name="check-circle" :size="34" /></span>
    <h3>Thank you — your enquiry has been sent.</h3>
    <p>{{ site.replyPromise }} We’ll reply with questions or next steps using the contact method you chose.</p>
    <p class="success__urgent">Need an answer sooner? Message us on WhatsApp.</p>
    <div class="btn-row">
      <a class="btn btn--wa" :href="waLink()" target="_blank" rel="noopener" data-track="whatsapp_click" data-track-label="form_success">
        <Icon name="whatsapp" :size="18" /> WhatsApp us
      </a>
      <button class="btn btn--secondary" type="button" @click="state = 'idle'">Send another enquiry</button>
    </div>
  </div>

  <!-- Form -->
  <form v-else class="form" novalidate @submit.prevent="submit">
    <div
      v-if="errorList.length || state === 'error'"
      ref="summaryEl"
      class="alert"
      :class="{ 'alert--error': state === 'error' }"
      tabindex="-1"
      role="alert"
    >
      <Icon name="alert" :size="20" />
      <div v-if="state === 'error'">
        <strong>We couldn’t send your enquiry.</strong>
        <p>
          {{ serverMessage || 'Something went wrong on our side or with your connection.' }} Please try again, or reach us directly on
          <a :href="waLink()" target="_blank" rel="noopener">WhatsApp</a> or at
          <a :href="mailtoLink()">{{ site.email }}</a>.
        </p>
      </div>
      <div v-else>
        <strong>Please check the highlighted fields:</strong>
        <ul>
          <li v-for="f in errorList" :key="f"><a :href="`#${ids[f]}`" @click.prevent="focusField(f)">{{ labels[f] }}</a></li>
        </ul>
      </div>
    </div>

    <div class="form__grid">
      <div class="field">
        <label class="label" for="lf-name">Your name *</label>
        <input id="lf-name" v-model="form.name" class="input" type="text" autocomplete="name" placeholder="Full name" :aria-invalid="!!errors.name" :aria-describedby="errors.name ? 'lf-name-err' : undefined" @blur="onBlur('name')" @input="onInput('name')" />
        <p v-if="errors.name" id="lf-name-err" class="field-error">{{ errors.name }}</p>
      </div>

      <div class="field">
        <label class="label" for="lf-business">Business name <small>(optional)</small></label>
        <input id="lf-business" v-model="form.business" class="input" type="text" autocomplete="organization" placeholder="Business or organisation" />
      </div>

      <div class="field">
        <label class="label" for="lf-phone">Phone / WhatsApp *</label>
        <input id="lf-phone" v-model="form.phone" class="input" type="tel" inputmode="tel" autocomplete="tel" placeholder="+255 …" :aria-invalid="!!errors.phone" :aria-describedby="errors.phone ? 'lf-phone-err' : undefined" @blur="onBlur('phone')" @input="onInput('phone')" />
        <p v-if="errors.phone" id="lf-phone-err" class="field-error">{{ errors.phone }}</p>
      </div>

      <div class="field">
        <label class="label" for="lf-email">Email <small>(optional)</small></label>
        <input id="lf-email" v-model="form.email" class="input" type="email" autocomplete="email" placeholder="you@example.com" :aria-invalid="!!errors.email" :aria-describedby="errors.email ? 'lf-email-err' : undefined" @blur="onBlur('email')" @input="onInput('email')" />
        <p v-if="errors.email" id="lf-email-err" class="field-error">{{ errors.email }}</p>
      </div>

      <div class="field">
        <label class="label" for="lf-service">Service needed *</label>
        <select id="lf-service" v-model="form.service" class="select" :aria-invalid="!!errors.service" :aria-describedby="errors.service ? 'lf-service-err' : undefined" @blur="onBlur('service')" @change="onInput('service')">
          <option value="" disabled>Select a service</option>
          <option v-for="s in serviceOptions" :key="s" :value="s">{{ s }}</option>
        </select>
        <p v-if="errors.service" id="lf-service-err" class="field-error">{{ errors.service }}</p>
      </div>

      <div class="field">
        <label class="label" for="lf-budget">Budget range <small>(optional)</small></label>
        <select id="lf-budget" v-model="form.budget" class="select">
          <option value="">Select if useful</option>
          <option v-for="b in budgets" :key="b" :value="b">{{ b }}</option>
        </select>
      </div>

      <fieldset class="field field--full methods">
        <legend class="label">How should we contact you?</legend>
        <div class="methods__row">
          <label v-for="m in methods" :key="m" class="method">
            <input v-model="form.contactMethod" type="radio" name="contact-method" :value="m" />
            <span>{{ m }}</span>
          </label>
        </div>
      </fieldset>

      <div class="field field--full">
        <label class="label" for="lf-message">Tell us about your project *</label>
        <textarea id="lf-message" v-model="form.message" class="textarea" placeholder="What do you need, and what should it help you achieve?" :aria-invalid="!!errors.message" :aria-describedby="errors.message ? 'lf-message-err' : undefined" @blur="onBlur('message')" @input="onInput('message')"></textarea>
        <p v-if="errors.message" id="lf-message-err" class="field-error">{{ errors.message }}</p>
      </div>

      <!-- honeypot -->
      <div class="hp" aria-hidden="true">
        <label>Leave this field empty<input v-model="form._gotcha" type="text" name="_gotcha" tabindex="-1" autocomplete="off" /></label>
      </div>
    </div>

    <button class="btn btn--lg btn--block" type="submit" :disabled="sending" :aria-busy="sending">
      <Icon v-if="sending" name="loader" :size="20" class="spin" />
      <Icon v-else name="send" :size="20" />
      {{ sending ? 'Sending…' : 'Send enquiry' }}
    </button>
    <p class="hint">
      {{ site.replyPromise }} We use your details only to reply to your enquiry — see our
      <router-link to="/privacy">privacy policy</router-link>.
    </p>
  </form>
</template>

<style scoped>
.form {
  display: grid;
  gap: 1.25rem;
}
.form__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.1rem 1rem;
}
@media (max-width: 639px) {
  .form__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
.methods {
  border: 0;
  padding: 0;
  margin: 0;
  min-width: 0;
}
.methods__row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}
.method {
  position: relative;
  cursor: pointer;
}
.method input {
  position: absolute;
  opacity: 0;
  inset: 0;
}
.method span {
  display: inline-flex;
  align-items: center;
  min-height: 46px;
  padding: 0 1.1rem;
  border: 1.5px solid var(--line-strong);
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.93rem;
  background: var(--card);
  color: var(--ink);
  transition: background-color 0.2s, border-color 0.2s, color 0.2s;
}
.method:hover span {
  border-color: var(--blue-500);
}
.method input:checked + span {
  background: var(--blue-600);
  border-color: var(--blue-600);
  color: #fff;
}
.method input:focus-visible + span {
  outline: 3px solid var(--focus);
  outline-offset: 2px;
}
.hp {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
.alert {
  display: flex;
  gap: 0.75rem;
  padding: 1rem 1.1rem;
  border-radius: var(--radius-m);
  background: var(--red-50);
  border: 1px solid #f0c3c6;
  color: var(--red-700);
  font-size: 0.92rem;
}
.alert svg {
  flex: none;
  margin-top: 2px;
}
.alert p {
  color: var(--ink-2);
  margin-top: 0.25rem;
}
.alert a {
  text-decoration: underline;
  font-weight: 600;
}
.alert ul {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 1rem;
  margin-top: 0.3rem;
  list-style: disc inside;
}
.alert:focus {
  outline: 3px solid var(--focus);
  outline-offset: 2px;
}
.spin {
  animation: spin 0.9s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.success {
  display: grid;
  gap: 1rem;
  justify-items: start;
  padding: clamp(1.25rem, 3vw, 2rem);
  border-radius: var(--radius-l);
  background: var(--green-50);
  border: 1px solid #b9e2c9;
}
.success:focus {
  outline: 3px solid var(--focus);
  outline-offset: 3px;
}
.success__icon {
  color: var(--green-700);
}
.success p {
  color: var(--ink-2);
}
.success__urgent {
  font-weight: 600;
  color: var(--ink);
}
</style>
