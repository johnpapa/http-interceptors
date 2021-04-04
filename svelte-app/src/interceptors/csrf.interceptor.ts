import axios, { AxiosRequestConfig } from 'axios';
import { prefixReq } from './http-config';

export function csrfInterceptor() {
  axios.interceptors.request.use((config: AxiosRequestConfig) => {
    let token = 'your-csrf-token-goes-here';
    if (token) {
      config.headers['x-csrf-token'] = token;

      console.groupCollapsed(`${prefixReq} 🦹‍♀️ CSRF`);
      console.log(`Adding CSRF header`);
      console.log(token);
      console.groupEnd();
    }

    return config;
  });
}
