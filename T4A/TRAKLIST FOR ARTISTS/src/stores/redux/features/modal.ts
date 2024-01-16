import {createSlice} from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    type: '',
    exchange: {
      active: false,
    },
  },
  reducers: {
    toggleExchangeView: (state, action) => {
      console.log('🚀 ~ file: modal.ts ~ line 14 ~ action', action);

      const modal = action.payload;
      console.log('🚀 ~ file: modal.ts ~ line 16 ~ modal', modal);
      state.exchange = modal.exchange;
      state.type = modal.type;
    },
  },
});

// Action creators are generated for each case reducer function
export const {toggleExchangeView} = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
