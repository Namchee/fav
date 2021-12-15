import { createApp } from 'vue/dist/vue.esm-bundler';

import { createHead } from '@vueuse/head';
import { router } from '@/router/routes';

import 'virtual:windi.css';

const app = createApp({});
const head = createHead();
app.use(router);
app.use(head);

app.mount('#app');
