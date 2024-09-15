const MainRoutes = {
  path: '/main',
  meta: {
    requiresAuth: false
  },
  component: () => import('@layouts/full/FullLayout.vue'),
  children: [
    {
      name: 'LandingPage',
      path: '/',
      component: () => import('@components/Dashboard.vue')
    },
    {
      name: 'Dashboard',
      path: '/dashboard',
      component: () => import('@components/Dashboard.vue')
    },
    {
      name: 'Tabler Icons',
      path: '/icons/tabler',
      component: () => import('@views/utilities/icons/TablerIcons.vue')
    },
    {
      name: 'Typography',
      path: '/utils/typography',
      component: () => import('@views/utilities/typography/TypographyPage.vue')
    },
    {
      name: 'Shadows',
      path: '/utils/shadows',
      component: () => import('@views/utilities/shadows/ShadowPage.vue')
    },
    {
      name: 'Screen',
      path: '/screen',
      component: () => import('@components/NewScreen.vue')
    },
    {
      name: 'Screen1',
      path: '/screen1',
      component: () => import('@components/NewScreen1.vue')
    },
    {
      name: 'Shadows',
      path: '/utils/shadows',
      component: () => import('@views/utilities/shadows/ShadowPage.vue')
    },
    {
      name: 'Admin Dashboard',
      path: '/admin/dashboard',
      component: () => import('@components/AdminDashboard.vue')
    },
    {
      name: 'Admin Feature',
      path: '/admin/feature',
      component: () => import('@components/AdminFeature.vue')
    },
    {
      name: 'Admin Config',
      path: '/admin/config',
      component: () => import('@components/AdminConfig.vue')
    },
    {
      name: 'Colors',
      path: '/utils/colors',
      component: () => import('@views/utilities/colors/ColorPage.vue')
    }
  ]
};

export default MainRoutes;
