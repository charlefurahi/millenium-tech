<template>
  <div class="products-page">
    <section class="page-hero">
      <div class="page-hero__orb page-hero__orb--1"></div><div class="page-hero__orb page-hero__orb--2"></div>
      <div class="container page-hero__inner">
        <div class="section-label">Millenium Tech products</div>
        <h1 class="page-hero__title">From custom projects to <span class="gradient-text">reusable platforms.</span></h1>
        <p class="page-hero__subtitle">Our product direction is simple: solve repeated problems once, then make the solution easier to adopt, maintain and grow.</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="product-grid">
          <article v-for="product in products" :key="product.name" class="product-card glass-card">
            <div class="product-card__top"><span class="product-card__icon" aria-hidden="true" v-html="product.icon"></span><span class="product-card__status">Coming as a platform</span></div>
            <h2>{{ product.name }}</h2><p>{{ product.description }}</p>
            <div class="product-card__features"><span v-for="feature in product.features" :key="feature">{{ feature }}</span></div>
            <router-link :to="`/request-project?product=${product.slug}`" class="btn btn-outline">Discuss the product</router-link>
          </article>
        </div>
        <div class="product-note glass-card">
          <div class="product-note__icon" aria-hidden="true"><svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 3v18M3 12h18"/><circle cx="12" cy="12" r="9"/></svg></div>
          <div><h3>Have a different workflow?</h3><p>Start with a project request. We can validate the problem before deciding whether it should become a custom build or a reusable product.</p></div>
          <router-link to="/request-project" class="text-link">Start discovery →</router-link>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
const products=[
 {slug:'millennium-school',name:'Millennium School',description:'A future-ready school platform for admissions, student records, communication, attendance, fees and academic workflows.',features:['Admissions','Student records','Parent communication','Expandable modules'],icon:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="m3 10 9-5 9 5-9 5-9-5Z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/></svg>'},
 {slug:'millennium-church',name:'Millennium Church',description:'A church-focused platform for member information, ministries, events, communication and digital presence.',features:['Member workflows','Ministry management','Events','Church website'],icon:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 3v18M7 8h10M5 21h14M8 12h8"/></svg>'},
 {slug:'millennium-business',name:'Millennium Business',description:'A lightweight digital operating layer for small businesses that need customers, products, enquiries and support in one place.',features:['Customer enquiries','Product catalogue','Simple operations','Support portal'],icon:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9h10M7 13h6"/></svg>'}
]
</script>
<style scoped>
.products-page{background:var(--bg-primary);color:var(--text-primary)}.product-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}.product-card{padding:28px;display:flex;flex-direction:column;min-height:380px}.product-card__top{display:flex;justify-content:space-between;gap:12px;align-items:center}.product-card__icon,.product-note__icon{width:50px;height:50px;display:grid;place-items:center;border-radius:15px;background:var(--cyan-soft);color:var(--cyan-text);border:1px solid var(--glass-border)}.product-card__status{font-size:.65rem;text-transform:uppercase;letter-spacing:.1em;color:var(--text-muted)}.product-card h2{font-size:1.45rem;margin:25px 0 10px}.product-card p{color:var(--text-secondary);line-height:1.75}.product-card__features{display:flex;flex-wrap:wrap;gap:8px;margin:22px 0 28px}.product-card__features span{padding:7px 10px;border:1px solid var(--border-soft);border-radius:999px;color:var(--text-secondary);font-size:.75rem}.product-card .btn{margin-top:auto;align-self:flex-start}.product-note{margin-top:28px;padding:25px;display:grid;grid-template-columns:auto 1fr auto;gap:18px;align-items:center}.product-note h3{margin-bottom:5px}.product-note p{color:var(--text-secondary);font-size:.9rem}.text-link{color:var(--cyan-text);font-weight:700;white-space:nowrap}@media(max-width:900px){.product-grid{grid-template-columns:1fr 1fr}}@media(max-width:620px){.product-grid{grid-template-columns:1fr}.product-note{grid-template-columns:auto 1fr}.product-note .text-link{grid-column:2}}
</style>
