import {createSlice} from '@reduxjs/toolkit';

export const keysSlice = createSlice({
  name: 'keys',
  initialState: {
    spotify: {
      accessToken: null,
      refreshToken: null,
      appToken: null,
      isOOS: false,
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
    setSpotifyOOS: (state, action) => {
      const isOOS = action.payload;
      console.log('🚀 ~ file: keys.ts:42 ~ isOOS:', isOOS);

      state.spotify = {
        ...state.spotify,
        isOOS,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  storeKeysSpotify,
  storeKeysTRX,
  setSpotifyClientToken,
  setSpotifyOOS,
} = keysSlice.actions;

export const keysReducer = keysSlice.reducer;
