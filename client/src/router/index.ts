import { createWebHistory, createRouter } from 'vue-router';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
// import Home from '@/views/Home.vue';

import SiteView from '@/views/Tabs/index.vue';
import addTab from '@/views/Tabs/addTab.vue';
import editTab from '@/views/Tabs/editTab.vue';

import TagView from '@/views/Tags/index.vue';
import addTag from '@/views/Tags/addTag.vue';
import editTag from '@/views/Tags/editTag.vue';

import CollectionView from '@/views/Collections/index.vue';
import addCollection from '@/views/Collections/AddCollection.vue';
import editCollection from '@/views/Collections/EditCollection.vue';

const routes = [
  {
    path: '/',
    name: 'Sites',
    component: SiteView,
  },
  {
    path: '/sites/add-tab',
    name: 'AddTab',
    component: addTab,
  },
  {
    path: '/sites/edit/:id',
    name: 'EditTab',
    component: editTab,
  },
  {
    path: '/tags',
    name: 'Tags',
    component: TagView,
  },
  {
    path: '/tags/add-tag',
    name: 'AddTag',
    component: addTag,
  },
  {
    path: '/tags/edit/:id',
    name: 'EditTag',
    component: editTag,
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
