import axios, { AxiosRequestConfig } from 'axios';
import {
  AxiosRequestConfigExtended,
  AxiosResponseExtended,
  logError,
  prefixReq,
  prefixRes,
} from './http-config';

export function logHttpInterceptor() {
  axios.interceptors.request.use(
    (config: AxiosRequestConfigExtended) => {
      const started = Date.now();
      config.meta = { started };
      return logRequest(config);
    },
    (error) => {
      logError(error);
      return Promise.reject(error);
    },
  );

  axios.interceptors.response.use(
    (response: AxiosResponseExtended) => {
      return logResponse(response);
    },
    (error) => {
      logError(error);
      return Promise.reject(error);
    },
  );

  function logRequest(config: AxiosRequestConfig) {
    console.groupCollapsed(`${prefixReq} 📝 Log Http Request`);
    console.log(`${config.method} "${config.url}"`);
    console.groupEnd();
    return config;
  }

  function logResponse(response: AxiosResponseExtended) {
    console.groupCollapsed(`${prefixRes} 📝 Log Http Response`);
    const { config, status } = response;
    const started = config.meta.started;
    const elapsed = Date.now() - started;
    console.log(
      `HTTP: Response for ${config.url}\nreturned with status ${status}\nand took ${elapsed} ms`,
    );
    console.groupEnd();
    return response;
  }
}
