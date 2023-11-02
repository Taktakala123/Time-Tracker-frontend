import './assets/main.css'
import '@/assets/styles.scss';

import { createApp } from 'vue'
import App from './App.vue' 

import PrimeVue from 'primevue/config';

import "primevue/resources/themes/saga-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core CSS
import "primeicons/primeicons.css"; //icons
import 'primeflex/primeflex.css';

import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';


import router from './router';
import { createPinia } from 'pinia'


const pinia = createPinia()
const app = createApp(App);
app.use(ToastService);
app.use(router)
app.use(pinia)
app.use(PrimeVue)
app.component("Button", Button)
app.component("Toast", Toast)
app.component("InputText", InputText)
app.mount('#app');
