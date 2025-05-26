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
          meta: { requiresAuth: true },
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
    {
      path: '/reset-password',
      name: 'reset-password',
      component: () => import('@/pages/LoginPage.vue'),
      beforeEnter: (to, from, next) => {
        if (localStorage.token) {
          next('/');
        } else if (!to.query.token) {
          next('/login');
        } else {
          next();
        }
      },
    },
    {
      path: '/:catchAll(.*)',
      redirect: { name: 'login' },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.token;

  if (to.meta.requiresAuth) {
    if (!token) {
      next({ name: 'login' });
    } else {
      try {
        if (token === 'invalid' || !token) {
          localStorage.removeItem('token');
          next({ name: 'login' });
        } else {
          next();
        }
      } catch (error) {
        localStorage.removeItem('token');
        next({ name: 'login' });
      }
    }
  } else {
    next();
  }
});

export default router;