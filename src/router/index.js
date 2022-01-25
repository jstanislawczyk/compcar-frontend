import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home';
import NotFound from '@/views/NotFound';
import CarSearch from '@/components/CarSearch';
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
    path: '/car-search',
    name: 'CarSearch',
    component: CarSearch,
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
