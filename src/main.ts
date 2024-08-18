import { createApp } from 'vue'
import './style.scss'
import App from '@/App.vue'
import vuetify from '@plugins/vuetify/Vuetify'
import I18n from '@plugins/i18n/I18n'

const VUE = createApp(App)

VUE.use(I18n)
VUE.use(vuetify)

VUE.mount('#app')
