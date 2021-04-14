import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { prefixReq } from './http-config';
import { logMessage } from './log';

@Injectable()
export class CSRFInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    let token = 'your-csrf-token-goes-here';
    const clonedReq = req.clone({ setHeaders: { 'x-csrf-token': token } });
    logMessage(`${prefixReq} 🦹‍♀️ CSRF`, [`Adding CSRF header`, token]);
    return next.handle(clonedReq);
  }
}
