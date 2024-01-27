import {store} from '../../../stores';

export const handleReduxListener = () => {
  const unsubscribe = store.subscribe(() => {
    const state = store.getState();
    console.log('TRAKLIST APP STATE : ', state);
  });
  return unsubscribe;
};
