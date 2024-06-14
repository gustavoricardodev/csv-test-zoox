import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import DetailView from '../views/DetailView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { breadcrumbLabel: 'Início' }
  },
  {
    path: '/detail/:slug',
    name: 'detail',
    component: DetailView,
    meta: { breadcrumbLabel: 'Detalhe do CSV' }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
