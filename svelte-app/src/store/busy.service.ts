import { type BusyState, notBusyPayload } from '../models';
import * as store from './store';

let busyCounter = 0;

export function increment(message: string) {
  busyCounter++;
  const state: BusyState = { isBusy: true, message };
  store.getBusy(state);
}

export function decrement() {
  busyCounter--;
  if (busyCounter <= 0) {
    store.getBusy(notBusyPayload);
  }
}
