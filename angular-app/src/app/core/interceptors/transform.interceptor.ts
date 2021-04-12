import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { prefixRes } from './http-config';
import { logMessage } from './log';

@Injectable()
export class TransformInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event) => {
        if (event instanceof HttpResponse) {
          const body = event.body?.data;
          logMessage(`${prefixRes} 🚧 Transform Response`, [], [body]);
          if (body) {
            return event.clone({ body });
          }
          return event.clone(); // undefined means dont change it
        }
      }),
    );
  }
}
