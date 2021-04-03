import axios, { AxiosRequestConfig } from 'axios';
import { logError, prefixReq } from './http-config';

export function logHeadersInterceptor() {
  axios.interceptors.request.use((config: AxiosRequestConfig) => {
    const { headers, method, url } = config;

    console.groupCollapsed(`${prefixReq} ⚽️ Headers`);
    console.log(`${method} "${url}"`);
    console.table(headers);
    console.groupEnd();

    return config;
  });
}
