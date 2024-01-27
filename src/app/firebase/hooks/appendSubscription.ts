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
import {
  initConnection,
  getSubscriptions,
  RequestSubscription,
  requestSubscription,
} from 'react-native-iap';

export const handleAppendSubscription = async ({purchase, userId}: any) => {
  const {handleGetState} = useLITELISTState();

  console.log(
    '🚀 ~ file: retrieveChat.ts ~ line 19 ~ handleRetrieveChat ~ userId',
    userId,
  );

  const packageId = ['com.bernie.tlt.trakstar1m'];

  return firestore()
    .collection(`subscriptions`)
    .add({
      ...purchase,
      userId,
    });

  // messaging where chatURI
  // reorder according to time
};
