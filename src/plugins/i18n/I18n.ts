
import { createI18n } from 'vue-i18n'
import { en, vi } from 'vuetify/locale'
import MessageEn from '@assets/locales/message_en.json'
import MessageVi from '@assets/locales/message_vi.json'
import datetimeFormats from './datetimeFormats'
import numberFormats from './numberFormats'

const messages = {
    en: {
        ...MessageEn,
        $vuetify: {
            ...en,
            ...MessageEn.$vuetify
        },
    },
    vi: {
        ...MessageVi,
        $vuetify: {
            ...vi,
            ...MessageVi.$vuetify
        },
    },
}

type MessageSchema = typeof MessageEn

export default createI18n<[MessageSchema], 'en' | 'vi', false, {}>({
    legacy: false, // Vuetify does not support the legacy mode of vue-i18n, you must set `false`, to use Composition API
    locale: 'vi',
    fallbackLocale: 'en',
    messages,
    datetimeFormats,
    numberFormats,
})
