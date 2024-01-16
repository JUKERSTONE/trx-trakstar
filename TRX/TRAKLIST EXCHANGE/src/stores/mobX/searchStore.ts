import {extendObservable} from 'mobx';

class SearchStore {
  constructor() {
    extendObservable(this, {
      index: [0],
      cache: new Set(),
      result: [],
    });
  }
}

export const IStore = new SearchStore() as any;
