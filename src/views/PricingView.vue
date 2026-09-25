<script setup lang="ts">
import Icon from '@/components/ui/Icon.vue'
import PageHero from '@/components/ui/PageHero.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import PackageCard from '@/components/ui/PackageCard.vue'
import FaqList from '@/components/ui/FaqList.vue'
import CtaBand from '@/components/ui/CtaBand.vue'
import { packages, priceFactors, quoteSteps } from '@/data/packages'
import { faqs } from '@/data/faqs'
import { waLink } from '@/config/site'

const pricingFaqs = faqs.filter((f) => /cost|long|maintenance|quotation/i.test(f.q))
</script>

<template>
  <div>
    <PageHero
      eyebrow="Packages & pricing"
      title="Clear options before the quotation conversation."
      lead="See what each package includes and what affects the price, then tell us your needs and we’ll send a written quotation before any work starts."
      :crumbs="[{ label: 'Packages & pricing' }]"
    >
      <router-link class="btn btn--accent btn--lg" to="/contact">Request a quotation</router-link>
    </PageHero>

    <section class="section">
      <div class="container">
        <SectionHeader eyebrow="One-time projects" title="Choose a starting point." lead="Packages show what you receive. We tailor the final scope and quotation to your business." />
        <div class="grid grid--3 packs">
          <div v-for="(p, i) in packages" :key="p.id" v-reveal="i * 70"><PackageCard :pack="p" /></div>
        </div>
      </div>
    </section>

    <section class="section section--alt">
      <div class="container support">
        <div v-reveal class="support__copy">
          <span class="badge">Monthly &amp; ongoing</span>
          <h2>Support doesn’t stop at launch.</h2>
          <p class="lead">
            Support after delivery is part of how we work. Updates, fixes, design help and IT support can be agreed with you as an
            ongoing arrangement — kept separate from the one-time project price so you always know what you are paying for.
          </p>
          <a class="btn" :href="waLink('Hello Millenium Tech, I would like to ask about ongoing support.')" target="_blank" rel="noopener" data-track="whatsapp_click" data-track-label="pricing_support">
            Ask about ongoing support
          </a>
        </div>
        <ul v-reveal="80" class="support__list">
          <li><Icon name="globe" :size="22" /><div><strong>Website care</strong><span>Updates, fixes and content changes after launch.</span></div></li>
          <li><Icon name="palette" :size="22" /><div><strong>Design &amp; social-media support</strong><span>Regular graphics and consistent branding.</span></div></li>
          <li><Icon name="wrench" :size="22" /><div><strong>IT support</strong><span>Practical help for your team’s computers and software.</span></div></li>
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <SectionHeader eyebrow="What affects price" title="A fair quotation starts with a specific scope." lead="We ask about these things so your quotation reflects the work — not a one-size-fits-all number." />
        <div class="grid grid--4">
          <article v-for="(f, i) in priceFactors" :key="f.title" v-reveal="(i % 4) * 60" class="card factor">
            <span class="icon-badge"><Icon :name="f.icon" :size="22" /></span>
            <h3>{{ f.title }}</h3>
            <p>{{ f.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section section--dark">
      <div class="container">
        <SectionHeader center eyebrow="Getting a quotation" title="Three simple steps." class="section-head--band" />
        <ol class="quote-steps">
          <li v-for="(s, i) in quoteSteps" :key="s.title" v-reveal="i * 70">
            <span class="quote-steps__no">{{ i + 1 }}</span>
            <h3>{{ s.title }}</h3>
            <p>{{ s.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section class="section section--alt">
      <div class="container narrow">
        <SectionHeader eyebrow="Pricing questions" title="Answers before you ask." />
        <FaqList :items="pricingFaqs" />
      </div>
    </section>

    <CtaBand eyebrow="Get a tailored quotation" title="Share the work you have in mind." text="A short brief helps us reply with a clearer, more useful next step." primary-label="Request a quotation" />
  </div>
</template>

<style scoped>
.packs {
  padding-top: 0.75rem;
}
.packs > div {
  display: flex;
}
.packs > div > :deep(*) {
  flex: 1;
}
.support {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: clamp(2rem, 5vw, 4rem);
  align-items: center;
}
.support__copy {
  display: grid;
  gap: 1rem;
  justify-items: start;
}
.support__list {
  display: grid;
  gap: 0.75rem;
}
.support__list li {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1.1rem 1.25rem;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: var(--radius-m);
}
.support__list svg {
  flex: none;
  margin-top: 2px;
  color: var(--text-brand);
}
.support__list strong {
  display: block;
  font-family: var(--font-display);
}
.support__list span {
  color: var(--ink-2);
  font-size: var(--text-sm);
}
@media (max-width: 899px) {
  .support {
    grid-template-columns: minmax(0, 1fr);
  }
}
.factor {
  display: grid;
  gap: 0.7rem;
  align-content: start;
}
.factor p {
  color: var(--ink-2);
  font-size: var(--text-sm);
}
.quote-steps {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--s-4);
}
.quote-steps li {
  display: grid;
  gap: 0.6rem;
  align-content: start;
  padding: var(--s-4);
  border: 1px solid var(--line);
  border-radius: var(--radius-l);
}
.quote-steps__no {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--aqua-400);
  color: var(--navy-900);
  font-family: var(--font-display);
  font-weight: 800;
}
.quote-steps p {
  color: var(--muted);
  font-size: var(--text-sm);
}
@media (max-width: 799px) {
  .quote-steps {
    grid-template-columns: minmax(0, 1fr);
  }
}
.narrow {
  max-width: 820px;
}
</style>
