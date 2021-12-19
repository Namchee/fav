import { createApp } from 'vue';

import { createHead } from '@vueuse/head';
import { router } from '@/router/routes';

import 'nprogress/nprogress.css';
import 'virtual:windi.css';
import '@/assets/style.css';

const app = createApp({});
const head = createHead();
app.use(router);
app.use(head);

app.mount('#app');
