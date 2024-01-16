import {extendObservable} from 'mobx';

/**
 * UserStore
 */
class IndexStore {
  constructor() {
    extendObservable(this, {
      searchResults: [],
    });
  }
}

export const DSStore = new IndexStore() as any;
