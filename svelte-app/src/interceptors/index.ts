import { authHeaders } from './auth.interceptor';
import { logHttpInterceptor } from './log-http.interceptor';
import { readOnlyInterceptor } from './read-only.interceptor';

export function applyHttpInterceptors() {
  authHeaders();

  /**
   * Axios Interceptors are executed in the reverse order they are added (last in first executed).
   */
  readOnlyInterceptor();
  logHttpInterceptor();
}
