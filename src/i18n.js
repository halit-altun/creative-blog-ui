import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLanguageCookie } from './utils/languageCookie';
import resources from './locales/resources';

const savedLanguage = getLanguageCookie() || 'en';

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  fallbackLng: 'en',
  supportedLngs: ['tr', 'en', 'de'],
  ns: [
    'home',
    'about',
    'projects',
    'contact',
    'blog',
    'blog-detail',
    'layout/navbar',
    'layout/footer',
  ],
  defaultNS: 'home',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
