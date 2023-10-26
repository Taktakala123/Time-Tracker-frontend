import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue' 

import PrimeVue from 'primevue/config';

import "primevue/resources/themes/saga-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core CSS
import "primeicons/primeicons.css"; //icons
import 'primeflex/primeflex.css';

import Button from 'primevue/button';
import router from './router';
import { createPinia } from 'pinia'


const pinia = createPinia()
const app = createApp(App);
app.use(router)
app.use(pinia)
app.use(PrimeVue)
app.component("Button", Button)
app.mount('#app');
