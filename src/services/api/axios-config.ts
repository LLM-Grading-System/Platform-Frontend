import axios from 'axios';
import { backendServer, isDev } from '../../app/settings';
import TokenService from '../localStorage/auth-token';

const axiosInstance = axios.create({
  baseURL: isDev? backendServer: undefined,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = TokenService.getToken() || "";
    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export {axiosInstance};