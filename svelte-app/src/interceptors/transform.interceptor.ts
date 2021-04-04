import axios, { AxiosResponse } from 'axios';
import { prefixRes } from './http-config';

export function transformInterceptor() {
  axios.interceptors.response.use((response: AxiosResponse) => {
    const { data } = response;

    // If the response comes through as { data: ... }, strip the data off.
    const transformed = data.data || data;

    console.groupCollapsed(`${prefixRes} 🚧 Transform Response`);
    console.table(transformed);
    console.groupEnd();

    response.data = transformed;

    return response;
  });
}
