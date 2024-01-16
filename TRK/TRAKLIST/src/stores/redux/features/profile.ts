import {createSlice} from '@reduxjs/toolkit';
import {asyncStorageIndex, useAsyncStorage} from '../../async';

const {handleStore} = useAsyncStorage();

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    firebase: {},
    TRX: {},
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
    refreshWallet: (state: any, action) => {
      const item = action.payload;
      state.TRX = {
        ...state.TRX,
        wallet: item,
      };

      const key = asyncStorageIndex.profile;
      handleStore({key, value: state.TRX});
    },
  },
});

// Action creators are generated for each case reducer function
export const {setFirebaseProfile, setTRXProfile, appendWallet, refreshWallet} =
  profileSlice.actions;

export const profileReducer = profileSlice.reducer;
