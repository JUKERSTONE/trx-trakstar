import {createSlice} from '@reduxjs/toolkit';

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: {
    transactions: [],
    wallet: {
      bitcoin: null,
      stacks: null,
      solana: null,
      etheruem: null,
    },
  },
  reducers: {
    setTransactions: (state, action) => {
      const {transactions} = action.payload;

      state.transactions = transactions;
    },
    appendTransaction: (state: any, action) => {
      const transaction = action.payload;

      state.transactions = [transaction, ...state.transactions];
    },
    handleUpdateBalances: (state: any, action) => {
      const wallet = action.payload;

      state.wallet = wallet;
    },
    handlePublicKeys: (state: any, action) => {
      const wallet = action.payload;

      state.wallet = wallet;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setTransactions,
  appendTransaction,
  handleUpdateBalances,
  handlePublicKeys,
} = cryptoSlice.actions;

export const cryptoReducer = cryptoSlice.reducer;
