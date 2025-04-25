import { createRouter, createWebHistory } from 'vue-router';


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'mainPage',
      component: () => import('@/layout/MainLayout.vue'),
      children: [
        {
          path: '',
          redirect: { name: 'dashboard' },
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/pages/DashboardPage.vue'),
        },
        {
          path: 'schedule',
          name: 'schedule',
          component: () => import('@/pages/SchedulePage.vue'),
        },
        {
          path: 'homework',
          name: 'homework',
          component: () => import('@/pages/HomeworkPage.vue'),
        },
        {
          path: 'add-homework',
          name: 'add-homework',
          component: () => import('@/pages/AddHomeworkPage.vue'),
        },
        {
          path: 'students',
          name: 'students',
          component: () => import('@/pages/StudentsPage.vue'),
        },
        {
          path: 'settings',
          name: 'settings',
          component: () => import('@/pages/SettingsPage.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/LoginPage.vue'),
      beforeEnter: (to, from, next) => {
        // if (localStorage.token) {
        //   next('/');
        // } else {
        //   next();
        // }
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/pages/RegisterPage.vue'),
      beforeEnter: (to, from, next) => {
        // if (localStorage.token) {
        //   next('/');
        // } else {
        //   next();
        // }
      },
    },
    // {
    //   path: '/callback',
    //   name: 'callback',
    //   component: () => import('@/components/AuthenticationCallback.vue'),
    // },
    {
      path: '/:catchAll(.*)',
      redirect: { name: 'dashboard' },
    },
  ],
});

export default router;
