import {createSlice} from '@reduxjs/toolkit';

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    paused: true,
    muted: false,
    repeat: true,
    source: {},
    image: {},
    artist: '',
    title: '',
  },
  reducers: {
    handleMediaPlayerAction: (state, action) => {
      const {playbackState, uri, url, artist, title} = action.payload;

      switch (playbackState) {
        case 'pause':
          state.paused = !state.paused;
          break;
        case 'mute':
          state.muted = !state.muted;
          break;
        case 'repeat':
          state.repeat = !state.repeat;
          break;
        case 'source':
          state.source = {uri};
          state.paused = false;
          state.image = {uri: url};
          state.artist = artist;
          state.title = title;
          break;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {handleMediaPlayerAction} = playerSlice.actions;

export const playerReducer = playerSlice.reducer;
