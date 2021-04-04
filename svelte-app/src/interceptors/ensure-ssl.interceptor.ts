import axios, { AxiosRequestConfig } from 'axios';
import { prefixReq } from './http-config';

export function ensureSSLInterceptor() {
  axios.interceptors.request.use((config: AxiosRequestConfig) => {
    const localhostExp = /http:\/\/localhost/gi;

    console.groupCollapsed(`${prefixReq} 🔐 SSL`);

    if (localhostExp.test(config.url)) {
      console.log(`Not enforcing SSL on localhost`);
    } else {
      const before = config.url;
      const after = before.replace('http://', 'https://');
      config.url = after;

      console.log(`Rerouting all traffic to SSL`);
      console.log(`URL transformed from ${before} to ${after}`);
    }

    console.groupEnd();

    return config;
  });
}
