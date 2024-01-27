import {createSlice} from '@reduxjs/toolkit';

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setAuthentication: (state, action) => {
      const authentication = action.payload;
      console.log(
        '🚀 ~ file: authentication.ts ~ line 11 ~ authentication',
        authentication,
      );
      state.isLoggedIn = authentication;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setAuthentication} = authenticationSlice.actions;

export const authenticationReducer = authenticationSlice.reducer;
