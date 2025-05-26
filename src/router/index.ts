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
      path: '/:catchAll(.*)',
      redirect: { name: 'login' }, // Redirect unknown routes to login
    },
  ],
});

// Global navigation guard for authentication
router.beforeEach((to, from, next) => {
  const token = localStorage.token;

  // Check if the route requires authentication
  if (to.meta.requiresAuth) {
    if (!token) {
      // No token, redirect to login
      next({ name: 'login' });
    } else {
      // Optionally, validate token (e.g., check if it's expired or invalid)
      // This is a placeholder for token validation logic
      try {
        // Example: Add your token validation logic here (e.g., decode JWT, check expiry)
        // If token is invalid, clear it and redirect to login
        // For now, assuming token is a simple string check
        if (token === 'invalid' || !token) { // Replace with actual validation
          localStorage.removeItem('token');
          next({ name: 'login' });
        } else {
          next(); // Valid token, proceed
        }
      } catch (error) {
        // Handle token validation error
        localStorage.removeItem('token');
        next({ name: 'login' });
      }
    }
  } else {
    next(); // Route doesn't require auth, proceed
  }
});

export default router;