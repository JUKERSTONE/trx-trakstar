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

export const handleResetUserPackages = async () => {
  const {handleGetState} = useLITELISTState();

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const userId = TRXProfile.id;
  console.log(
    '🚀 ~ file: retrieveChat.ts ~ line 19 ~ handleRetrieveChat ~ userId',
    userId,
  );

  const packageId = ['com.bernie.tlt.trakstar1m'];

  return firestore()
    .collection(`users`)
    .doc(userId)
    .update({userPackage: null});

  // messaging where chatURI
  // reorder according to time
};
