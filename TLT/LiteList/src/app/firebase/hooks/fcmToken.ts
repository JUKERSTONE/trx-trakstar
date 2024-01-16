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

export const handleFCMToken = async () => {
  const {handleGet, handleStore} = useAsyncStorage();
  const {handleGetState} = useLITELISTState();

  const profile = handleGetState({index: 'profile'});
  console.log('🚀 ~ file: fcmToken.ts:23 ~ handleFCMToken ~ profile:', profile);
  const TRXProfile = profile.TRX;
  const userId = TRXProfile.id;

  const key = asyncStorageIndex.fcm_token;

  const serializedFCMToken: string = (await handleGet({key})) as string;

  switch (serializedFCMToken) {
    case undefined:
      messaging()
        .getToken()
        .then((token: any) => {
          firestore().doc(`users/${userId}`).update({fcm_token: token});
          handleStore({key, value: token});
          return;
        })
        .catch(err => {
          alert('there was an error setting up notifications... ');
        });
      return;
    default:
      return;
  }
};
