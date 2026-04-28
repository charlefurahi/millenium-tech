<template>
  <footer class="footer">
    <div class="footer__glow"></div>
    <div class="container">
      <div class="footer__top">
        <!-- Brand -->
        <div class="footer__brand">
          <router-link to="/" class="footer__logo">
            <img src="@/assets/logo.png" alt="Millenium Tech" class="footer__logo-img" />
            <span>
              <span class="footer__logo-name">Millenium<span class="text-cyan">Tech</span></span>
              <span class="footer__logo-sub">IT Solutions Point</span>
            </span>
          </router-link>
          <p class="footer__desc">
            Your trusted technology partner in Tanzania. From web development to computer repair — we make tech work for you.
          </p>
          <div class="footer__socials">
            <a href="#" aria-label="WhatsApp" class="footer__social">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            </a>
            <a href="#" aria-label="Facebook" class="footer__social">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="#" aria-label="Instagram" class="footer__social">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="footer__col">
          <h4 class="footer__col-title">Quick Links</h4>
          <ul class="footer__col-links">
            <li v-for="link in navLinks" :key="link.path">
              <router-link :to="link.path">{{ link.label }}</router-link>
            </li>
          </ul>
        </div>

        <!-- Services -->
        <div class="footer__col">
          <h4 class="footer__col-title">Services</h4>
          <ul class="footer__col-links">
            <li v-for="s in services" :key="s"><span>{{ s }}</span></li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="footer__col">
          <h4 class="footer__col-title">Contact Us</h4>
          <ul class="footer__contact-list">
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.1 2.18 2 2 0 012.1 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>
              <a href="tel:+255755794664">+255 755 794 664</a>
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.1 2.18 2 2 0 012.1 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>
              <a href="tel:+255616533644">+255 616 533 644</a>
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>Dar es Salaam - Tanzania</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="footer__bottom">
        <p>© {{ new Date().getFullYear() }} Millenium Tech. All rights reserved.</p>
        <p class="footer__bottom-right">Crafted with <span class="text-cyan">Millenium-Tech</span>Tz</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/services', label: 'Services' },
  { path: '/about', label: 'About Us' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/contact', label: 'Contact' },
]
const services = [
  'Graphics Designing',
  'Website Development',
  'Computer Repair',
  'Photo Editing',
  'Online Services',
  'Laptop Sales',
]
</script>

<style scoped>
.footer {
  background: var(--navy-900);
  border-top: 1px solid var(--white-08);
  padding: 5rem 0 0;
  position: relative;
  overflow: hidden;
}
.footer__glow {
  position: absolute;
  top: 0; left: 50%;
  transform: translate(-50%, -50%);
  width: 600px; height: 300px;
  background: radial-gradient(ellipse, rgba(34,211,238,0.06) 0%, transparent 70%);
  pointer-events: none;
}
.footer__top {
  display: grid;
  grid-template-columns: 1.8fr 1fr 1fr 1.2fr;
  gap: 3rem;
  padding-bottom: 4rem;
  border-bottom: 1px solid var(--white-08);
}
.footer__logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  margin-bottom: 1.2rem;
}
.footer__logo-img {
  width: 40px; height: 40px;
  object-fit: contain;
}
.footer__logo-name {
  display: block;
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--white);
}
.footer__logo-sub {
  display: block;
  font-size: 0.62rem;
  color: var(--white-40);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-top: 2px;
}
.footer__desc {
  font-size: 0.875rem;
  color: var(--white-70);
  line-height: 1.7;
  margin-bottom: 1.5rem;
  max-width: 300px;
}
.footer__socials {
  display: flex;
  gap: 0.75rem;
}
.footer__social {
  width: 38px; height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--white-08);
  border: 1px solid var(--white-15);
  border-radius: 8px;
  color: var(--white-70);
  transition: all 0.3s var(--ease-out);
}
.footer__social:hover {
  background: var(--cyan-glow);
  border-color: var(--cyan-400);
  color: var(--cyan-400);
  transform: translateY(-3px);
}
.footer__col-title {
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--white);
  margin-bottom: 1.25rem;
}
.footer__col-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.footer__col-links li a,
.footer__col-links li span {
  font-size: 0.875rem;
  color: var(--white-70);
  transition: color 0.3s;
  text-decoration: none;
}
.footer__col-links li a:hover { color: var(--cyan-400); }
.footer__contact-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}
.footer__contact-list li {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 0.875rem;
  color: var(--white-70);
}
.footer__contact-list li svg { color: var(--cyan-400); flex-shrink: 0; }
.footer__contact-list li a { color: var(--white-70); text-decoration: none; transition: color 0.3s; }
.footer__contact-list li a:hover { color: var(--cyan-400); }
.footer__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 0;
  font-size: 0.8rem;
  color: var(--white-40);
}

@media (max-width: 900px) {
  .footer__top {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  .footer__brand { grid-column: 1 / -1; }
}
@media (max-width: 560px) {
  .footer__top { grid-template-columns: 1fr; }
  .footer__bottom { flex-direction: column; gap: 0.4rem; text-align: center; }
}
</style>
