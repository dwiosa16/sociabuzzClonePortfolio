import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { patchProp } from 'vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/creator-profil-tribe',
    name: 'creator-profil-tribe',
    component: () => import('../views/CreatorProfileTribeView.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterView.vue'),
  },
];

const router = createRouter({
  // Local
  // history: createWebHistory(),
  // routes,

  // Github Pages Deployment
  // Menggunakan createWebHashHistory adalah cara paling stabil untuk deployment di GitHub Pages.
  // Ini akan membuat URL Anda terlihat seperti: .../sociabuzzClonePortfolio/#/
  // Mode ini menghindari masalah 404 saat me-refresh halaman di sub-direktori.
  history: createWebHashHistory(import.meta.BASE_URL),
  // history: createWebHistory(import.meta.BASE_URL), // Opsi ini juga benar, tapi hash lebih aman.
  routes,
});

export default router;
