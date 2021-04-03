import axios from 'axios';
import * as store from './store';
import { parseItem, parseList, stuffHeaders } from './http-utils';
import { API } from '../config';
import { Hero } from '../models';

export async function getHeroesAction() {
  try {
    const headers = stuffHeaders();
    const response = await axios.get(`${API}/heroes`, { headers });
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
    const headers = stuffHeaders();
    const response = await axios.delete(`${API}/heroes/${hero.id}`, {
      headers,
    });
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
    const headers = stuffHeaders();
    const response = await axios.put(`${API}/heroes/${hero.id}`, data, {
      headers,
    });
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
    const headers = stuffHeaders();
    const response = await axios.post(`${API}/heroes`, data, { headers });
    const addedHero: Hero = parseItem<Hero>(response, 201);
    store.addHero(addedHero);
    return addedHero;
  } catch (error) {
    console.error(error);
  }
}
