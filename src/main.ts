import { createApp } from 'vue'
import './assets/scss/style.scss';
import vuetify from "@/plugins/vuetify.ts";
import router from './router';
import App from './App.vue'
import { createPinia } from 'pinia';
import "vue-multiselect/dist/vue-multiselect.min.css";

const pinia = createPinia();
const app = createApp(App);

app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .mount("#app");
