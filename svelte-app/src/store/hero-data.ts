import axios from 'axios';
import * as store from './store';
import { parseItem, parseList } from './http-utils';
import { API } from '../config';
import { Hero } from '../models';

// import * as sessionService from '../store/session.service';
//
// export function stuffHeaders() {
//   const authHeader = sessionService.accessToken;
//   const headers = {
//     Authorization: `Bearer ${authHeader}`,
//     'Content-Type': 'application/json',
//   };
//   return headers;
// }

export async function getHeroesAction() {
  try {
    // const headers = stuffHeaders();
    const url = `${API}/heroes`;
    const response = await axios.get(url /* { headers } */);
    const heroes: Hero[] = parseList<Hero>(response);
    store.getHeroes(heroes);
    return heroes;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

export async function deleteHeroAction(hero: Hero) {
  try {
    // const headers = stuffHeaders();
    const url = `${API}/heroes/${hero.id}`;
    const response = await axios.delete(url /* { headers } */);
    parseItem<Hero>(response, 200);
    store.deleteHero(hero);
    return null;
  } catch (error) {
    console.error(error);
  }
}

export async function updateHeroAction(hero: Hero) {
  try {
    const data = JSON.stringify(hero);
    // const headers = stuffHeaders();
    const url = `${API}/heroes/${hero.id}`;
    const response = await axios.put(url, data /* { headers } */);
    const updatedHero: Hero = parseItem<Hero>(response, 200);
    store.updateHero(updatedHero);
    return updatedHero;
  } catch (error) {
    console.error(error);
  }
}

export async function addHeroAction(hero: Hero) {
  try {
    const data = JSON.stringify(hero);
    // const headers = stuffHeaders();
    const url = `${API}/heroes`;
    const response = await axios.post(url, data /* { headers } */);
    const addedHero: Hero = parseItem<Hero>(response, 201);
    store.addHero(addedHero);
    return addedHero;
  } catch (error) {
    console.error(error);
  }
}
