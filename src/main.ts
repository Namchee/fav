import { createApp } from 'vue';

import { createHead } from '@vueuse/head';
import { router } from '@/router/routes';

import { registerSW } from 'virtual:pwa-register';

import 'nprogress/nprogress.css';
import '@/assets/style.css';

registerSW();

const app = createApp({});
const head = createHead();
app.use(router);
app.use(head);

app.mount('#app');
