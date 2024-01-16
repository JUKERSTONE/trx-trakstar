import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {api, useAPI} from '../../api';
import {useTRAKLISTState} from '../../app';
import {handleMediaPlayerAction, setYoutubeId, store} from '../../stores';

export const useCollection = ({navigation}: any) => {
  const [releases, setReleases] = useState();

  const {handleGetState} = useTRAKLISTState();
  const keys = handleGetState({index: 'keys'});
  const spotify = keys.spotify;
  const clientKey = spotify.client;

  const handlePlayPiP = item => {
    console.log('🚀 ~ file: useCollection.ts:15 ~ handlePlayPiP ~ item:', item);

    const action1 = handleMediaPlayerAction({
      playbackState: 'pause:force',
    });
    store.dispatch(action1);
    const action = setYoutubeId({
      youtubeId: item.url,
      player: {
        // geniusId: trak.trak.genius.id,
        title: item.title,
        artist: 'trak.trak.artist',
        cover_art: 'trak.trak.thumbnail',
      },
    });
    store.dispatch(action);
  };

  return {
    handlePlayPiP,
  };
};
