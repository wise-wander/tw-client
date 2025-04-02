import axios from 'axios';
import toast from 'react-hot-toast';
import { API_URL } from './constants';

const request = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withXSRFToken: true,
  withCredentials: true,
});

request.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

request.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error('Something went wrong. Please try again later.');
    return Promise.reject(error);
  },
);

export default request;
