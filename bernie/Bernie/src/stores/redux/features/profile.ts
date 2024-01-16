import {createSlice} from '@reduxjs/toolkit';

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
  },
});

// Action creators are generated for each case reducer function
export const {setFirebaseProfile, setTRXProfile} = profileSlice.actions;

export const profileReducer = profileSlice.reducer;
