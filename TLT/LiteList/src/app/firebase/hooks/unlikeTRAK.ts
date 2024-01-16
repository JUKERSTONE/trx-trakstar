import auth from '@react-native-firebase/auth';
import {
  store,
  setTRXProfile,
  useAsyncStorage,
  asyncStorageIndex,
  setFirebaseProfile,
  storeKeysTRX,
} from '../../../stores';
import {api, useAPI} from '../../../api';
import firestore from '@react-native-firebase/firestore';
import {useLITELISTState} from '../../useLITELISTState';
import moment from 'moment';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import messaging from '@react-native-firebase/messaging';

export const handleUnLikeTRAK = async ({trak}: any) => {
  console.log('🚀 ~ file: unlikeTRAK.ts:19 ~ handleUnLikeTRAK ~ trak:', trak);
  return firestore()
    .collection('likes')
    .where('userId', '==', trak.userId)
    .where('artist', '==', trak.artist)
    .where('title', '==', trak.title)
    .limit(1)
    .get()
    .then((doc: any) => {
      const path = doc._changes[0]._nativeData.doc.path;
      firestore().doc(path).delete();
      console.log('🚀 ~ file: useGeniusMatch.ts:334 ~ .then ~ doc:', doc);
      //
    })
    .catch(err => {
      console.log('🚀 ~ file: unlikeTRAK.ts:32 ~ .then ~ err:', err);
    });
};
