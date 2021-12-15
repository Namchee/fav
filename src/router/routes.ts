import { createRouter, createWebHistory } from 'vue-router';

import NProgress from 'nprogress';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      alias: '/home',
      component: () => import('./pages/index.vue'),
    },
    {
      path: '/about',
      component: () => import('./pages/about.vue'),
    },
  ],
});

router.beforeEach(() => {
  NProgress.start();
});

router.onError(() => {
  NProgress.done();
});
router.afterEach(() => {
  NProgress.done();
});

export { router };
