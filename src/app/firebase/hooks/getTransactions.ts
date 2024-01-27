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

export const handleGetTransactions = async (user: any) => {
  console.log(
    '🚀 ~ file: getTransactions.ts ~ line 19 ~ handleGetTransactions ~ user',
    user,
  );
  const {handleGet, handleStore} = useAsyncStorage();
  const {handleGetState} = useLITELISTState();

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  console.log(
    '🚀 ~ file: getTransactions.ts ~ line 24 ~ handleGetTransactions ~ TRXProfile',
    TRXProfile,
  );
  const userId = user._user.uid;

  return (
    firestore()
      .collection('transactions')
      .where('senderId', '==', userId)
      // .where('recipientId', '==', userId)
      .get()
      .then((data: any) => {
        let transactions: any[] = [];
        data.forEach((doc: any) => {
          console.log(
            '🚀 ~ file: getTransactions.ts ~ line 43 ~ data.forEach ~ doc.data()',
            doc.data(),
          );
          transactions.push(doc.data());
        });
        return transactions;
      })
  );
};
