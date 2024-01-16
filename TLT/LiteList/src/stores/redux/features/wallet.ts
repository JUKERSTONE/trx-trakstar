import {createSlice} from '@reduxjs/toolkit';
import {asyncStorageIndex, useAsyncStorage} from '../../async';

const {handleStore} = useAsyncStorage();

export const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    tuc: null,
    trak: [],
    nft: [],
  },
  reducers: {
    // setTRXWallet: (state, action) => {
    //   const wallet = action.payload;
    //   // console.log('🚀 ~ file: wallet.ts ~ line 12 ~ wallet', wallet);

    //   state.nft = wallet.nft;
    //   state.trak = wallet.trak;
    // },
    handleExchangeTRAK: (state: any, action) => {
      const item = action.payload;
      console.log('🚀 ~ file: wallet.ts ~ line 30 ~ item', item);
      state.trak = item;
    },
    handleBuyNFT: (state: any, action) => {
      const item = action.payload;
      console.log('🚀 ~ file: wallet.ts ~ line 30 ~ item', item);
      state.nft = item;
    },
    appendWalletPayment: (state: any, action) => {
      const {value, tokency} = action.payload;

      state[tokency] = value;
      state.tuc = state.tuc + value;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  // setTRXWallet,
  handleExchangeTRAK,
  handleBuyNFT,
  appendWalletPayment,
} = walletSlice.actions;

export const walletReducer = walletSlice.reducer;
