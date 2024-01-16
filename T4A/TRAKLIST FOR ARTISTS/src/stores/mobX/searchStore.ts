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

export const SStore = new SearchStore() as any;
