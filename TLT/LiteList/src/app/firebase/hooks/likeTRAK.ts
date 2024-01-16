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
import DeviceInfo from 'react-native-device-info';

export const handleLikeTRAK = async ({trak, protocol}: any) => {
  console.log(
    '🚀 ~ file: likeTRAK.ts:22 ~ handleLikeTRAK ~ protocol:',
    protocol,
  );
  console.log('🚀 ~ file: likeTRAK.ts:22 ~ handleLikeTRAK ~ trak:', trak);

  const {handleGetState} = useLITELISTState();

  const deviceId = DeviceInfo.getUniqueId();

  const keys = handleGetState({index: 'keys'});
  const accessToken = keys.spotify.accessToken;

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const userId = TRXProfile.id ?? deviceId;
  console.log('🚀 ~ file: likeTRAK.ts:35 ~ handleLikeTRAK ~ userId:', userId);

  // check for duplicates
  // if yes, isPreview = false, trakURI = trx:00:isrc

  switch (protocol) {
    case 'trx:00':
      const likeExists00 = await firestore()
        .collection('likes')
        .where('artist', '==', trak.trak.artist)
        .where('title', '==', trak.trak.title)
        .where('userId', '==', userId)
        .limit(1)
        .get()
        .then(data => {
          return !data.empty;
        });

      if (likeExists00) {
        return alert('already liked');
      }

      return await firestore()
        .collection('likes')
        .doc(`00:${trak.isrc}:${userId}`)
        .set({
          ...trak.trak,
          userId,
          likedAt: new Date().toISOString(),
          trxUri: `trx:00:${trak.isrc}`,
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: 'Track not saved?',
            text2: 'Sorry! Better luck next time',
          });
        });
    case 'trx:04':
      console.log('🚀 ~ handleLikeTRAK ~ trak:', trak);

      const likeExists04 = await firestore()
        .collection('likes')
        .where('artist', '==', trak.trak.artist)
        .where('title', '==', trak.trak.title)
        .where('userId', '==', userId)
        .limit(1)
        .get()
        .then(data => {
          return !data.empty;
        });

      if (likeExists04) {
        return alert('already liked');
      }
      return await firestore()
        .collection('likes')
        .doc(`04:${trak.ytid}:${userId}`)
        .set({
          ...trak.trak,
          userId,
          likedAt: new Date().toISOString(),
          trxUri: `trx:04:${trak.ytid}`,
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: 'Track not saved?',
            text2: 'Sorry! Better luck next time',
          });
        });
    case 'trx:isrc':
      // TODO : check if exists

      console.log(
        '🚀 ~ handleLikeTRAK ~ `isrc:${trak.isrc}:${userId}`:',
        `isrc:${trak.isrc}:${userId}`,
      );

      return await firestore()
        .collection('likes')
        .doc(`isrc:${trak.isrc}:${userId}`)
        .set({
          artist: trak.artist,
          title: trak.title,
          cover_art: trak.cover_art,
          isPreview: true,
          isrc: trak.isrc,
          likedAt: new Date().toString(),
          preview: trak.preview,
          spotifyId: trak?.spotifyId,
          genres: trak?.genres,
          audioFeatures: trak?.audioFeatures,
          userId,
        })
        .then(() => {
          Toast.show({
            type: 'info',
            text1: 'You saved a preview!',
            text2: 'Check back later for the full track',
          });
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: 'Track not saved?',
            text2: 'Sorry! Better luck next time',
          });
        });
    default:
      break;
  }
};
