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

export const handleUpdateTransaction = async (transaction: any) => {
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

  const trakIndex = trak.findIndex(
    (item: any) => item.tx_id === transaction.tx_id,
  );
  console.log(
    '🚀 ~ file: updateTransaction.ts ~ line 31 ~ handleUpdateTransaction ~ trakIndex',
    trakIndex,
  );

  // const trakArray = trak.splice(trakIndex, 0, transaction);

  let trakArray = trak;
  switch (transaction.tx_status) {
    case 'abort_by_response':
      // delete from state
      // handleUpdateTransaction(item);

      trakArray = trak.map(element => {
        if (element.tx_id === transaction.tx_id) {
          return {...transaction, nftId: element.nftId};
        } else return element;
      });

      break;
    case 'abort_by_post_condition':
      // delete from state
      // handleUpdateTransaction(item);

      trakArray = trak.map(element => {
        if (element.tx_id === transaction.tx_id) {
          return {...transaction, nftId: element.nftId};
        } else return element;
      });

      break;
    case 'pending':
      // delete from state
      // handleUpdateTransaction(item);
      break;
    case 'success':
      // delete from state
      // handleUpdateTransaction(item);

      trakArray = trak.map(element => {
        if (element.tx_id === transaction.tx_id) {
          return {...transaction, nftId: element.nftId};
        } else return element;
      });
      console.log(
        '🚀 ~ file: updateTransaction.ts ~ line 46 ~ handleUpdateTransaction ~ trakArray',
        trakArray,
      );
      break;
    default:
      trakArray = trak.map(element => {
        if (element.tx_id === transaction.tx_id) {
        } else return element;
      });
      break;
  }
  console.log(
    '🚀 ~ file: updateTransaction.ts ~ line 46 ~ handleUpdateTransaction ~ trakArray',
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
