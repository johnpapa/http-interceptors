import { navigate } from 'svelte-routing';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { prefixReq } from './http-config';
import * as sessionService from '../store/session.service';
import { logMessage } from './log';

export function authInterceptor() {
  axios.interceptors.request.use((config: AxiosRequestConfig) => {
    const { accessToken } = sessionService;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      config.withCredentials = true;
      logMessage(`${prefixReq} 🔑 Auth`, [`Adding Auth header`]);
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
        return Promise.resolve(true);
      }
      return Promise.reject(error);
    },
  );
}
