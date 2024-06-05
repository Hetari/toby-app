import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css';

import Toast, { PluginOptions } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
const options: PluginOptions = {};

createApp(App).use(router).use(Toast, options).mount('#app');
