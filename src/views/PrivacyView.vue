<script setup lang="ts">
import PageHero from '@/components/ui/PageHero.vue'
import { site, mailtoLink } from '@/config/site'
</script>

<template>
  <div>
    <PageHero eyebrow="Legal" title="Privacy policy" lead="How Millenium Tech handles the information you share through this website." :crumbs="[{ label: 'Privacy policy' }]" />
    <section class="section">
      <div class="container">
        <article class="prose">
          <h2>What we collect</h2>
          <p>When you send an enquiry through our contact form, we receive the details you enter: your name, phone or WhatsApp number, your email (if you add it), your business name (optional), the service you need, your budget range (optional), your preferred contact method and your message.</p>

          <h2>How we use it</h2>
          <p>We use this information only to reply to your enquiry and to prepare a quotation or advice about your project. We do not sell your information.</p>

          <h2>Form processing</h2>
          <p>Enquiries are delivered to us by Formspree, a third-party form service, which processes the form data on our behalf. You can read how they handle data at <a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noopener">formspree.io/legal/privacy-policy</a>.</p>

          <h2>Chat assistant</h2>
          <p>If the MilleBot chat assistant is available on this site, the messages you type are sent to our server and to an AI language-model provider so that it can reply. Please do not share sensitive personal information in the chat.</p>

          <h2>Your choices</h2>
          <p>You can ask us to correct or delete the information you have sent us at any time by contacting us at <a :href="mailtoLink('Privacy request')">{{ site.email }}</a> or on WhatsApp.</p>

          <h2>Cookies and analytics</h2>
          <p>This website does not use advertising cookies. If we add privacy-friendly analytics in the future, we will only measure things like whether the contact form or WhatsApp button is used, and we will update this page.</p>

          <h2>Contact</h2>
          <p>{{ site.name }}, {{ site.location.city }}, {{ site.location.country }}. Email: <a :href="mailtoLink('Privacy question')">{{ site.email }}</a>.</p>
        </article>
      </div>
    </section>
  </div>
</template>
