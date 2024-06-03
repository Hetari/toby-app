import { createWebHistory, createRouter } from 'vue-router';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Home from '@/views/Home.vue';
import SiteView from '@/views/Tabs/index.vue';

const routes = [
  {
    path: '/',
    name: 'home', // or any name you want
    component: Home,
  },
  {
    path: '/sites',
    name: 'Sites',
    component: SiteView,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
];

const router = createRouter({
  history: createWebHistory('./'),
  routes: routes,
});

export default router;
