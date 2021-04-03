import axios from 'axios';
import * as store from './store';
import { User } from '../models';
import { API } from '../config';

export interface SessionState {
  loggedIn: boolean;
  message: string;
}

export const emptySessionPayload: SessionState = {
  loggedIn: false,
  message: '',
};

const notSignedInMessage = `Not signed in`;

let _isLoggedIn = false;
let sessionState: SessionState = {
  loggedIn: false,
  message: notSignedInMessage,
};
export let accessToken: string;

export function isLoggedIn(): boolean {
  return _isLoggedIn;
}

let readOnly = false; // TODO: This could be set based upon a role

export async function signin(email: string, password: string) {
  const message = `Welcome ${email}`;
  const signinUrl = `${API}/signin/`;
  const body: Partial<User> = {
    email, // 'john@contoso.com',
    password, // '1234'
  };
  try {
    const response = await axios.post<{ accessToken: string }>(signinUrl, body);
    let data = response.data;
    if (data?.accessToken) {
      accessToken = data.accessToken;
      sessionState = { loggedIn: true, message };
      store.getSession(sessionState);
      _isLoggedIn = true;
      return true;
    } else {
      logout();
      return false;
    }
  } catch (error) {
    logout();
    return false;
  }
}

export function logout() {
  accessToken = null;
  _isLoggedIn = false;
  sessionState = emptySessionPayload;
  store.getSession(sessionState);
}
