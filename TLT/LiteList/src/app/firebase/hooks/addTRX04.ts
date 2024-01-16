import auth from '@react-native-firebase/auth';
import {
  store,
  setTRXProfile,
  useAsyncStorage,
  setFirebaseProfile,
  storeKeysTRX,
} from '../../../stores';
import {api, useAPI} from '../../../api';
import firestore from '@react-native-firebase/firestore';
import {useLITELISTState} from '../../useLITELISTState';
import moment from 'moment';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import uuid from 'react-native-uuid';
import {Alert} from 'react-native';
import {useSelector} from 'react-redux';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {handleLikeTRAK} from '.';
// @ts-ignore
import AppleMusic from '@bouncyapp/react-native-apple-music';

export const handleAddTRX04 = async ({trak}: any) => {
  const {useGET} = useAPI();
  console.log(
    '🚀 ~ file: appendTRAKLIST.ts ~ line 18 ~ handleAppendLikes ~ trak',
    trak,
  );
  // trak - trx-00 pools
  // artist - trx-33

  const {handleGetState} = useLITELISTState();

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

  const ytid = trak.trak?.youtube?.url.split('=')[1];

  const trakURI = `trx:04:${ytid}`;

  if (!ytid) return;

  return await firestore()
    .doc(`trx-04/${trakURI}`)
    .set({
      title: trak.trak?.title,
      artist: trak?.trak?.artist,
      ytid,
      serialized_trak: JSON.stringify({protocol: 'trx-04', TRAK: trak}),
    })
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
