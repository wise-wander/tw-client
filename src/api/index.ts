import axios from 'axios';
import { ACCESS_TOKEN, API_URL } from './constants';

const request = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

request.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem(ACCESS_TOKEN);
    if (access_token && config.headers) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default request;
