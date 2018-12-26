import { IState } from '@/interfaces/store.interfaces';

const state: IState = {
  loading: false,
  auth: {
    status: false,
    token: null
  },
  user: null,
  errors: [],
  tasks: []
};

export default state;
