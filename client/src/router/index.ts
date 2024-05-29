import { createWebHistory, createRouter } from 'vue-router';
import Login from '@/views/Login.vue';
import Home from '@/views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'home', // or any name you want
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
];

// router.addRoute({ path: '/about', component: About });

const router = createRouter({
  history: createWebHistory('./'),
  routes: routes,
});

export default router;
