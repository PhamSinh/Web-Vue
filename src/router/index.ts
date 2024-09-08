import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@components/LoginForm.vue'),
  },
  {
    path: '/new-screen',
    name: 'NewScreen',
    component: () => import(/* webpackChunkName: "new-screen" */ '@components/NewScreen.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '@components/Dashboard.vue'),
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: () => import(/* webpackChunkName: "admin-dashboard" */ '@components/AdminDashboard.vue'),
  },
  {
    path: '/admin/feature',
    name: 'AdminFeature',
    component: () => import(/* webpackChunkName: "admin-feature" */ '@components/AdminFeature.vue'),
  },
  {
    path: '/admin/config',
    name: 'AdminConfig',
    component: () => import(/* webpackChunkName: "admin-config" */ '@components/AdminConfig.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
