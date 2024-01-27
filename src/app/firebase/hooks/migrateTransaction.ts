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

export const handleMigrateTransaction = async (transaction: any) => {
  console.log(
    '🚀 ~ file: updateTransaction.ts ~ line 19 ~ handleUpdateTransaction ~ transaction',
    transaction,
  );
  const {handleGet, handleStore} = useAsyncStorage();
  const {handleGetState} = useLITELISTState();

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const userId = TRXProfile.id;
  const wallet = TRXProfile.wallet;
  const trak: any[] = wallet.trak;
  console.log(
    '🚀 ~ file: updateTransaction.ts ~ line 27 ~ handleUpdateTransaction ~ trak',
    trak,
  );

  // const trakIndex = trak.findIndex(
  //   (item: any) => item.tx_id === transaction.tx_id,
  // );
  // console.log(
  //   '🚀 ~ file: updateTransaction.ts ~ line 31 ~ handleUpdateTransaction ~ trakIndex',
  //   trakIndex,
  // );

  // const trakArray = trak.splice(trakIndex, 0, transaction);

  const trakArray = trak.map(element => {
    if (element.nftId === transaction.nftId) {
      return transaction;
    } else return element;
  });
  console.log(
    '🚀 ~ file: migrateTransaction.ts ~ line 51 ~ handleMigrateTransaction ~ trakArray',
    trakArray,
  );

  firestore()
    .doc(`users/${userId}`)
    .update({
      'wallet.trak': trakArray,
    })
    .then(() => {
      alert('NFT status updated');
    });

  console.log(
    '🚀 ~ file: updateTransaction.ts ~ line 28 ~ handleUpdateTransaction ~ trak',
    trak,
  );

  // get wallet trak
  // filter for transaction
  // update transaction
  // put back and update trak
};
