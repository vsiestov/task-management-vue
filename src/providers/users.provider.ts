import { IAuth, IRegistration } from '@/interfaces/users.interfaces';
import { getRequest, postRequest } from '@/providers/global.provider';

const api = '/api/v1';

export const signIn = async (params: IAuth) => {
  const response = await postRequest(`${api}/sign-in`, params);

  return response.data;
};

export const signUp = async (params: IRegistration) => {
  const response = await postRequest(`${api}/sign-up`, params);

  return response.data;
};

export const me = async (token: string) => {
  const response = await getRequest(`${api}/me`, null, {
    'x-access-token': token
  });

  return response.data;
};
