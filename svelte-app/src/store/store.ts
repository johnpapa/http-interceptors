import { Writable, writable } from 'svelte/store';
import { Movie, Hero } from '../models';

interface AppState {
  movies: Writable<Movie[]>;
  heroes: Writable<Hero[]>;
}
const state: AppState = {
  movies: writable([]),
  heroes: writable([]),
};

const getMovies = (movies: Movie[]) => {
  state.movies.update((old: Movie[]) => movies);
};
const getHeroes = (heroes: Hero[]) => {
  state.heroes.update((old: Hero[]) => heroes);
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

export { state, addHero, getHeroes, updateHero, deleteHero, getMovies };
