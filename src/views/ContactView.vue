<script setup lang="ts">
import Icon from '@/components/ui/Icon.vue'
import PageHero from '@/components/ui/PageHero.vue'
import LeadForm from '@/components/LeadForm.vue'
import { site, waLink, mailtoLink, telLink } from '@/config/site'

const tips = [
  { title: 'Your goal', text: 'What should be easier, clearer or more successful once this is done?' },
  { title: 'Your audience', text: 'Who will use it, see it or benefit from it?' },
  { title: 'Your timing', text: 'Is there a date you are working towards? Share it if so.' }
]
</script>

<template>
  <div>
    <PageHero
      eyebrow="Free consultation"
      title="Tell us what you need. We’ll help you find the right next step."
      lead="Send a short enquiry, or reach us directly on WhatsApp or by phone. There is no obligation."
      :crumbs="[{ label: 'Contact' }]"
    />

    <section class="section">
      <div class="container layout">
        <aside class="side">
          <div class="side__card on-dark brand-surface hex-bg">
            <h2>Prefer to talk?</h2>
            <p>The fastest way to reach us is WhatsApp. {{ site.replyPromise }}</p>
            <ul class="methods">
              <li>
                <a :href="waLink()" target="_blank" rel="noopener" data-track="whatsapp_click" data-track-label="contact_page">
                  <span class="m-icon m-icon--wa"><Icon name="whatsapp" :size="22" /></span>
                  <span><small>WhatsApp</small><strong>{{ site.whatsapp.display }}</strong></span>
                </a>
              </li>
              <li v-for="p in site.phones" :key="p.tel">
                <a :href="telLink(p.tel)" data-track="call_click" data-track-label="contact_page">
                  <span class="m-icon"><Icon name="phone" :size="22" /></span>
                  <span><small>Call</small><strong>{{ p.display }}</strong></span>
                </a>
              </li>
              <li>
                <a :href="mailtoLink()" data-track="email_click" data-track-label="contact_page">
                  <span class="m-icon"><Icon name="mail" :size="22" /></span>
                  <span><small>Email</small><strong class="wrap">{{ site.email }}</strong></span>
                </a>
              </li>
              <li>
                <div class="static">
                  <span class="m-icon"><Icon name="map-pin" :size="22" /></span>
                  <span><small>Location</small><strong>{{ site.location.city }}, {{ site.location.country }}</strong></span>
                </div>
              </li>
              <li>
                <div class="static">
                  <span class="m-icon"><Icon name="clock" :size="22" /></span>
                  <span><small>Business hours</small><strong>{{ site.hours }}</strong></span>
                </div>
              </li>
            </ul>
          </div>

          <div class="card tips">
            <h3>What helps us reply well</h3>
            <ul>
              <li v-for="t in tips" :key="t.title"><strong>{{ t.title }}.</strong> {{ t.text }}</li>
            </ul>
          </div>
        </aside>

        <div class="card formcard">
          <span class="eyebrow">Project enquiry</span>
          <h2>A few details to get started.</h2>
          <LeadForm />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  gap: clamp(1.5rem, 4vw, 3rem);
  align-items: start;
}
.side {
  display: grid;
  gap: var(--s-4);
}
.side__card {
  display: grid;
  gap: 1rem;
  padding: clamp(1.25rem, 3vw, 2rem);
  border-radius: var(--radius-l);
  color: #fff;
}
.side__card h2 {
  font-size: 1.6rem;
}
.side__card > p {
  color: var(--on-dark-2);
}
.methods {
  display: grid;
  gap: 0.25rem;
  margin-top: 0.5rem;
}
.methods a,
.methods .static {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.7rem;
  margin-inline: -0.7rem;
  border-radius: var(--radius-m);
  transition: background-color 0.2s;
}
.methods a:hover {
  background: rgba(255, 255, 255, 0.08);
}
.methods small {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--on-dark-3);
}
.methods strong {
  font-family: var(--font-display);
  font-size: 1.02rem;
}
.methods .wrap {
  overflow-wrap: anywhere;
}
.m-icon {
  flex: none;
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: var(--radius-m);
  background: rgba(95, 216, 238, 0.14);
  color: var(--aqua-300);
}
.m-icon--wa {
  background: var(--green-700);
  color: #fff;
}
.tips {
  display: grid;
  gap: 0.8rem;
}
.tips ul {
  display: grid;
  gap: 0.6rem;
  color: var(--ink-2);
  font-size: var(--text-sm);
}
.tips strong {
  color: var(--ink);
}
.formcard {
  display: grid;
  gap: 1rem;
  padding: clamp(1.25rem, 3vw, 2.25rem);
  box-shadow: var(--shadow-m);
}
.formcard h2 {
  font-size: 1.7rem;
  margin-bottom: 0.4rem;
}
@media (max-width: 979px) {
  .layout {
    grid-template-columns: minmax(0, 1fr);
  }
  /* form first on small screens: the main action */
  .formcard {
    order: -1;
  }
}
</style>
