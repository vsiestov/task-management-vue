import { IUser } from '@/interfaces/users.interfaces';
import { ITask } from '@/interfaces/tasks.interface';

export interface IAuth {
  status: boolean;
  token: string | null;
}

export interface IState {
  loading: boolean;
  auth: IAuth;
  user: IUser | null;
  errors: any[];
  tasks: ITask[];
}
