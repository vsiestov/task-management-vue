import { ITask } from '@/interfaces/tasks.interface';
import { IState } from '@/interfaces/store.interfaces';
import { IError } from '@/interfaces/common.interfaces';

export default {
  showLoading(state: IState) {
    state.loading = true;
  },

  hideLoading(state: IState) {
    state.loading = false;
  },

  signIn(state: IState, payload: any) {
    const { token, ...user } = payload;

    state.user = user;
    state.auth = {
      token,
      status: true
    };
  },

  logout(state: IState) {
    state.user = null;
    state.auth = {
      token: null,
      status: false
    };
  },

  error(state: IState, payload: IError) {
    state.errors = payload && payload.errors || [
      {
        msg: 'Something went wrong'
      }
    ];
  },

  tasksList(state: IState, payload: ITask[]) {
    state.tasks = payload;
  },

  taskAdded(state: IState, payload: ITask) {
    state.tasks = state.tasks.concat(payload);
  },

  deleteTask(state: IState, payload: string) {
    state.tasks = state.tasks.filter((item: ITask) => {
      return item._id !== payload;
    });
  },

  taskUpdated(state: IState, payload: ITask) {
    state.tasks = state.tasks.map((item: ITask) => {

      if (item._id === payload._id) {
        return payload;
      }

      return item;
    });
  }
};
