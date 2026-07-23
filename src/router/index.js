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
  history: createWebHistory(),
  routes,
});

export default router;
