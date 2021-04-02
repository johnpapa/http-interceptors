import * as store from './store';
import { parseItem, parseList } from './http-utils';
import { API } from '../config';
import { Hero } from '../models';

export async function getHeroesAction() {
  try {
    const response = await fetch(`${API}/heroes`, {
      method: 'GET',
    });
    const heroes: Hero[] = await parseList<Hero>(response);
    store.getHeroes(heroes);
    return heroes;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

export async function deleteHeroAction(hero: Hero) {
  try {
    const response = await fetch(`${API}/heroes/${hero.id}`, {
      method: 'DELETE',
    });
    await parseItem<Hero>(response, 200);
    store.deleteHero(hero);
    return null;
  } catch (error) {
    console.error(error);
  }
}
export async function updateHeroAction(hero: Hero) {
  try {
    const response = await fetch(`${API}/heroes/${hero.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hero),
    });
    const updatedHero: Hero = await parseItem<Hero>(response, 200);
    store.updateHero(updatedHero);
    return updatedHero;
  } catch (error) {
    console.error(error);
  }
}
export async function addHeroAction(hero: Hero) {
  try {
    const response = await fetch(`${API}/heroes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hero),
    });
    const addedHero: Hero = await parseItem<Hero>(response, 201);
    store.addHero(addedHero);
    return addedHero;
  } catch (error) {
    console.error(error);
  }
}
