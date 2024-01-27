import {createSlice} from '@reduxjs/toolkit';

export const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState: {
    packages: [],
  },
  reducers: {
    setSubscriptions: (state, action) => {
      const subscriptions = action.payload;
      console.log(
        '🚀 ~ file: subscriptions.ts ~ line 11 ~ subscriptions',
        subscriptions,
      );
      state.packages = subscriptions;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setSubscriptions} = subscriptionsSlice.actions;

export const subscriptionsReducer = subscriptionsSlice.reducer;
