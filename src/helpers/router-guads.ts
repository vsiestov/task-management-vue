import { me } from '@/providers/users.provider';
import store from '@/store';
import { updateHeader } from '@/providers/global.provider';

export const isAuth = async (to: any, from: any, next: (fallback?: any) => void) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return next('/sign-in');
  }

  if (!store.state.auth.status) {
    try {
      const result = await me(token);

      if (result) {
        store.commit('signIn', result);
        updateHeader(token);
      }

    } catch ($exception) {
      localStorage.removeItem('token');
      updateHeader('');
      next('/');
    }
  }

  next();
};

export const isNotAuth = (to: any, from: any, next: (fallback?: any) => void) => {
  const token = localStorage.getItem('token');

  if (token) {
    next('/');
  }

  next();
};
