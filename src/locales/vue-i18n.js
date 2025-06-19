import { createI18n } from 'vue-i18n';

// Загрузка переводов
import ru from './languages/ru.js';
import en from './languages/en.js';
import uk from './languages/uk.js';

// Получение сохраненного языка из localStorage
const savedLang = localStorage.getItem('selectedLanguage') || 'en';

// Настройка i18n
const i18n = createI18n({
    locale: savedLang,
    fallbackLocale: 'en',
    messages: {
        ru,
        en,
        uk,
    },
});

export default i18n;