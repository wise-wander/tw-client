import axios from 'axios';
import toast from 'react-hot-toast';
import { API_URL } from './constants';

const request = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  withXSRFToken: true,
  xsrfCookieName: 'csrf_access_token',
});

request.interceptors.request.use(
  (config) => {
    const accessToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('access_token_cookie='))
      ?.split('=')[1];

    const csrfToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('csrf_token_cookie='))
      ?.split('=')[1];

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (csrfToken) {
      config.headers['X-CSRF-Token'] = csrfToken;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

request.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error('An error occurred.');
    return Promise.reject(error);
  },
);

export default request;
