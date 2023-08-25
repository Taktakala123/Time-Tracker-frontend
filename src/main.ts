import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config';

import "primevue/resources/themes/saga-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core CSS
import "primeicons/primeicons.css"; //icons
import 'primeflex/primeflex.css';

import Button from 'primevue/button';

createApp(App)
.use(PrimeVue)
.component("Button", Button)
.mount('#app');
