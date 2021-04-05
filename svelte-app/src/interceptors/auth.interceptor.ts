import axios, { AxiosRequestConfig } from 'axios';
import { prefixReq } from './http-config';
import * as sessionService from '../store/session.service';

export function authInterceptor() {
  axios.interceptors.request.use((config: AxiosRequestConfig) => {
    const { accessToken } = sessionService;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      config.withCredentials = true;

      console.groupCollapsed(`${prefixReq} 🔑 Auth`);
      console.log(`Adding Auth header`);
      console.groupEnd();
    }

    return config;
  });
}
