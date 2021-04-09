import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

import {
  Movie,
  API,
  BusyService,
  prefixReq,
  prefixRes,
  SessionService,
} from './core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class MovieService {
  constructor(
    private http: HttpClient,
    private busyService: BusyService,
    private sessionService: SessionService,
    private router: Router,
  ) {}

  addMovie(movie: Movie): Observable<Movie> {
    this.showBusy(false);

    return this.http.post<Movie>(`${API}/movies`, movie).pipe(
      this.catchHttpErrors(),
      finalize(() => this.hideBusy()),
    );
  }

  deleteMovie(movie: Movie): Observable<Movie> {
    this.showBusy(false);

    return this.http.delete(`${API}/movies/${movie.id}`).pipe(
      this.catchHttpErrors(),
      finalize(() => this.hideBusy()),
    );
  }

  getMovies(): Observable<Movie[]> {
    this.showBusy(true);
    const options = this.addAuth();

    return this.http.get<Movie[]>(`${API}/movies`, options).pipe(
      this.catchHttpErrors(),
      finalize(() => this.hideBusy()),
    );
  }

  getMovie(id: number) {
    this.showBusy(true);
    return this.http.get<Movie[]>(`${API}/movies}`).pipe(
      map((movies) => movies.find((movie) => movie.id === id)),
      this.catchHttpErrors(),
      finalize(() => this.hideBusy()),
    );
  }

  updateMovie(movie: Movie): Observable<Movie> {
    this.showBusy(false);

    return this.http.put<Movie>(`${API}/movies/${movie.id}`, movie).pipe(
      this.catchHttpErrors(),
      finalize(() => this.hideBusy()),
    );
  }

  private catchHttpErrors = () => (source$: Observable<any>) =>
    source$.pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error.message);

        const authResHeader = error.headers.get('WWW-Authenticate');
        if (error.status === 401) {
          if (/is expired/.test(authResHeader)) {
            // TODO: Another option is to refresh token
            // this.sessionService.refreshToken();
            this.router.navigate(['signin']);
          } else {
            this.router.navigate(['authfailed']);
          }
          return EMPTY;
        } else {
          return throwError(error);
        }
      }),
    );

  private showBusy = (isGET = true) => {
    const msg = isGET ? 'Loading ...' : 'Saving ...';
    console.groupCollapsed(`${prefixReq} ⚙️ Busy Spinner`);
    console.log('Incrementing the busy spinner');
    console.log(msg);
    console.groupEnd();
    this.busyService.increment(msg);
  };

  private hideBusy = () => {
    this.busyService.decrement();
    console.groupCollapsed(`${prefixRes} ⚙️ Busy Spinner`);
    console.log('Decrementing the busy spinner');
    console.groupEnd();
  };

  private addAuth(options: any = { headers: new HttpHeaders() }) {
    const { accessToken } = this.sessionService;

    options.headers = options.headers.append(
      'Content-Type',
      'application/json',
    );
    if (accessToken) {
      options.headers = options.headers.append(
        'Authorization',
        `Bearer ${accessToken}`,
      );
      options.withCredentials = true;
      console.groupCollapsed(`${prefixReq} 🔑 Auth`);
      console.log(`Adding Auth header`);
      console.groupEnd();
    }

    return options;
  }
}
