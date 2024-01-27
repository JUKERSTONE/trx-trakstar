import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {
  useLITELISTState,
  handleAppendTRAKLIST,
  useEffectAsync,
  handleGetTRX01,
} from '../../app';
import Toast from 'react-native-toast-message';
import {handleMediaPlayerAction, store} from '../../stores';

export const useLandingTRX01 = ({navigation, route}: any) => {
  const [trx01, setTRX01] = useState([]);
  const [mappedtrx001, setMappedtrx001] = useState<any>(null);

  useEffect(() => {
    const mappedtrx001 = trx01.map((trak: any) => ({
      uri: trak.coverArtUrl,
      captionTop: trak.title,
      captionBottom: trak.bots.artist,
      nav: trak.audioUrl,
    }));
    setMappedtrx001(mappedtrx001);
  }, [trx01]);

  useEffectAsync(async () => {
    const trx01 = await handleGetTRX01();
    console.log(
      '🚀 ~ file: useLandingTRX01.ts:15 ~ useEffectAsync ~ trx01:',
      trx01,
    );
    setTRX01(trx01);
  }, []);

  const handleTRX01 = (trak: any) => {
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
    data: mappedtrx001,
    handleTRX01,
  };
};
