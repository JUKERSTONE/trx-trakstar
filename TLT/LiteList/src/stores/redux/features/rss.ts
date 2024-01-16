import {createSlice} from '@reduxjs/toolkit';

export const rssSlice = createSlice({
  name: 'rss',
  initialState: {
    complex: null,
    pitchfork: null,
  },
  reducers: {
    setRSS: (state, action) => {
      const {complexRSS, pitchforkRSS} = action.payload;
      state.complex = complexRSS;
      state.pitchfork = pitchforkRSS;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setRSS} = rssSlice.actions;

export const rssReducer = rssSlice.reducer;
