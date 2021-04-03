import * as store from './store';
import { parseList } from './http-utils';
import { API } from '../config';
import { Movie } from '../models';

export async function getMoviesAction() {
  try {
    const response = await fetch(`${API}/movies`, {
      method: 'GET',
    });
    const movies: Movie[] = await parseList(response);
    store.getMovies(movies);
    return movies;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}
