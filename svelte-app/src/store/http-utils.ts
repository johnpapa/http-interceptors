import { AxiosResponse } from 'axios';
import * as sessionService from '../store/session.service';

export const parseList = <T>(response: AxiosResponse) => {
  if (response.status !== 200) throw Error(`Error, status ${response.status}`);
  let list: T[] = response.data;
  if (typeof list !== 'object') {
    list = [];
  }
  return list;
};

export const parseItem = <T>(response: AxiosResponse, code: number) => {
  if (response.status !== code) throw Error(`Error, status ${response.status}`);
  let item = response.data;
  if (typeof item !== 'object') {
    item = undefined;
  }
  return item as T;
};

export function stuffHeaders() {
  const authHeader = sessionService.accessToken;
  const headers = {
    Authorization: `Bearer ${authHeader}`,
    'Content-Type': 'application/json',
  };
  return headers;
}
