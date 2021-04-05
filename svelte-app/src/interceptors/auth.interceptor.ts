import { navigate } from 'svelte-routing';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
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

  axios.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error.response.status === 401) {
        const authHeader = error.config.headers['WWW-Authenticate'];
        if (/is expired/.test(authHeader)) {
          navigate('/signin');
        } else {
          navigate('/authfailed');
        }
        console.warn('should not reach here?');
        return Promise.resolve(true);
      }
      return Promise.reject(error);
    },
  );
}
