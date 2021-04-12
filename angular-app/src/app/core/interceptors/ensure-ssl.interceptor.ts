import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { prefixReq } from './http-config';
import { log } from './log';

@Injectable()
export class EnsureSSLInterceptor implements HttpInterceptor {
  /**
   * Credit: https://angular.io/guide/http#http-interceptors
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    // clone request and replace 'http://' with 'https://' at the same time
    const before = req.url;
    const secureReq = req.clone({
      url: req.url.replace('http://', 'https://'),
      // url: req.url.replace('api/', 'myapi/'),
    });
    const after = req.url;
    // send the cloned, "secure" request to the next handler.
    log(`${prefixReq} 🔐 SSL`, [
      'Rerouting all traffic to SSL',
      `URL transformed from ${before} to ${after}`,
    ]);
    return next.handle(secureReq);
  }
}
