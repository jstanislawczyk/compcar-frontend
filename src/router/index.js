import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home';
import NotFound from '@/views/NotFound';
import ModelsSearch from '@/components/ModelsSearch';
import Model from '@/components/Model';
import Login from '@/components/Login';
import Register from '@/components/Register';
import Generation from '@/components/Generation';
import Car from '@/components/Car';
import Engine from '@/components/Engine';
import Admin from '@/components/Admin';
import AdminColors from '@/components/AdminColors';
import AdminUsers from '@/components/AdminUsers';
import AdminAddons from '@/components/AdminAddons';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/models-search',
    name: 'ModelsSearch',
    component: ModelsSearch,
  },
  {
    path: '/model/:id',
    name: 'Model',
    component: Model,
  },
  {
    path: '/generation/:id',
    name: 'Generation',
    component: Generation,
  },
  {
    path: '/car/:id',
    name: 'Car',
    component: Car,
  },
  {
    path: '/engine/:id',
    name: 'Engine',
    component: Engine,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    children: [
      {
        path: '/admin/colors',
        name: 'AdminColors',
        component: AdminColors,
      },
      {
        path: '/admin/users',
        name: 'AdminUsers',
        component: AdminUsers,
      },
      {
        path: '/admin/addons',
        name: 'AdminAddons',
        component: AdminAddons,
      },
    ],
  },
  {
    path: '/:catchAll(.*)',
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
