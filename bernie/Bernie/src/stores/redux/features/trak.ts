import {createSlice} from '@reduxjs/toolkit';

export const trakSlice = createSlice({
  name: 'trak',
  initialState: {
    fill: {
      spotify: null,
      apple_music: null,
      youtube: null,
      soundcloud: null,
    },
  },
  reducers: {
    setTRXFill: (state, action) => {
      const TRX = action.payload;
      state.fill = {...state.fill, ...TRX};
    },
  },
});

// Action creators are generated for each case reducer function
export const {setTRXFill} = trakSlice.actions;

export const trakReducer = trakSlice.reducer;
