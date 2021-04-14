import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusyService } from '../busy.service';
import { finalize } from 'rxjs/operators';
import { prefixReq, prefixRes } from './http-config';
import { logMessage } from './log';

@Injectable()
export class BusyInterceptor implements HttpInterceptor {
  constructor(private busyService: BusyService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const msg = req.method === 'GET' ? 'Loading ...' : 'Saving ...';
    logMessage(`${prefixReq} ⚙️ Busy Spinner`, [
      'Incrementing the busy spinner',
    ]);
    this.busyService.increment(msg);

    return next.handle(req).pipe(
      finalize(() => {
        this.busyService.decrement();
        logMessage(`${prefixRes} ⚙️ Busy Spinner`, [
          'Decrementing the busy spinner',
        ]);
      }),
    );
  }
}
