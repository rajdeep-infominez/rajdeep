/* ==================================================
   Main Entry Point - Vue Gallery
   ================================================== */

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

// Global styles
import './styles/base.css';

// Create app instance
const app = createApp(App);

// Install plugins
app.use(createPinia());
app.use(router);

// Mount app
app.mount('#app');
