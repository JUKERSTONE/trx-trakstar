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
import uuid from 'react-native-uuid';

export const handleGetTRX04 = async ({trakURI}: any) => {
  return firestore()
    .collection('trx-04')
    .doc(trakURI)
    .get()
    .then((doc: any) => {
      const trx04 = doc.data();
      console.log('🚀 ~ file: getTRX44.ts:25 ~ .then ~ trx44:', trx04);
      return trx04;
    });
};
