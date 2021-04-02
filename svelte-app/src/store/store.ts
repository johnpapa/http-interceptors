import { Writable, writable } from 'svelte/store';
import { Movie, Product } from '../models';

interface AppState {
  movies: Writable<Movie[]>;
  products: Writable<Product[]>;
}
const state: AppState = {
  movies: writable([]),
  products: writable([]),
};

const getMovies = (movies: Movie[]) => {
  state.movies.update((old: Movie[]) => movies);
};
const getProducts = (products: Product[]) => {
  state.products.update((old: Product[]) => products);
};

const addProduct = (product: Product) => {
  state.products.update((old: Product[]) => {
    old.unshift(product);
    return old;
  });
};

const deleteProduct = (product: Product) => {
  state.products.update((old: Product[]) => [
    ...old.filter((p) => p.id !== product.id),
  ]);
};

const updateProduct = (product: Product) => {
  state.products.update((old: Product[]) => {
    const index = old.findIndex((p) => p.id === product.id);
    old.splice(index, 1, product);
    return [...old];
  });
};

export {
  state,
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getMovies,
};
