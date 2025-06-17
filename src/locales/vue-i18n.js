import { createI18n } from 'vue-i18n';

// Загрузка переводов
import ru from './languages/ru.js';
import en from './languages/en.js';
import uk from './languages/uk.js';

// Настройка i18n
const i18n = createI18n({
    locale: 'en', // Язык по умолчанию
    fallbackLocale: 'en', // Язык, если перевод отсутствует
    messages: {
        ru,
        en,
        uk,
    },
});

export default i18n;