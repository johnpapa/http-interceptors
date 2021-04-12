import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { prefixReq } from './http-config';
import { SessionService } from '../session.service';
import { logMessage, logErrorMessage } from './log';

@Injectable()
export class ReadOnlyInterceptor implements HttpInterceptor {
  constructor(private sessionService: SessionService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const readOnly = this.sessionService.readOnly;
    if (!readOnly || this.okIfReadOnly(req)) {
      logMessage(`${prefixReq} 👓 Read-Only`, ['Pass. Data is not read-only']);
      return next.handle(req);
    } else {
      const msg = `Can't ${req.method} ${req.url} when read-only`;
      logErrorMessage(`${prefixReq} 👓 Read-Only`, [msg]);
      return throwError(new Error(msg));
    }
  }

  okIfReadOnly(req: HttpRequest<any>) {
    /**
     * Put allowList of readonly routes here
     */
    const allowList = [/api\/movies/gi, /api\/signin/gi];
    return allowList.some((item) => item.test(req.url));
  }
}
