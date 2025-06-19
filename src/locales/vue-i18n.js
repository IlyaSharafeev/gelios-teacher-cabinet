import { createI18n } from 'vue-i18n';

import ru from '@/locales/languages/ru.json';
import en from '@/locales/languages/en.json';
import uk from '@/locales/languages/uk.json';

// Отладка: выводим импортированные переводы
console.log('Imported translations:', { ru, en, uk });

const savedLang = localStorage.getItem('selectedLanguage') || 'en';

const i18n = createI18n({
    locale: savedLang,
    fallbackLocale: 'en',
    messages: {
        ru,
        en,
        uk,
    },
    warnHtmlInMessage: 'off',
    silentTranslationWarn: false, // Показываем предупреждения о пропущенных переводах
});

export default i18n;