import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import store from './store'; // Import store
import router from './router';
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
// import { createI18n } from 'vue-i18n'
import i18n from '@plugins/i18n/I18n'
const vuetify = createVuetify({
  components,
  directives,
})

createApp(App)
  .use(vuetify)
  .use(i18n)
  .use(router)
  .use(store)
  .mount('#app')