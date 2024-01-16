import {configureStore} from '@reduxjs/toolkit';
import {
  keysReducer,
  searchReducer,
  profileReducer,
  modalReducer,
  playerReducer,
  // walletReducer,
  authenticationReducer,
  tucReducer,
} from './features';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    keys: keysReducer,
    search: searchReducer,
    profile: profileReducer,
    modal: modalReducer,
    player: playerReducer,
    traklist_utility_coin: tucReducer,
    // wallet: walletReducer,
  },
});
