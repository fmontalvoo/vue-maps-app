import { createApp } from 'vue'
import { createPinia } from 'pinia'

import mapboxgl from 'mapbox-gl'

import App from './App.vue'
import router from './router'

const token = import.meta.env.VITE_MAPBOX_TOKEN

mapboxgl.accessToken = token

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
