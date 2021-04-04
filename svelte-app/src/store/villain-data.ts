import axios from 'axios';
import * as store from './store';
import { parseItem, parseList, stuffHeaders } from './http-utils';
import { API } from '../config';
import { Villain } from '../models';

export async function getVillainsAction() {
  try {
    const headers = stuffHeaders();
    const url = `${API}/villains`;
    const response = await axios.get(url, { headers });
    const villains: Villain[] = parseList<Villain>(response);
    store.getVillains(villains);
    return villains;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

export async function deleteVillainAction(villain: Villain) {
  try {
    const headers = stuffHeaders();
    const url = `${API}/villains/${villain.id}`;
    const response = await axios.delete(url, { headers });
    parseItem<Villain>(response, 200);
    store.deleteVillain(villain);
    return null;
  } catch (error) {
    console.error(error);
  }
}

export async function updateVillainAction(villain: Villain) {
  try {
    const data = JSON.stringify(villain);
    const headers = stuffHeaders();
    const url = `${API}/villains/${villain.id}`;
    const response = await axios.put(url, data, { headers });
    const updatedVillain: Villain = parseItem<Villain>(response, 200);
    store.updateVillain(updatedVillain);
    return updatedVillain;
  } catch (error) {
    console.error(error);
  }
}

export async function addVillainAction(villain: Villain) {
  try {
    const data = JSON.stringify(villain);
    const headers = stuffHeaders();
    const url = `${API}/villains`;
    const response = await axios.post(url, data, { headers });
    const addedVillain: Villain = parseItem<Villain>(response, 201);
    store.addVillain(addedVillain);
    return addedVillain;
  } catch (error) {
    console.error(error);
  }
}
