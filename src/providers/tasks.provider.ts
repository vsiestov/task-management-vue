import { deleteRequest, getRequest, postRequest, putRequest } from '@/providers/global.provider';
import { ITaskForm } from '@/interfaces/tasks.interface';

const api = '/api/v1/tasks';

export const create = async (params: ITaskForm) => {
  const response = await postRequest(`${api}`, params);

  return response.data;
};

export const getList = async () => {
  const response = await getRequest(`${api}`);

  return response.data;
};

export const getOne = async (id: string) => {
  const response = await getRequest(`${api}/${id}`);

  return response.data;
};

export const update = async (id: string, params: ITaskForm) => {
  const response = await putRequest(`${api}/${id}`, params);

  return response.data;
};

export const remove = async (id: string) => {
  const response = await deleteRequest(`${api}/${id}`);

  return response.data;
};
