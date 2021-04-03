import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { prefixReq, prefixRes } from './http-config';

interface AxiosMeta {
  started?: number;
}

interface AxiosRequestConfigExtended extends AxiosRequestConfig {
  meta: AxiosMeta;
}

interface AxiosResponseExtended extends AxiosResponse {
  config: AxiosRequestConfigExtended;
}

export function logHttpInterceptor() {
  axios.interceptors.request.use(
    (config: AxiosRequestConfigExtended) => {
      const started = Date.now();
      config.meta = { started };
      logRequest(config);
      return config;
    },
    (error) => {
      logError(error);
      return Promise.reject(error);
    },
  );

  axios.interceptors.response.use(
    (response: AxiosResponseExtended) => {
      logResponse(response);
      return response;
    },
    (error: AxiosError) => {
      logError(error);
      return Promise.reject(error);
    },
  );

  function logRequest(config: AxiosRequestConfig) {
    console.groupCollapsed(`${prefixReq} 📝 Log Http Request`);
    console.log(`${config.method} "${config.url}"`);
    console.groupEnd();
  }

  function logResponse(response: AxiosResponseExtended) {
    console.groupCollapsed(`${prefixRes} Log Http Response`);
    const { config, status } = response;
    const started = config.meta.started;
    const elapsed = Date.now() - started;
    console.log(
      `HTTP: Response for ${config.url}\nreturned with status ${status}\nand took ${elapsed} ms`,
    );
    console.groupEnd();
  }
}

function logError(error: AxiosError) {
  console.groupCollapsed(`${prefixRes} Log Http Response Error`);
  console.log(
    `Http Response Error for ${error.config.url}\nreturned with status ${error.response?.status}\n`,
  );
  console.groupEnd();
}
