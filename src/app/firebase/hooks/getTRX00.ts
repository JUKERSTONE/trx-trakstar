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

export const handleGetTRX00 = async ({trakURI}: any) => {
  return firestore()
    .collection('TRX')
    .doc(trakURI)
    .get()
    .then((doc: any) => {
      const trx00 = doc.data();
      console.log('🚀 ~ file: getTRX00.ts:25 ~ .then ~ trx00:', trx00);
      return trx00;
    });
};
