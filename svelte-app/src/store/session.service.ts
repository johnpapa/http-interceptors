import axios from 'axios';
import * as store from './store';
import { User } from '../models';
import { API } from '../config';

export interface SessionState {
  loggedIn: boolean;
  message: string;
}

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

// export async function getHeroesAction() {
//   try {
//     const response = await axios.get(`${API}/heroes`);
//     const heroes: Hero[] = parseList<Hero>(response);
//     store.getHeroes(heroes);
//     return heroes;
//   } catch (err) {
//     console.log(err);
//     throw new Error(err);
//   }
// }

export async function signin(email: string, password: string) {
  const message = `Welcome ${email}`;
  const signinUrl = `${API}/signin/`;
  const body: Partial<User> = {
    email, // 'john@contoso.com',
    password, // '1234'
  };
  const response = await axios.post<{ accessToken: string }>(signinUrl, body);
  if (response.status !== 200) throw new Error(response.statusText); // TODO: catch?
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
}

function refreshToken() {
  // TODO: implement a refresh
}

export function logout() {
  accessToken = null;
  _isLoggedIn = false;
  sessionState = {
    loggedIn: false,
    message: notSignedInMessage,
  };
  store.getSession(sessionState);
}
