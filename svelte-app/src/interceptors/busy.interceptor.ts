import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { prefixReq, prefixRes } from './http-config';
import * as busyService from '../store/busy.service';

const loadingMessage = 'Loading ...';
const savingMessage = 'Saving ...';

export function busyInterceptor() {
  axios.interceptors.request.use((config: AxiosRequestConfig) => {
    const { method } = config;
    const msg = method === 'GET' ? loadingMessage : savingMessage;

    console.groupCollapsed(`${prefixReq} ⚙️ Busy Spinner`);
    console.log('Incrementing the busy spinner');
    console.log(msg);
    console.groupEnd();

    busyService.increment(msg);

    return config;
  });

  axios.interceptors.response.use(
    (response: AxiosResponse) => {
      busyService.decrement();

      console.groupCollapsed(`${prefixRes} Busy Spinner`);
      console.log('Decrementing the busy spinner');
      console.groupEnd();

      return response;
    },
    (error) => {
      busyService.decrement();

      console.groupCollapsed(`${prefixRes} Busy Spinner`);
      console.log('Decrementing the busy spinner');
      console.groupEnd();

      return Promise.reject(error);
    },
  );
}
