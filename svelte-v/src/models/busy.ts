export interface BusyState {
  isBusy: boolean;
  message?: string;
}
export const notBusyPayload: BusyState = { isBusy: false };
