import {createSlice} from '@reduxjs/toolkit';

export const timelineSlice = createSlice({
  name: 'feed',
  initialState: {
    timeline: null,
  },
  reducers: {
    setTimeline: (state, action) => {
      const {timeline} = action.payload;
      state.timeline = timeline;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setTimeline} = timelineSlice.actions;

export const feedReducer = timelineSlice.reducer;
