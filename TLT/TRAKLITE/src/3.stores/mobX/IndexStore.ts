import {extendObservable} from 'mobx';

/**
 * UserStore
 */
class IndexStore {
  constructor() {
    extendObservable(this, {
      index: [0],
      cache: new Set(),
    });
  }
}

export const IStore = new IndexStore() as any;
