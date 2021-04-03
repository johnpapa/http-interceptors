import axios from 'axios';
import * as sessionService from '../store/session.service';

export function authHeaders() {
  const authHeader = sessionService.accessToken;
  const token = `Bearer ${authHeader}`;

  axios.defaults.headers.common['Authorization'] = token;
  axios.defaults.headers.common['Content-Type'] = 'application/json';
}
