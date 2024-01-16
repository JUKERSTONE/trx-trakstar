import {createSlice} from '@reduxjs/toolkit';

export const keysSlice = createSlice({
  name: 'keys',
  initialState: {
    spotify: {
      accessToken: null,
      accessTokenExpirationDate: null,
      refreshToken: null,
    },
    trx: {
      accessToken: null,
    },
  },
  reducers: {
    storeKeysSpotify: (state, action) => {
      const {accessToken, accessTokenExpirationDate, refreshToken} =
        action.payload;
      state.spotify = {
        accessToken,
        accessTokenExpirationDate,
        refreshToken,
      };
    },
    storeKeysTRX: (state, action) => {
      const accessToken = action.payload;

      state.trx = {
        accessToken,
      };
    },
    setSpotifyClientToken: (state: any, action) => {
      const client = action.payload;

      state.spotify = {
        ...state.spotify,
        client,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {storeKeysSpotify, storeKeysTRX, setSpotifyClientToken} =
  keysSlice.actions;

export const keysReducer = keysSlice.reducer;
