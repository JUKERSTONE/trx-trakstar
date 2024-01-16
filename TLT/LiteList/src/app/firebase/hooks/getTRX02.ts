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

export const handleGetTRX02 = async () => {
  return firestore()
    .collection(`trx-02`)
    .get()
    .then((data: any) => {
      let trx02: any = [];

      data.forEach((doc: any) => {
        trx02.push(doc.data());
      });

      return trx02;
    });
};
