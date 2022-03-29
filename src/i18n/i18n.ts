import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import commonEN from '../locales/en/common.json';
import commonRU from '../locales/ru/common.json';
import currencyEN from '../locales/en/currency.json';
import currencyRU from '../locales/ru/currency.json';

const resources = {
  en: {
    common: commonEN,
    currency: currencyEN,
  },
  ru: {
    common: commonRU,
    currency: currencyRU,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ru',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
