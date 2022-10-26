import { createApp } from 'vue'
import App from './App.vue'

import { store } from './store'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import '@fortawesome/fontawesome-free/css/all.css'

createApp(App)
    .use(store)
    .use(router)
    .mount('#app')
