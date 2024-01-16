import auth from '@react-native-firebase/auth';
import {
  store,
  setTRXProfile,
  useAsyncStorage,
  setFirebaseProfile,
  storeKeysTRX,
} from '../../stores';
import {routes, useAPI} from '../../api';
import firestore from '@react-native-firebase/firestore';
import {useBERNIEState} from '../useBERNIEState';
import storage from '@react-native-firebase/storage';
import uuid from 'react-native-uuid';
import {Alert} from 'react-native';
import {useSelector} from 'react-redux';
import axios from 'axios';
import Toast from 'react-native-toast-message';
// @ts-ignore
import AppleMusic from '@bouncyapp/react-native-apple-music';
import {TRX_00} from '../../types';

export const handleAddTRX00 = async ({trak}: any) => {
  const {GET} = useAPI();
  console.log(
    '🚀 ~ file: appendTRAKLIST.ts ~ line 18 ~ handleAppendLikes ~ trak',
    trak,
  );
  // trak - trx-00 pools
  // artist - trx-33

  const {handleGetState} = useBERNIEState();

  const keys = handleGetState({index: 'keys'});
  const accessToken = keys.spotify.accessToken;
  const appToken = keys.spotify.appToken;

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  console.log(
    '🚀 ~ file: appendTRAKLIST.ts ~ line 37 ~ handleAppendLikes ~ TRXProfile',
    TRXProfile,
  );

  const trakId = uuid.v4() as string;

  const isrc = trak.isrc;

  const trakURI = `trx:00:${isrc}`;

  console.log('🚀 ~ file: addTRX00.ts:50 ~ handleAddTRX00 ~ trakURI:', trakURI);
  if (!isrc) return;

  const trx00: TRX_00 = {
    title: trak.trak?.title,
    artist: trak?.trak?.artist,
    isrc,
    serialized_trak: JSON.stringify({protocol: 'trx-00', TRAK: trak}),
    audioFeatures: trak?.audioFeatures,
    genres: trak?.genres,
  };

  return await firestore()
    .doc(`TRX/${trakURI}`)
    .set(trx00)
    .then(async () => {
      // alert('You just made history by appending the TRAKLIST!');
      setTimeout(() => {
        Toast.show({
          type: 'info',
          text1: 'You just made history!',
          text2: 'Keep liking to optimize the TRAKLIST',
        });
      }, 1000);
      return trakURI;
    })
    .catch(err => {
      Toast.show({
        type: 'error',
        text1: 'Track not saved?',
        text2: 'Sorry! Better luck next time',
      });
      console.log(
        '🚀 ~ file: appendTRAKLIST.ts ~ line 33 ~ handleAppendLikes ~ err',
        err,
      );
    });
};
