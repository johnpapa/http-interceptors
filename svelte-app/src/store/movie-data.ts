import axios from 'axios';
import * as store from './store';
import { parseList, stuffHeaders } from './http-utils';
import { API } from '../config';
import { Movie } from '../models';
import * as busyService from './busy.service';

const loadingMessage = 'Loading ...';

export async function getMoviesAction() {
  try {
    const headers = stuffHeaders();
    busyService.increment(loadingMessage);
    const response = await axios.get(`${API}/movies2`, { headers });
    const movies: Movie[] = parseList(response);
    store.getMovies(movies);
    return movies;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  } finally {
    busyService.decrement();
  }
}
