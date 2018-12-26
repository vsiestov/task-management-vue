import Vue from 'vue';
import Router from 'vue-router';
import Tasks from './views/Tasks.vue';
import SignIn from './views/SignIn.vue';
import { isAuth, isNotAuth } from '@/helpers/router-guads';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'tasks',
      component: Tasks,
      beforeEnter: isAuth
    },
    {
      path: '/sign-in',
      name: 'signIn',
      component: SignIn,
      beforeEnter: isNotAuth
    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: () => import(/* webpackChunkName: "sign-up" */ './views/SignUp.vue'),
      beforeEnter: isNotAuth
    },
    {
      path: '**',
      component: () => import(/* webpackChunkName: "not-found"  */ './views/404.vue'),
    }
  ]
});
