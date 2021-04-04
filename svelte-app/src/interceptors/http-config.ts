import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export const prefixReq = '⬇ -';
export const prefixRes = '⬆ -';

export interface AxiosMeta {
  started?: number;
}

export interface AxiosRequestConfigExtended extends AxiosRequestConfig {
  meta: AxiosMeta;
}

export interface AxiosResponseExtended extends AxiosResponse {
  config: AxiosRequestConfigExtended;
}

export function logError(error: AxiosError) {
  console.groupCollapsed(`${prefixRes} 🛑 Log Http Response Error`);
  const msg =
    error.config && error.response
      ? `Http Response Error for ${error?.config?.url}\nreturned with status ${error?.response?.status}\n${error}`
      : error;
  console.error(msg);
  console.groupEnd();
}
