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

export const handleUpdateTRAKLIST = async ({trak}: any) => {
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

  const userCategory = TRXProfile.userCategory;
  console.log(
    '🚀 ~ file: appendTRAKLIST.ts ~ line 33 ~ handleAppendLikes ~ userCategory',
    userCategory,
  );

  const trakId = uuid.v4() as string;

  const {protocol, TRAK} = trak;
  console.log(
    "🚀 ~ file: appendTRAKLIST.ts ~ line 55 ~ handleAppendLikes ~ TRAK?.trak?.spotify?.uri.split(':')[2]",
    TRAK?.trak?.spotify?.uri.split(':')[2],
  );

  const route = api.spotify({
    method: 'song',
    payload: {trakId: TRAK?.trak?.spotify?.uri.split(':')[2]},
  });

  const isrc = await useGET({route, token: appToken})
    .then(response => {
      console.log(
        '🚀 ~ file: appendTRAKLIST.ts ~ line 55 ~ handleAppendLikes ~ response',
        response,
      );

      return response.data.external_ids.isrc;
    })
    .catch(async (err: any) => {
      return await AppleMusic.getSong(TRAK?.trak?.apple_music?.id)
        .then((res: any) => {
          console.log(
            '🚀 ~ file: appendTRAKLIST.ts ~ line 76 ~ awaitAppleMusic.getSong ~ res',
            res,
          );

          return res[0].attributes.isrc;
          //
          //
        })
        .catch((err: any) => {
          Toast.show({
            type: 'error',
            text1: 'Track not saved? [NO ISRC]',
            text2: 'Sorry! Better luck next time',
          });
        });
    });

  const trakURI = `trx:00:${isrc}`;

  if (!isrc) return;

  await firestore()
    .doc(`TRX/${trakURI}`)
    .set({
      title: TRAK?.trak?.title,
      artist: TRAK?.trak?.artist,
      isrc: isrc,
      serialized_trak: JSON.stringify({protocol: 'trx-00', TRAK: TRAK}),
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
