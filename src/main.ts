import { createApp } from 'vue'
import './assets/scss/style.scss';
import vuetify from "@/plugins/vuetify.ts";
import router from './router';
import App from './App.vue'


const app = createApp(App);

app
    .use(vuetify)
    .use(router)
    .mount("#app");
