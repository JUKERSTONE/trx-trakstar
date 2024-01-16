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

export const handleSetTransaction = async ({
  txId,
  recipientURI,
  senderURI,
  receipt_time_iso,
  senderId,
  recipientId,
}: any) => {
  const {handleGet, handleStore} = useAsyncStorage();
  const {handleGetState} = useLITELISTState();

  return firestore()
    .collection('transactions')
    .doc(txId)
    .set({
      txId,
      recipientURI,
      senderURI,
      senderId,
      recipientId,
      receipt_time_iso,
    })
    .then(() => {
      return {
        success: true,
      };
    })
    .catch((err: any) => {
      return {
        success: false,
      };
    });
};
