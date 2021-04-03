export interface BusyPayload {
  isBusy: boolean;
  message?: string;
}
const notBusyPayload: BusyPayload = { isBusy: false };

let subject; // = new ReplaySubject<BusyPayload>();
let busyCounter = 0;
// busyState$ = subject.asObservable();

export function increment(message: string) {
  busyCounter++;
  const payload: BusyPayload = { isBusy: true, message };
  // subject.next(payload);
}

export function decrement() {
  busyCounter--;
  if (busyCounter <= 0) {
    // subject.next(notBusyPayload);
  }
}
