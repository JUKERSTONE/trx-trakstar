import {createSlice} from '@reduxjs/toolkit';
import {asyncStorageIndex, useAsyncStorage} from '../../async';

const {handleStore} = useAsyncStorage();

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    firebase: {},
    TRX: {},
    trakland: {
      spotify: null,
      apple_music: null,
      genius: null,
      snapchat: null,
    },
  },
  reducers: {
    setFirebaseProfile: (state, action) => {
      const firebase = action.payload;
      state.firebase = firebase;
    },
    setTRXProfile: (state, action) => {
      const TRX = action.payload;
      state.TRX = {...state.TRX, ...TRX};
    },
    appendWallet: (state: any, action) => {
      const item = action.payload;
      state.TRX = {
        ...state.TRX,
        wallet: [...state.TRX.wallet, item],
      };

      const key = asyncStorageIndex.profile;
      handleStore({key, value: state.TRX});
    },
    tempAppendWallet: (state: any, action) => {
      const item = action.payload;
      state.TRX = {
        ...state.TRX,
        wallet: {
          ...state.TRX.wallet,
          nft: [...state.TRX.wallet.nft, item],
        },
      };

      const key = asyncStorageIndex.profile;
      handleStore({key, value: state.TRX});
    },
    setTRAKLANDProfile: (state: any, action) => {
      const {apple_music, spotify} = action.payload;

      state.trakland = {
        apple_music,
        spotify,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setFirebaseProfile,
  setTRXProfile,
  appendWallet,
  tempAppendWallet,
  setTRAKLANDProfile,
} = profileSlice.actions;

export const profileReducer = profileSlice.reducer;
