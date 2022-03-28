import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      converter: 'Currency converter',
      from: 'From',
      to: 'To',
      error_message: 'Server error. Please Try again later',
    },
  },
  ru: {
    translation: {
      converter: 'Конвертер валют',
      from: 'Меняю',
      to: 'Получаю',
      error_message: 'Не удалось получить данные. Попробуйте позже',
    },
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
