import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './styles/globals.css'

// Views
import HomeView from './views/HomeView.vue'
import ServicesView from './views/ServicesView.vue'
import AboutView from './views/AboutView.vue'
import PortfolioView from './views/PortfolioView.vue'
import ContactView from './views/ContactView.vue'
import NotFoundView from './views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/',           name: 'home',      component: HomeView },
    { path: '/services',   name: 'services',  component: ServicesView },
    { path: '/about',      name: 'about',     component: AboutView },
    { path: '/portfolio',  name: 'portfolio', component: PortfolioView },
    { path: '/contact',    name: 'contact',   component: ContactView },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView }
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  }
})

createApp(App).use(router).mount('#app')
