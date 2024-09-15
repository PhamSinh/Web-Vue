const AuthRoutes = {
  path: '/auth',
  component: () => import('@layouts/blank/BlankLayout.vue'),
  meta: {
    requiresAuth: false
  },
  children: [
    {
      name: 'Login',
      path: '/login',
      component: () => import('@components/LoginPage.vue')
    },
    {
      name: 'Register',
      path: '/register',
      component: () => import('@components/RegisterPage.vue')
    },
    {
      name: 'Error 404',
      path: '/pages/error',
      component: () => import('@views/pages/maintenance/error/Error404Page.vue')
    },
    {
      title: 'Dashboard Admin',
      path: '/admin/dashboard',
      component: () => import('@components/AdminDashboard.vue')
    },
    {
      title: 'Feature',
      path: '/admin/feature',
      component: () => import('@components/AdminFeature.vue')
    },
    {
      title: 'Config',
      path: '/admin/config',
      component: () => import('@components/AdminConfig.vue')
    }
  ]
};

export default AuthRoutes;
