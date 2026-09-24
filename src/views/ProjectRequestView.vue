<template>
  <div class="request-page">
    <section class="page-hero noise grid-pattern">
      <div class="page-hero__orb page-hero__orb--1"></div><div class="page-hero__orb page-hero__orb--2"></div>
      <div class="container page-hero__inner">
        <div class="section-label">Project intake</div>
        <h1 class="page-hero__title">Tell us what you want to <span class="gradient-text">build.</span></h1>
        <p class="page-hero__subtitle">Give us the problem, the goal and the context. Our team can then turn your request into clear requirements, a proposal and a build plan.</p>
        <p v-if="prefillProductLabel" class="page-hero__product-note">
          Discussing: <strong>{{ prefillProductLabel }}</strong>
        </p>
      </div>
    </section>
    <section class="section">
      <div class="container request-layout">
        <aside class="request-side">
          <div class="glass-card request-summary">
            <div class="request-side-icon" aria-hidden="true"><svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 5h16v14H4z"/><path d="M8 9h8M8 13h5"/></svg></div>
            <h2>What happens next?</h2>
            <div v-for="(step,index) in steps" :key="step.title" class="request-step"><span>{{ String(index+1).padStart(2,'0') }}</span><div><strong>{{ step.title }}</strong><p>{{ step.text }}</p></div></div>
          </div>
          <div class="request-image"><img src="@/assets/process/consultation.jpg" alt="Millenium Tech project consultation" loading="lazy"></div>
        </aside>

        <div class="glass-card request-form-card">
          <div v-if="submitted" class="success-state">
            <span class="success-icon" aria-hidden="true"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 4 4L19 6"/></svg></span>
            <h2>Your request has been received.</h2>
            <p class="success-ref">Reference number: <strong>{{ referenceNumber }}</strong></p>
            <p>Your request is now with the Millenium Tech team. We will review the problem and contact you for the next step. This is a request received, not a project approval — you'll hear from us once the team has reviewed it.</p>
            <button class="btn btn-primary" @click="reset">Submit another request</button>
          </div>
          <form v-else @submit.prevent="submit" novalidate>
            <div class="form-heading"><div class="section-label">New request</div><h2>Project brief</h2><p>Short answers are fine. The team can clarify the rest during discovery.</p></div>

            <p v-if="submitError" class="form-error" role="alert">{{ submitError }}</p>

            <div class="form-grid">
              <label>
                <span>Your name *</span>
                <input v-model.trim="form.name" required placeholder="Full name" :aria-invalid="!!fieldErrors.name">
                <span v-if="fieldErrors.name" class="field-error">{{ fieldErrors.name }}</span>
              </label>
              <label>
                <span>Phone / WhatsApp *</span>
                <input v-model.trim="form.phone" required placeholder="+255 ..." :aria-invalid="!!fieldErrors.phone">
                <span v-if="fieldErrors.phone" class="field-error">{{ fieldErrors.phone }}</span>
              </label>
              <label>
                <span>Email</span>
                <input v-model.trim="form.email" type="email" placeholder="name@example.com" :aria-invalid="!!fieldErrors.email">
                <span v-if="fieldErrors.email" class="field-error">{{ fieldErrors.email }}</span>
              </label>
              <label>
                <span>Organization / business</span>
                <input v-model.trim="form.organization" placeholder="Company, school, church...">
              </label>
              <label>
                <span>What are you building? *</span>
                <select v-model="form.project_type" required>
                  <option value="" disabled>Select a project type</option>
                  <option value="BUSINESS_WEBSITE">Business website</option>
                  <option value="WEB_APPLICATION">Web application</option>
                  <option value="SCHOOL_SYSTEM">School system</option>
                  <option value="CHURCH_SYSTEM">Church system</option>
                  <option value="ECOMMERCE">E-commerce</option>
                  <option value="BRANDING_DESIGN">Branding / design</option>
                  <option value="IT_SUPPORT">IT support</option>
                  <option value="PRODUCT_IDEA">A problem or idea — not sure yet what it needs</option>
                  <option value="OTHER">Other custom solution</option>
                </select>
              </label>
              <label>
                <span>Budget range</span>
                <select v-model="form.budget_range">
                  <option value="">Prefer to discuss</option>
                  <option>Below TSh 500,000</option>
                  <option>TSh 500,000 – 2,000,000</option>
                  <option>TSh 2,000,000 – 5,000,000</option>
                  <option>Above TSh 5,000,000</option>
                </select>
              </label>
            </div>

            <label class="full">
              <span>Describe the problem or goal *</span>
              <textarea v-model.trim="form.problem_description" required rows="6" placeholder="Tell us what you want the system to do, who will use it, and what problem it should solve." :aria-invalid="!!fieldErrors.problem_description"></textarea>
              <span v-if="fieldErrors.problem_description" class="field-error">{{ fieldErrors.problem_description }}</span>
            </label>

            <button type="button" class="progressive-toggle" @click="showMore = !showMore" :aria-expanded="showMore">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" :style="{ transform: showMore ? 'rotate(180deg)' : 'none' }" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
              <span>{{ showMore ? 'Hide extra detail' : 'Add more detail (optional, helps discovery go faster)' }}</span>
            </button>

            <div v-if="showMore" class="form-more">
              <label class="full">
                <span>What would you like the solution to do?</span>
                <textarea v-model.trim="form.desired_solution" rows="3" placeholder="If you already have an idea of the solution, describe it here."></textarea>
              </label>
              <div class="form-grid">
                <label>
                  <span>Who will use it?</span>
                  <input v-model.trim="form.target_users" placeholder="e.g. staff, customers, students, parents">
                </label>
                <label>
                  <span>Expected timeline</span>
                  <input v-model.trim="form.timeline" placeholder="e.g. within 2 months, no rush">
                </label>
              </div>
              <label class="full">
                <span>How is this handled today?</span>
                <textarea v-model.trim="form.current_approach" rows="3" placeholder="Paper, WhatsApp, spreadsheets, another system, or nothing yet."></textarea>
              </label>
              <label class="full">
                <span>Additional information</span>
                <textarea v-model.trim="form.additional_information" rows="3" placeholder="Anything else worth knowing before the team reviews this."></textarea>
              </label>
            </div>

            <div class="form-footer">
              <p>We use this information to prepare discovery questions and a project proposal. No automatic build is started from this form.</p>
              <button class="btn btn-primary" type="submit" :disabled="submitting">
                <span v-if="submitting">Sending…</span>
                <template v-else>
                  <span>Send project request</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </template>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import { computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { submitProjectRequest } from '@/services/projectRequestService'

const route = useRoute()

const PRODUCT_LABELS = {
  'millennium-school': 'Millennium School',
  'millennium-church': 'Millennium Church',
  'millennium-business': 'Millennium Business'
}

const prefillProductLabel = computed(() => {
  const slug = route.query.product
  return slug ? (PRODUCT_LABELS[slug] || slug) : ''
})

const submitted = ref(false)
const submitting = ref(false)
const showMore = ref(false)
const submitError = ref('')
const fieldErrors = reactive({})
const referenceNumber = ref('')

const form = reactive({
  name: '',
  phone: '',
  email: '',
  organization: '',
  project_type: route.query.product ? 'PRODUCT_IDEA' : '',
  budget_range: '',
  problem_description: '',
  desired_solution: '',
  target_users: '',
  current_approach: '',
  timeline: '',
  additional_information: '',
  related_product: route.query.product || ''
})

const steps = [
  { title: 'Request received', text: 'The brief becomes a structured project lead with a reference number.' },
  { title: 'Team review', text: 'A team member checks scope, complexity and missing details.' },
  { title: 'Discovery & proposal', text: 'You receive a clear scope, estimate and delivery plan.' },
  { title: 'Build, test & support', text: 'After approval, the project moves through design, development, testing, launch and ongoing support.' }
]

async function submit () {
  if (submitting.value) return
  submitError.value = ''
  Object.keys(fieldErrors).forEach(k => delete fieldErrors[k])

  submitting.value = true
  try {
    const result = await submitProjectRequest({ ...form })
    referenceNumber.value = result.reference_number
    submitted.value = true
  } catch (err) {
    if (err.fieldErrors) {
      Object.assign(fieldErrors, err.fieldErrors)
      submitError.value = err.message
    } else {
      submitError.value = err.message || 'Something went wrong. Please try again.'
    }
  } finally {
    submitting.value = false
  }
}

function reset () {
  Object.keys(form).forEach(k => { form[k] = k === 'project_type' || k === 'budget_range' || k === 'related_product' ? '' : '' })
  showMore.value = false
  submitted.value = false
  referenceNumber.value = ''
}
</script>
<style scoped>
.request-page{background:var(--bg-primary);color:var(--text-primary)}
.page-hero__product-note{margin-top:14px;font-size:.9rem;color:var(--cyan-text)}
.request-layout{display:grid;grid-template-columns:360px minmax(0,1fr);gap:28px;align-items:start}
.request-side{display:grid;gap:20px}
.request-summary{padding:25px}
.request-side-icon{width:48px;height:48px;display:grid;place-items:center;border-radius:14px;background:var(--cyan-soft);color:var(--cyan-text);margin-bottom:18px}
.request-summary h2{font-size:1.35rem;margin-bottom:22px}
.request-step{display:grid;grid-template-columns:38px 1fr;gap:12px;padding:16px 0;border-top:1px solid var(--border-soft)}
.request-step:first-of-type{border-top:none}
.request-step>span{font-size:.72rem;color:var(--cyan-text);font-weight:800;padding-top:2px}
.request-step strong{font-size:.9rem}
.request-step p{color:var(--text-secondary);font-size:.8rem;line-height:1.6;margin-top:3px}
.request-image{height:230px;border-radius:18px;overflow:hidden}
.request-image img{width:100%;height:100%;object-fit:cover}
.request-form-card{padding:34px}
.form-heading{margin-bottom:28px}
.form-heading h2{font-size:1.7rem;margin:7px 0}
.form-heading p,.form-footer p{color:var(--text-secondary);font-size:.88rem}
.form-error{background:rgba(248,113,113,.1);border:1px solid rgba(248,113,113,.35);color:#f87171;padding:12px 16px;border-radius:10px;font-size:.85rem;margin-bottom:20px}
.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}
label{display:grid;gap:8px;margin-bottom:18px}
label>span{font-size:.8rem;font-weight:600;color:var(--text-secondary)}
input,select,textarea{width:100%;border:1px solid var(--input-border);background:var(--input-bg);color:var(--text-primary);border-radius:12px;padding:12px 14px;outline:none;transition:border-color .2s,background .2s}
input:focus,select:focus,textarea:focus{border-color:var(--cyan-text);background:var(--input-bg-focus)}
input[aria-invalid="true"],textarea[aria-invalid="true"]{border-color:#f87171}
.field-error{color:#f87171;font-size:.76rem;font-weight:500}
textarea{resize:vertical;min-height:145px}
.full{display:block}
.progressive-toggle{display:flex;align-items:center;gap:9px;background:none;border:none;color:var(--cyan-text);font-weight:600;font-size:.85rem;padding:6px 0 20px;cursor:pointer}
.progressive-toggle svg{transition:transform .2s}
.form-more{border-top:1px solid var(--border-soft);padding-top:6px;margin-bottom:4px}
.form-footer{display:flex;justify-content:space-between;align-items:center;gap:20px;border-top:1px solid var(--border-soft);padding-top:22px}
.form-footer p{max-width:470px}
.form-footer .btn:disabled{opacity:.65;cursor:not-allowed}
.success-state{text-align:center;padding:70px 20px}
.success-icon{margin:0 auto 18px;width:58px;height:58px;border-radius:50%;display:grid;place-items:center;background:var(--cyan-soft);color:var(--cyan-text)}
.success-state h2{font-size:1.7rem;margin-bottom:8px}
.success-ref{font-size:1.05rem;margin-bottom:14px}
.success-ref strong{color:var(--cyan-text);letter-spacing:.02em}
.success-state p{color:var(--text-secondary);max-width:540px;margin:0 auto 24px}
@media(max-width:900px){.request-layout{grid-template-columns:1fr}.request-side{grid-template-columns:1fr 1fr}.request-image{height:auto;min-height:250px}}
@media(max-width:650px){.request-side,.form-grid{grid-template-columns:1fr}.request-form-card{padding:22px}.form-footer{display:block}.form-footer .btn{margin-top:16px;width:100%}}
</style>
