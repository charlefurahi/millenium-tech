import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { reveal } from './utils/reveal'
import { initClickTracking } from './utils/track'
import { useAuth } from './composables/useAuth'
import './styles/globals.css'

createApp(App).use(router).directive('reveal', reveal).mount('#app')

initClickTracking()

// Validate any stored login token against the backend once, on load.
// A guest visitor has no token, so this resolves instantly for them.
useAuth().init()
