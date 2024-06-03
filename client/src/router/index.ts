import { createWebHistory, createRouter } from 'vue-router';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Home from '@/views/Home.vue';
import SiteView from '@/views/Tabs/index.vue';
import addTab from '@/views/Tabs/addTab.vue';
import CollectionView from '@/views/Collections/index.vue';
import addCollection from '@/views/Collections/AddCollection.vue';
import editCollection from '@/views/Collections/EditCollection.vue';

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
    path: '/sites/add-tab',
    name: 'AddTab',
    component: addTab,
  },
  {
    path: '/collections',
    name: 'Collections',
    component: CollectionView,
  },
  {
    path: '/collections/add-collection',
    name: 'AddCollection',
    component: addCollection,
  },
  {
    path: '/collections/edit-collection/:id',
    name: 'EditCollection',
    component: editCollection,
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
