import {createSlice} from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    response: null,
  },
  reducers: {
    storeSearch: (state, action) => {
      const result = action.payload;
      state.response = result;
    },
  },
});

// Action creators are generated for each case reducer function
export const {storeSearch} = searchSlice.actions;

export const searchReducer = searchSlice.reducer;
