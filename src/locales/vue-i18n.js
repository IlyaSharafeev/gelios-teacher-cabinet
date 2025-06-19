import { createI18n } from 'vue-i18n';

// Загрузка переводов
import ru from './languages/ru.json';
import en from './languages/en.json';
import uk from './languages/uk.json';

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