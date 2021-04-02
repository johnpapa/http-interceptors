import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError, EMPTY } from 'rxjs';

import { SessionService } from '../session.service';
import { prefixReq } from './http-config';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private sessionService: SessionService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const authHeader = this.sessionService.accessToken;
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authHeader}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    console.groupCollapsed(`${prefixReq} 🔑 Auth`);
    console.log(`Adding Auth header`);
    console.groupEnd();
    // Pass on the cloned request instead of the original request.
    return next.handle(authReq).pipe(this.handleErrors);
  }

  handleErrors(source: Observable<HttpEvent<any>>): Observable<HttpEvent<any>> {
    return source.pipe(
      catchError((response: HttpErrorResponse) => {
        let message =
          response.status === 401
            ? `Unauthorized: ${response.message}`
            : response.message;
        const newResponse = {
          ...response,
          message,
        };
        return throwError(newResponse);
      }),
    );
  }
}
