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

export const handleAppendTransactions = async (transaction: any) => {
  console.log(
    '🚀 ~ file: appendTransactions.ts ~ line 19 ~ handleAppendTransactions ~ transaction',
    transaction,
  );
  const {handleGet, handleStore} = useAsyncStorage();
  const {handleGetState} = useLITELISTState();

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const userId = TRXProfile.id;
  const wallet = TRXProfile.wallet;

  // const nftId = uuid.v4();

  firestore()
    .doc(`users/${userId}`)
    .update({
      'wallet.trak': [...wallet.trak, transaction],
    })
    .then(() => {
      alert('NFT satus updated');
    });
};
