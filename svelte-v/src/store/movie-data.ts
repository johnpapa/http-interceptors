import axios from 'axios';
import * as store from './store';
import { parseList } from './http-utils';
import { API } from '../config';
import { Movie } from '../models';

export async function getMoviesAction() {
  try {
    const url = `${API}/movies`;
    const response = await axios.get(url);
    const movies: Movie[] = parseList(response);
    store.getMovies(movies);
    return movies;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}
