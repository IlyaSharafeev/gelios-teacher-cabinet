import { createApp } from 'vue'
import './assets/scss/style.scss';
import vuetify from "@/plugins/vuetify.ts";
import router from './router';
import App from './App.vue'
import { createPinia } from 'pinia';
import "vue-multiselect/dist/vue-multiselect.min.css";
import Notifications from '@kyvg/vue3-notification'
import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import uk from './locales/uk.json';

const pinia = createPinia();
const app = createApp(App);

const i18n = createI18n({
  legacy: false,
  locale: 'uk',
  fallbackLocale: 'en',
  messages: { en, uk }
});

app
    .use(Notifications)
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(i18n)
    .mount("#app");
