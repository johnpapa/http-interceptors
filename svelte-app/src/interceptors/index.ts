import { authInterceptor } from './auth.interceptor';
import { csrfHeaders } from './csrf.interceptor';
import { globalHeaders } from './global.headers';
import { logHeadersInterceptor } from './log-headers.interceptor';
import { logHttpInterceptor } from './log-http.interceptor';
import { readOnlyInterceptor } from './read-only.interceptor';

export function applyHttpInterceptors() {
  globalHeaders();
  csrfHeaders();

  /**
   * Axios Interceptors are executed in the reverse order they are added (last in first executed).
   */
  // transformInterceptor();
  // busyInterceptor();
  logHeadersInterceptor();
  // csrfInterceptor();
  authInterceptor();
  // ensureSSLInterceptor();
  readOnlyInterceptor();
  logHttpInterceptor();
}
