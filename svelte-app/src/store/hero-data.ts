import axios, { AxiosRequestConfig } from 'axios';
import * as store from './store';
import { parseItem, parseList } from './http-utils';
import { API } from '../config';
import { Hero } from '../models';

export async function getHeroesAction() {
  try {
    const response = await axios.get(`${API}/heroes`);
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
    const response = await axios.delete(`${API}/heroes/${hero.id}`);
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
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.put(`${API}/heroes/${hero.id}`, data, config);
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
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post(`${API}/heroes`, data, config);
    const addedHero: Hero = parseItem<Hero>(response, 201);
    store.addHero(addedHero);
    return addedHero;
  } catch (error) {
    console.error(error);
  }
}
