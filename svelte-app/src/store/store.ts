import { Writable, writable } from 'svelte/store';
import { Movie, Hero, BusyState, notBusyPayload } from '../models';
import { SessionState } from './session.service';

const emptySessionPayload: SessionState = {
  loggedIn: false,
  message: 'Not signed in',
};

interface AppState {
  movies: Writable<Movie[]>;
  heroes: Writable<Hero[]>;
  session: Writable<SessionState>;
  busy: Writable<BusyState>;
}

const state: AppState = {
  movies: writable([]),
  heroes: writable([]),
  session: writable(emptySessionPayload),
  busy: writable(notBusyPayload),
};

const getMovies = (movies: Movie[]) => {
  state.movies.update((old: Movie[]) => movies);
};

const getHeroes = (heroes: Hero[]) => {
  state.heroes.update((old: Hero[]) => heroes);
};

const getSession = (session: SessionState) => {
  state.session.update((old: SessionState) => session);
};

const getBusy = (busy: BusyState) => {
  state.busy.update((old: BusyState) => busy);
};

const addHero = (hero: Hero) => {
  state.heroes.update((old: Hero[]) => {
    old.unshift(hero);
    return old;
  });
};

const deleteHero = (hero: Hero) => {
  state.heroes.update((old: Hero[]) => [
    ...old.filter((p) => p.id !== hero.id),
  ]);
};

const updateHero = (hero: Hero) => {
  state.heroes.update((old: Hero[]) => {
    const index = old.findIndex((p) => p.id === hero.id);
    old.splice(index, 1, hero);
    return [...old];
  });
};

export {
  state,
  addHero,
  getHeroes,
  updateHero,
  deleteHero,
  getMovies,
  getSession,
  getBusy,
};
