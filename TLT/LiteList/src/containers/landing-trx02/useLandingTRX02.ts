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

import {store, handleMediaPlayerAction} from '../../stores';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

export const useLandingTRX02 = ({navigation, route}: any) => {
  const [trx02, setTRX02] = useState([]);
  const [mappedtrx002, setMappedtrx002] = useState<any>(null);

  useEffectAsync(async () => {
    const trx02 = await handleGetTRX02();
    console.log(
      '🚀 ~ file: useLandingTRX02.ts:25 ~ useEffectAsync ~ trx02:',
      trx02,
    );

    const mappedtrx002 = trx02.map((trak: any) => ({
      uri: trak.coverArtUrl,
      captionTop: trak.title,
      captionBottom: trak.artists.artist,
      nav: trak.audioUrl,
    }));
    setMappedtrx002(mappedtrx002);
  }, []);

  const handleTRAK = async (trak: any) => {
    console.log('🚀 ~ file: useLandingTRX01.ts:35 ~ handleTRX01 ~ trak:', trak);
    Toast.show({
      type: 'success',
      text1: 'Playing TRX Original Track',
      text2: `${trak.captionBottom} - ${trak.captionTop}`,
    });

    const action = handleMediaPlayerAction({
      playbackState: 'source',
      uri: trak.nav,
      url: trak.uri,
      artist: trak.captionBottom,
      title: trak.captionTop,
      mode: 'header',
      id: {
        spotify: null,
        apple_music: null,
        traklist: trak.nav,
      },
      isrc: null,
    });
    store.dispatch(action);
  };

  return {
    data: mappedtrx002,
    handleTRAK,
  };
};
