import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import store from './store'; // Import store
import { router } from '@router/index.ts';
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createPinia } from 'pinia';
const vuetify = createVuetify({
  components,
  directives,
})

createApp(App)
  .use(vuetify)
  .use(router)
  .use(store)
  .use(createPinia())
  .mount('#app')