import {createSlice} from '@reduxjs/toolkit';

export const keysSlice = createSlice({
  name: 'keys',
  initialState: {
    spotify: {
      bernie: {
        access_token: null,
        expires_in: null,
        token_type: null,
      },
    },
    trx: {
      accessToken: null,
    },
  },
  reducers: {
    storeKeysSpotifyClient: (state, action) => {
      const {access_token, expires_in, token_type} = action.payload;
      state.spotify.bernie = {
        access_token,
        expires_in,
        token_type,
      };
    },
    storeKeysTRX: (state, action) => {
      const accessToken = action.payload;

      state.trx = {
        accessToken,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {storeKeysSpotifyClient, storeKeysTRX} = keysSlice.actions;

export const keysReducer = keysSlice.reducer;
