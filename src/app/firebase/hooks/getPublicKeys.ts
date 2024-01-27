import auth from '@react-native-firebase/auth';
import {
  store,
  setTRXProfile,
  useAsyncStorage,
  asyncStorageIndex,
  setFirebaseProfile,
  storeKeysTRX,
  setLikes,
  handlePublicKeys,
} from '../../../stores';
import {api, useAPI} from '../../../api';
import firestore from '@react-native-firebase/firestore';
import {useLITELISTState} from '../../useLITELISTState';
import moment from 'moment';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';

export const handleGetPublicKeys = async () => {
  const {handleGet, handleStore} = useAsyncStorage();
  const {handleGetState} = useLITELISTState();

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const userId = TRXProfile.id;
  console.log(
    '🚀 ~ file: getPublicKeys.ts ~ line 28 ~ handleGetPublicKeys ~ userId',
    userId,
  );

  await firestore()
    .doc(`users/${userId}/crypto/public`)
    .get()
    .then((doc: any) => {
      const publicKeys = doc.data();
      console.log(
        '🚀 ~ file: getPublicKeys.ts ~ line 40 ~ .then ~ publicKeys',
        publicKeys,
      );
      const action1 = handlePublicKeys(publicKeys);
      store.dispatch(action1);
    });
};
