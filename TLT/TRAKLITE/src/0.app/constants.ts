export const GET_STATE = (store: any) => store.getState();

export const PERSISTED_KEYS = (store: any) => store.getState()?.keys;
export const PERSISTED_ISONBOARDED = (store: any) =>
  store.getState()?.offline.isOnboarded;
export const PERSISTED_OFFLINE = (store: any) => store.getState()?.offline;
