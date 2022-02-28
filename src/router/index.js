import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home';
import NotFound from '@/views/NotFound';
import ModelsSearch from '@/components/ModelsSearch';
import Model from '@/components/Model';
import Login from '@/components/Login';
import Register from '@/components/Register';

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
