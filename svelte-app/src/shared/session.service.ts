import axios from 'axios';
import { User } from '../models';
import { API } from '../config';

export interface SessionState {
  loggedIn: boolean;
  message: string;
}

const notSignedInMessage = `Not signed in`;

let _isLoggedIn = false;
let sessionStateSubject = {
  loggedIn: false,
  message: notSignedInMessage,
};
let accessToken: string;

export function isLoggedIn(): boolean {
  return _isLoggedIn;
}

let readOnly = false; // TODO: This could be set based upon a role

export async function signin(email: string, password: string) {
  const signinUrl = `${API}/signin/`;
  const body: Partial<User> = {
    email, // 'john@contoso.com',
    password, // '1234'
  };
  const response = await axios.post<{ accessToken: string }>(signinUrl, body);
  if (response.status !== 201) throw Error(response.statusText); // TODO: catch?
  let data = response.data;
  if (data?.accessToken) {
    const message = `Welcome ${email}`;
    this.accessToken = data.accessToken;
    // TODO: subject?
    sessionStateSubject = { loggedIn: true, message };
    _isLoggedIn = true;
    return true;
  } else {
    logout();
    return false;
  }
}

function refreshToken() {
  // TODO: implement a refresh
}

function logout() {
  accessToken = null;
  _isLoggedIn = false;
  sessionStateSubject = {
    loggedIn: false,
    message: notSignedInMessage,
  };
}
