<script setup lang="ts">
import Icon from '@/components/ui/Icon.vue'
import type { IconName } from '@/components/ui/icons'
import logo from '@/assets/img/logo-white.webp'
import { services } from '@/data/services'
import {
  site,
  waLink,
  mailtoLink,
  telLink,
  type SocialKey
} from '@/config/site'

/** Slim footer for auth/account utility pages — brand + bottom bar only,
 *  no sitemap columns. Keeps the same component everywhere else. */
withDefaults(defineProps<{ minimal?: boolean }>(), { minimal: false })

const year = new Date().getFullYear()

const socialLabels: Record<SocialKey, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  threads: 'Threads'
}

/*
 * Only real, configured profiles are shown.
 * Never placeholder links.
 */
const socials = (Object.keys(site.social) as SocialKey[])
  .filter((k) => site.social[k])
  .map((k) => ({
    key: k,
    label: socialLabels[k],
    url: site.social[k],
    icon: k as IconName
  }))


const pages = [
  { to: '/about', label: 'About us' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/pricing', label: 'Packages & pricing' },
  { to: '/contact', label: 'Contact' },
  { to: '/privacy', label: 'Privacy policy' }
]
</script>


<template>

  <footer class="site-footer" :class="{ 'site-footer--minimal': minimal }">

    <div class="container footer__grid" :class="{ 'footer__grid--minimal': minimal }">

      <!-- Brand -->

      <div class="footer__brand">

        <router-link
          to="/"
          aria-label="Millenium Tech — home"
        >
          <img
            :src="logo"
            alt="Millenium Tech"
            width="168"
            height="111"
            loading="lazy"
          />
        </router-link>


        <p>
          Practical websites, digital design and technology
          support for businesses in Tanzania.
        </p>


        <ul
          v-if="socials.length"
          class="footer__social"
          aria-label="Social media"
        >

          <li
            v-for="s in socials"
            :key="s.key"
          >

            <a
              :href="s.url"
              target="_blank"
              rel="noopener"
              :aria-label="`Millenium Tech on ${s.label}`"
            >
              <Icon
                :name="s.icon"
                :size="20"
              />
            </a>

          </li>

        </ul>

      </div>


      <!-- Services -->

      <nav v-if="!minimal" aria-label="Services">

        <h2>Services</h2>

        <ul>

          <li
            v-for="s in services"
            :key="s.slug"
          >
            <router-link :to="s.path">
              {{ s.title }}
            </router-link>
          </li>

        </ul>

      </nav>


      <!-- Company -->

      <nav v-if="!minimal" aria-label="Company">

        <h2>Company</h2>

        <ul>

          <li
            v-for="p in pages"
            :key="p.to"
          >
            <router-link :to="p.to">
              {{ p.label }}
            </router-link>
          </li>

        </ul>

      </nav>


      <!-- Contact -->

      <div v-if="!minimal">

        <h2>Contact</h2>

        <ul class="footer__contact">

          <li>
            <Icon
              name="whatsapp"
              :size="18"
            />

            <a
              :href="waLink()"
              target="_blank"
              rel="noopener"
              data-track="whatsapp_click"
              data-track-label="footer"
            >
              WhatsApp {{ site.whatsapp.display }}
            </a>
          </li>


          <li
            v-for="p in site.phones"
            :key="p.tel"
          >
            <Icon
              name="phone"
              :size="18"
            />

            <a
              :href="telLink(p.tel)"
              data-track="call_click"
              data-track-label="footer"
            >
              {{ p.display }}
            </a>
          </li>


          <li>
            <Icon
              name="mail"
              :size="18"
            />

            <a
              :href="mailtoLink()"
              data-track="email_click"
              data-track-label="footer"
            >
              {{ site.email }}
            </a>
          </li>


          <li>
            <Icon
              name="map-pin"
              :size="18"
            />

            <span>
              {{ site.location.city }},
              {{ site.location.country }}
            </span>
          </li>


          <li>
            <Icon
              name="clock"
              :size="18"
            />

            <span>
              {{ site.hours }}
            </span>
          </li>

        </ul>

      </div>

    </div>


    <!-- Bottom -->

    <div class="container footer__bottom">

      <span>
        © {{ year }}
        {{ site.name }}.
        All rights reserved.
      </span>

      <router-link to="/privacy">
        Privacy policy
      </router-link>

    </div>

  </footer>

</template>


<style scoped>

.site-footer {

  /*
   * CLEAN FOOTER.
   *
   * No network image.
   * No hex pattern.
   */
  background: var(--navy-900);

  color: var(--on-dark-2);

  padding-top:
    clamp(3rem, 6vw, 4.5rem);

  font-size: var(--text-sm);
}

/* Minimal — auth/account pages: brand + bottom bar only. */
.site-footer--minimal {
  padding-top: clamp(1.75rem, 4vw, 2.5rem);
}

.footer__grid--minimal {
  grid-template-columns: minmax(0, 1fr);
}

.footer__grid--minimal .footer__brand {
  max-width: none;
}


/* Footer grid */

.footer__grid {

  display: grid;

  grid-template-columns:
    1.3fr
    1fr
    0.8fr
    1.3fr;

  gap:
    clamp(1.75rem, 4vw, 3rem);
}


/* Brand */

.footer__brand {

  display: grid;

  gap: 1.1rem;

  align-content: start;

  max-width: 320px;
}

.footer__brand img {

  width: 128px;

  height: auto;
}


/* Headings */

h2 {

  margin-bottom: 1rem;

  font-family:
    var(--font-display);

  font-size: 0.78rem;

  font-weight: 800;

  letter-spacing: 0.14em;

  text-transform: uppercase;

  color: #fff;
}


/* Lists */

ul {

  display: grid;

  gap: 0.2rem;
}


nav a {

  display: inline-flex;

  align-items: center;

  min-height: 36px;
}


a {

  transition:
    color 0.2s ease;
}


a:hover {

  color: var(--aqua-300);
}


/* Contact */

.footer__contact li {

  display: flex;

  align-items: flex-start;

  gap: 0.7rem;

  padding-block: 0.35rem;
}


.footer__contact svg {

  flex: none;

  margin-top: 3px;

  color: var(--aqua-300);
}


/* Social */

.footer__social {

  display: flex;

  gap: 0.6rem;
}


.footer__social a {

  display: grid;

  place-items: center;

  width: 44px;
  height: 44px;

  border:
    1px solid
    var(--line-dark);

  border-radius:
    var(--radius-m);

  background:
    rgba(255, 255, 255, 0.025);

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}


.footer__social a:hover {

  background:
    rgba(95, 216, 238, 0.10);

  border-color:
    rgba(95, 216, 238, 0.35);

  transform:
    translateY(-2px);
}


/* Bottom */

.footer__bottom {

  display: flex;

  flex-wrap: wrap;

  justify-content: space-between;

  gap: 0.75rem;

  margin-top:
    clamp(2rem, 4vw, 3rem);

  padding-block:
    1.25rem;

  border-top:
    1px solid
    var(--line-dark);

  font-size: 0.85rem;

  color: var(--on-dark-3);
}


/* ================================================================
   Tablet
   ================================================================ */

@media (max-width: 1023px) {

  .footer__grid {

    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }


  .footer__brand {

    grid-column: 1 / -1;

    max-width: none;
  }
}


/* ================================================================
   Mobile
   ================================================================ */

@media (max-width: 599px) {

  .footer__grid {

    grid-template-columns:
      minmax(0, 1fr);
  }


  /*
   * Leave room for floating action buttons.
   */
  .footer__bottom {

    padding-bottom: 5.5rem;
  }

}

</style>