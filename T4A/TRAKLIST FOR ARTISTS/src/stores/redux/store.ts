import {configureStore} from '@reduxjs/toolkit';
import {
  keysReducer,
  searchReducer,
  profileReducer,
  modalReducer,
  authenticationReducer,
} from './features';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    keys: keysReducer,
    search: searchReducer,
    profile: profileReducer,
    modal: modalReducer,
  },
});
