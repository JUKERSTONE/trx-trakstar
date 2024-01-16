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

export const handleGetLatestReciept = async () => {
  const {handleGetState} = useLITELISTState();

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const userId = TRXProfile.id;
  console.log(
    '🚀 ~ file: getLatestReceipt.ts:19 ~ handleGetLatestReciept ~ userId:',
    userId,
  );

  return await firestore()
    .collection('subscriptions')
    .where('userId', '==', userId)
    .get()
    .then((data: any) => {
      let subscriptions: any[] = [];
      data.forEach((doc: any) => {
        const data = doc.data();
        subscriptions.push(data);
      });
      console.log(
        '🚀 ~ file: getLatestReceipt.ts:26 ~ .then ~ subscriptions:',
        subscriptions,
      );
      const sortedSubscriptions = subscriptions.sort(function (x, y) {
        return x.transactionDate - y.transactionDate;
      });
      console.log(
        '🚀 ~ file: getLatestReceipt.ts:41 ~ sortedSubscriptions ~ sortedSubscriptions:',
        sortedSubscriptions,
      );
      return sortedSubscriptions[0];
      // order by timestamp
    });
};
