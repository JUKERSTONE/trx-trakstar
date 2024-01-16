import {configureStore} from '@reduxjs/toolkit';
import {
  keysReducer,
  searchReducer,
  profileReducer,
  modalReducer,
  playerReducer,
  authenticationReducer,
  tucReducer,
  messagingReducer,
  subscriptionsReducer,
  cryptoReducer,
  rssReducer,
  feedReducer,
  basketReducer,
  DownloadQueueReducer,
} from './features';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    keys: keysReducer,
    search: searchReducer,
    profile: profileReducer,
    modal: modalReducer,
    player: playerReducer,
    traklist_utility_coin: tucReducer,
    messaging: messagingReducer,
    subscriptions: subscriptionsReducer,
    crypto: cryptoReducer,
    rss: rssReducer,
    feed: feedReducer,
    checkout: basketReducer,
    downloads: DownloadQueueReducer,
  },
});
