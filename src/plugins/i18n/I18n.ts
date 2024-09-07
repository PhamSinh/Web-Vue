import { createI18n } from 'vue-i18n'
// import messages from './locales'
import datetimeFormats from './datetimeFormats'
import numberFormats from './numberFormats'
import en from './en.json';
import vi from './vi.json';
export default createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    vi
  },
  datetimeFormats,
  numberFormats,
})