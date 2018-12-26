import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VUE_APP_REMOTE_URL
});

export const updateHeader = (token: string) => {
  api.defaults.headers['x-access-token'] = token;
};

export const getRequest = (url: string, params?: any, headers: object = {}) => {
  return api.get(`${url}`, {
    params,
    headers
  });
};

export const postRequest = (url: string, data: any) => {
  return api.post(`${url}`, data);
};

export const putRequest = (url: string, data: any) => {
  return api.put(`${url}`, data);
};

export const deleteRequest = (url: string) => {
  return api.delete(`${url}`);
};
