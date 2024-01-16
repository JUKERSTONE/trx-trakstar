import auth from '@react-native-firebase/auth';
import {
  store,
  setTRXProfile,
  useAsyncStorage,
  asyncStorageIndex,
  storeKeysTRX,
} from '../../../stores';
import {api, useAPI} from '../../../api';
import firestore from '@react-native-firebase/firestore';
import {useLITELISTState} from '../../useLITELISTState';

export const handleRetrieveUser = async (userId: string) => {
  return await firestore()
    .doc(`users/${userId}`)
    .get()
    .then((doc: any) => {
      return doc.data();
    });
};
