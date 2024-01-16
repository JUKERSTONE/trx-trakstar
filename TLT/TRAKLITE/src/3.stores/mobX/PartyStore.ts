import {extendObservable} from 'mobx';

/**
 * UserStore
 */
class PartyStore {
  constructor() {
    extendObservable(this, {});
  }
}

export const PStore = new PartyStore() as any;
