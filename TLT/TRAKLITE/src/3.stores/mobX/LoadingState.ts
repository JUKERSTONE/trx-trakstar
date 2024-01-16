import {extendObservable} from 'mobx';

/**
 * UserStore
 */
class IndexStore {
  constructor() {
    extendObservable(this, {
      loading: false,
    });
  }
}

export const LState = new IndexStore() as any;
