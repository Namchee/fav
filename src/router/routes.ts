import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      alias: '/home',
      component: () => import('./pages/index.vue'),
      meta: {
        title: 'Modern Favicon Generator — Fav',
      },
    },
    {
      path: '/about',
      component: () => import('./pages/about.vue'),
      meta: {
      },
    },
  ],
});

export { router };
