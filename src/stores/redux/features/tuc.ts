import {createSlice} from '@reduxjs/toolkit';

export const tucSlice = createSlice({
  name: 'traklist_utility_coin',
  initialState: {
    market_cap: null,
    price: null,
  },
  reducers: {
    setTUC: (state, action) => {
      const {market_cap, price} = action.payload;
      // console.log('🚀 ~ file: tuc.ts ~ line 9 ~ coin', coin);
      state.market_cap = market_cap;
      state.price = price;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setTUC} = tucSlice.actions;

export const tucReducer = tucSlice.reducer;
