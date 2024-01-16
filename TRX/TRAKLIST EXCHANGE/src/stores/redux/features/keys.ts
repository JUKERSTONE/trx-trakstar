import {createSlice} from '@reduxjs/toolkit';

export const keysSlice = createSlice({
  name: 'keys',
  initialState: {
    spotify: {
      accessToken: null,
      refreshToken: null,
      appToken: null,
    },
    trx: {
      accessToken: null,
    },
  },
  reducers: {
    storeKeysSpotify: (state, action) => {
      const {accessToken, refreshToken} = action.payload;
      state.spotify = {
        ...state.spotify,
        accessToken,
        refreshToken,
      };
    },
    storeKeysTRX: (state, action) => {
      const accessToken = action.payload;

      state.trx = {
        accessToken,
      };
    },
    setSpotifyClientToken: (state, action) => {
      const appToken = action.payload;

      state.spotify = {
        ...state.spotify,
        appToken,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {storeKeysSpotify, storeKeysTRX, setSpotifyClientToken} =
  keysSlice.actions;

export const keysReducer = keysSlice.reducer;
