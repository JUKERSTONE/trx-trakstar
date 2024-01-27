import React, {useEffect, useState, useContext} from 'react';
import {Alert} from 'react-native';
import {api, useAPI} from '../../api';
import {
  useLITELISTState,
  handleAppendTRAKLIST,
  useEffectAsync,
  handleGetTRX01,
  handleGetTRX02,
} from '../../app';

import {store, handleMediaPlayerAction, setYoutubeId} from '../../stores';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {handleTrakStarListenAgain} from '../../app/firebase/getTrakstarListenAgain';

export const useLandingListenAgain = ({navigation, route}: any) => {
  const [trx02, setTRX02] = useState([]);
  const [listenAgain, setListenAgain] = useState<any>(null);

  useEffectAsync(async () => {
    const trending = await handleTrakStarListenAgain();
    console.log(
      '🚀 ~ file: useLandingListenAgain.ts:22 ~ useEffectAsync ~ trending:',
      trending,
    );

    const mappedtrx002 = trending.map((trak: any) => ({
      uri: trak.cover_art,
      captionTop: trak.title,
      captionBottom: trak.artist,
      nav: trak.nav,
    }));

    setListenAgain(mappedtrx002);
  }, []);

  const handleTRAK = async (trak: any) => {
    console.log(
      '🚀 ~ file: useLandingListenAgain.ts:34 ~ handleTRAK ~ trak:',
      trak,
    );

    const action1 = handleMediaPlayerAction({
      playbackState: 'pause:force',
    });
    store.dispatch(action1);

    const action = setYoutubeId({
      youtubeId: `http://www.youtube.com/watch?v=${trak.nav.split(':')[2]}`,
      player: {
        title: trak.captionTop,
        artist: trak.captionBottom,
        cover_art: trak.uri,
        // geniusId: trak.genius.id,
      },
    });
    store.dispatch(action);
  };

  return {
    data: listenAgain,
    handleTRAK,
  };
};
