import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/pages/Index.vue'),
  },
  {
    path: '/programmatic',
    name: 'programmatic',
    component: () => import('@/pages/Programmatic.vue'),
  },
  {
    path: '/vmodel',
    name: 'vmodel',
    component: () => import('@/pages/VModel.vue'),
  },
];

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
