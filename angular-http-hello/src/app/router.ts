import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { MovieComponent } from './movies.component';
import { NotFoundComponent, SignInComponent } from './core';
import { AuthFailedComponent } from './core/components/auth-failed.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'movies', component: MovieComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'authfailed', component: AuthFailedComponent },
  { path: '**', component: NotFoundComponent },
];
