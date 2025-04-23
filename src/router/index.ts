import { createRouter, createWebHistory } from 'vue-router';


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '',
      name: 'mainPage',
      component: () => import('@/layout/MainLayout.vue'),
      beforeEnter: (to, from, next) => {
        if (!localStorage.token) {
          next('/login');
        } else {
          next();
        }
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/LoginPage.vue'),
      beforeEnter: (to, from, next) => {
        if (localStorage.token) {
          next('/');
        } else {
          next();
        }
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/pages/RegisterPage.vue'),
      beforeEnter: (to, from, next) => {
        if (localStorage.token) {
          next('/');
        } else {
          next();
        }
      },
    },
    // {
    //   path: '/callback',
    //   name: 'callback',
    //   component: () => import('@/components/AuthenticationCallback.vue'),
    // },
    {
      path: '/:catchAll(.*)',
      redirect: { name: 'mainPage' },
    },
  ],
});

export default router;
