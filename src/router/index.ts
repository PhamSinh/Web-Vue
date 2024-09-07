import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../components/LoginForm.vue'),
  },
  {
    path: '/new-screen',
    name: 'NewScreen',
    component: () => import(/* webpackChunkName: "new-screen" */ '../components/NewScreen.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
