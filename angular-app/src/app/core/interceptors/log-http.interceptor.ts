import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { prefixReq, prefixRes } from './http-config';
import { logMessage, logErrorMessage } from './log';

@Injectable()
export class LogHttpInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const started = Date.now();
    this.logRequest(req);
    return next.handle(req).pipe(
      tap(
        (event) => this.logResponse(event, req, started),
        (event) => this.logError(event, req, started),
      ),
    );
  }

  private logRequest(req: HttpRequest<any>) {
    logMessage(`${prefixReq} 📝 Log Http Request`, [
      `${req.method} "${req.urlWithParams}"`,
    ]);
  }

  private logResponse(
    event: HttpEvent<any>,
    req: HttpRequest<any>,
    started: number,
  ) {
    if (event instanceof HttpResponse) {
      const elapsed = Date.now() - started;
      logMessage(`${prefixRes} 📝 Log Http Response`, [
        `HTTP: Response for ${req.urlWithParams}\nreturned with status ${event.status}\nand took ${elapsed} ms`,
      ]);
    }
  }
  private logError(
    event: HttpEvent<any>,
    req: HttpRequest<any>,
    started: number,
  ) {
    if (event instanceof HttpErrorResponse) {
      const elapsed = Date.now() - started;
      logErrorMessage(`${prefixRes} 🛑 Log Http Response Error`, [
        `Http Response Error for ${req.urlWithParams}\nreturned with status ${event.status}\nand took ${elapsed} ms`,
      ]);
    }
  }

  /**
   * Credit: https://angular.io/guide/http#http-interceptors
   */

  /*
  intercept_alternative(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const started = Date.now();
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          const elapsed = Date.now() - started;
          console.log(
            `HTTP: Request for ${req.urlWithParams} took ${elapsed} ms.`
          );
        }
      })
    );
  }
  */
}
