import axios from 'axios';
import * as store from './store';
import { parseList } from './http-utils';
import { API } from '../config';
import { Movie } from '../models';

export async function getMoviesAction() {
  try {
    const response = await axios.get(`${API}/movies`);
    const movies: Movie[] = parseList(response);
    store.getMovies(movies);
    return movies;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}
