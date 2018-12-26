import { signIn, signUp } from '@/providers/users.provider';
import { updateHeader } from '@/providers/global.provider';
import * as tasks from '@/providers/tasks.provider';
import router from '@/router';
import { IAuth, IRegistration } from '@/interfaces/users.interfaces';
import { IError } from '@/interfaces/common.interfaces';
import { ITaskForm } from '@/interfaces/tasks.interface';
import { ActionContext } from 'vuex';
import { IState } from '@/interfaces/store.interfaces';

const NOTIFICATION_TIME = 2 * 1000;

let exceptionTimeout: any;

const handleException = (commit: (name: string, data: any) => void, $exception: any) => {

  commit('error', $exception.errors ?
    $exception :
    $exception.response && $exception.response.data
  );

  clearTimeout(exceptionTimeout);

  exceptionTimeout = setTimeout(() => {
    commit('error', {
      errors: []
    });
  }, NOTIFICATION_TIME);
};

export default {
  async signIn({ commit }: ActionContext<IState, IState>, params: IAuth) {
    commit('showLoading');

    try {
      const response = await signIn(params);

      commit('signIn', response);

      updateHeader(response.token);
      localStorage.setItem('token', response.token);

      router.push({
        name: 'tasks'
      });
    } catch ($exception) {
      handleException(commit, $exception);
    } finally {
      commit('hideLoading');
    }
  },

  async signUp({ commit }: ActionContext<IState, IState>, params: IRegistration) {
    commit('showLoading');

    try {
      const response = await signUp(params);

      commit('signIn', response);

      updateHeader(response.token);
      localStorage.setItem('token', response.token);

      router.push({
        name: 'tasks'
      });
    } catch ($exception) {
      handleException(commit, $exception);
    } finally {
      commit('hideLoading');
    }
  },

  logout({ commit }: ActionContext<IState, IState>) {
    localStorage.removeItem('token');
    commit('logout');

    updateHeader('');

    router.push({
      name: 'signIn'
    });
  },

  error({ commit }: ActionContext<IState, IState>, error: IError) {
    handleException(commit, error);
  },

  async tasks({ commit }: ActionContext<IState, IState>) {
    commit('showLoading');

    try {
      const list = await tasks.getList();
      commit('tasksList', list);
    } catch ($exception) {
      handleException(commit, $exception);
    } finally {
      commit('hideLoading');
    }
  },

  async createTask({ commit }: ActionContext<IState, IState>, data: ITaskForm) {
    commit('showLoading');

    try {
      const response = await tasks.create({
        ...data,
        due: new Date(data.due).getTime()
      });

      commit('taskAdded', response);
    } catch ($exception) {
      handleException(commit, $exception);

      return Promise.reject();

    } finally {
      commit('hideLoading');
    }
  },

  async deleteTask({ commit }: ActionContext<IState, IState>, id: string) {
    commit('showLoading');

    try {
      await tasks.remove(id);

      commit('deleteTask', id);
    } catch ($exception) {
      handleException(commit, $exception);
    } finally {
      commit('hideLoading');
    }
  },

  async updateTask({ commit }: ActionContext<IState, IState>, data: ITaskForm) {
    commit('showLoading');

    try {
      const { _id, due, ...rest } = data;

      const response = await tasks.update(_id as string, {
        ...rest,
        due: new Date(due).getTime()
      });

      commit('taskUpdated', response);
    } catch ($exception) {
      handleException(commit, $exception);

      return Promise.reject();
    } finally {
      commit('hideLoading');
    }
  }
};
