import { Writable, writable } from 'svelte/store';
import { Movie, Hero, BusyState, notBusyPayload, Villain } from '../models';
import { SessionState } from './session.service';

const emptySessionPayload: SessionState = {
  loggedIn: false,
  message: 'Not signed in',
};

interface AppState {
  busy: Writable<BusyState>;
  heroes: Writable<Hero[]>;
  movies: Writable<Movie[]>;
  session: Writable<SessionState>;
  villains: Writable<Villain[]>;
}

const state: AppState = {
  busy: writable(notBusyPayload),
  heroes: writable([]),
  movies: writable([]),
  session: writable(emptySessionPayload),
  villains: writable([]),
};

const getMovies = (movies: Movie[]) => {
  state.movies.update((old: Movie[]) => movies);
};

const getHeroes = (heroes: Hero[]) => {
  state.heroes.update((old: Hero[]) => heroes);
};

const getVillains = (villains: Villain[]) => {
  state.villains.update((old: Villain[]) => villains);
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
    ...old.filter((h) => h.id !== hero.id),
  ]);
};

const updateHero = (hero: Hero) => {
  state.heroes.update((old: Hero[]) => {
    const index = old.findIndex((h) => h.id === hero.id);
    old.splice(index, 1, hero);
    return [...old];
  });
};

const addVillain = (villain: Villain) => {
  state.villains.update((old: Villain[]) => {
    old.unshift(villain);
    return old;
  });
};

const deleteVillain = (villain: Villain) => {
  state.villains.update((old: Villain[]) => [
    ...old.filter((v) => v.id !== villain.id),
  ]);
};

const updateVillain = (villain: Villain) => {
  state.villains.update((old: Villain[]) => {
    const index = old.findIndex((v) => v.id === villain.id);
    old.splice(index, 1, villain);
    return [...old];
  });
};

export {
  state,
  addHero,
  addVillain,
  deleteHero,
  deleteVillain,
  getBusy,
  getHeroes,
  getMovies,
  getSession,
  getVillains,
  updateHero,
  updateVillain,
};
