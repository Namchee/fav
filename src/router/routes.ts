import { createRouter, createWebHistory } from 'vue-router';

import NProgress from 'nprogress';

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => {
    return { top: 0 };
  },
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
    {
      path: '/404',
      component: () => import('./pages/404.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
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
