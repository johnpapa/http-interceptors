import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { prefixReq } from './http-config';

@Injectable({ providedIn: 'root' })
export class CSRFInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    let token = 'your-csrf-token-goes-here';
    // let headers = req.headers;
    // // if (req.url.indexOf('http://your-url.azurewebsites.net') > -1) {
    // headers = req.headers.append('x-csrf-token', token);
    // // }
    // const clonedReq = req.clone({ headers });
    const clonedReq = req.clone({ setHeaders: { 'x-csrf-token': token } });
    console.groupCollapsed(`${prefixReq} 🦹‍♀️ CSRF`);
    console.log(`Adding CSRF header`);
    console.log(token);
    console.groupEnd();
    return next.handle(clonedReq);
  }
}
