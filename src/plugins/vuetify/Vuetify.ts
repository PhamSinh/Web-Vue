import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import 'vuetify/styles'
// import '@assets/vuetify.scss'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { md3 } from 'vuetify/blueprints'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import { useI18n } from 'vue-i18n'
import i18n from '../i18n/I18n'
import VuetifyTheme from './VuetifyTheme'
import 'vuetify/styles';
export default createVuetify({
    components,
    directives,
    blueprint: md3,
    icons: {
        defaultSet: 'mdi', // This is already the default value - only for display purposes
    },
    locale: {
        adapter: createVueI18nAdapter({ i18n, useI18n }),
    },
    theme: {
        themes: {
            VuetifyTheme
        }
    }
})