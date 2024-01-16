import {createSlice} from '@reduxjs/toolkit';
import {useAsyncStorage} from '../../async';

const {handleStore} = useAsyncStorage();

export const downloadQueueSlice = createSlice({
  name: 'queue',
  initialState: {
    downloadQueue: [],
    local: [],
  },
  reducers: {
    setDownloadQueue: (state: any, action) => {
      const {download} = action.payload;
      state.downloadQueue = [...state.downloadQueue, ...download];
    },
    setPopQueue: (state: any) => {
      const trak = state.downloadQueue.shift();
      state.local = [...state.local, trak];

      handleStore({key: '.trx', value: state.local});
    },
    handleSetLocal: (state: any, action) => {
      const {local} = action.payload;
      state.local = local;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setDownloadQueue, setPopQueue, handleSetLocal} =
  downloadQueueSlice.actions;

export const DownloadQueueReducer = downloadQueueSlice.reducer;
