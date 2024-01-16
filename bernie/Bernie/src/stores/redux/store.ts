import {configureStore} from '@reduxjs/toolkit';
import {keysReducer, profileReducer, trakReducer} from './features';

export const store = configureStore({
  reducer: {
    keys: keysReducer,
    profile: profileReducer,
    trak: trakReducer,
  },
});
