import React, {useEffect, useState, useContext, useRef} from 'react';
import {Alert} from 'react-native';
import {
  store,
  handleMediaPlayerAction,
  addToBasket,
  removeFromBasket,
  useAsyncStorage,
  asyncStorageIndex,
} from '../../stores';
import {
  useLITELISTState,
  useFirebase,
  handleGetProductsByCategory,
  useEffectAsync,
} from '../../app';
import {useAPI} from '../../api';
import {useStripe} from '@stripe/stripe-react-native';
import firestore from '@react-native-firebase/firestore';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useTRX} from '../../app/hooks/useTRX';
import {useSelector} from 'react-redux';

export const useAdmin = ({navigation, route}: any) => {
  const player = useSelector((state: any) => state.player);
  console.log('🚀 ~ useAdmin ~ player:', player);
  const {handleStreamTRX} = useTRX();
  const {handleClear, handleStore, handleGet} = useAsyncStorage();

  const handleTestStream = async () => {
    console.log('🚀 ~ useAdmin ~ pefeeelayer:', {
      artist: player.players.youtube.artist,
      cover_art: player.players.youtube.cover_art,
      geniusId: player.players.youtube.geniusId,
      title: player.players.youtube.title,
      uri: '00',
      youtubeId: player.youtubeId,
    });
    // const state = await handleGet({key: asyncStorageIndex.radio});
    // console.log('🚀 ~ handleTestStream ~ state:', state);
    await handleStreamTRX({
      artist: player.players.youtube.artist,
      cover_art: player.players.youtube.cover_art,
      geniusId: player.players.youtube.geniusId,
      title: player.players.youtube.title,
      uri: '00',
      youtubeId: player.youtubeId,
    }).then(() => {
      alert(player.players.youtube.title);
    });
  };
  return {
    handleTestStream,
  };
};
