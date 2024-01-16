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
      trx: null,
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
    setTRAKLANDProfile: (state: any, action) => {
      const {apple_music, spotify} = action.payload;
      console.log(
        '🚀 ~ file: profile.ts ~ line 29 ~ action.payload',
        action.payload,
      );

      state.trakland = {
        ...state.trakland,
        apple_music,
        spotify,
      };
    },
    setTrakland: (state: any, action) => {
      const item = action.payload;
      console.log(
        '🚀 ~ file: profile.ts ~ line 29 ~ action.payload',
        action.payload,
      );

      if (!state.trakland.trx) {
        state.trakland.trx = [item];
      } else {
        const exists = state.trakland.trx.find(
          (existingItem: any) => existingItem.trak.isrc === item.trak.isrc,
        );

        // If the item does not exist, push it to the trakland array
        if (!exists) {
          state.trakland.trx = [...state.trakland.trx, item];
        }
      }
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
    setLikes: (state: any, action) => {
      const {likes} = action.payload;
      console.log('🚀 ~ file: profile.ts ~ line 64 ~ likes', likes);
      state.TRX = {
        ...state.TRX,
        likes,
      };
    },
    appendLike: (state: any, action) => {
      const trak = action.payload;
      console.log('🚀 ~ file: profile.ts:72 ~ trak:', trak);

      const isOriginal = trak.NFTFileName;

      const likeExists = isOriginal
        ? state.TRX.likes.some(
            (like: any) => like.NFTFileName === trak.NFTFileName,
          )
        : state.TRX.likes.some((like: any) => {
            console.log(
              '🚀 ~ file: profile.ts:83 ~ :state.TRX.likes.some ~ like:',
              like,
            );
            return trak.isrc
              ? like.isrc === trak.isrc
              : trak.trxUri
              ? like.trxUri === trak.trxUri
              : like.preview === trak.preview;
          });
      console.log(
        '🚀 ~ file: profile.ts:83 ~ state.TRX.likes:',
        state.TRX.likes,
      );
      console.log('🚀 ~ file: profile.ts:75 ~ likeExists:', likeExists);

      if (!likeExists) {
        state.TRX = {
          ...state.TRX,
          likes: [trak, ...state.TRX.likes],
        };
      }
    },
    unLike: (state: any, action) => {
      const {updatedArray} = action.payload;

      state.TRX = {
        ...state.TRX,
        likes: updatedArray,
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
  setLikes,
  appendLike,
  unLike,
  setTrakland,
} = profileSlice.actions;

export const profileReducer = profileSlice.reducer;
