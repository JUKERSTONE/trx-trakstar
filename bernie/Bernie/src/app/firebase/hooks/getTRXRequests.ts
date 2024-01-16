import auth from '@react-native-firebase/auth';
import {
  store,
  setTRXProfile,
  useAsyncStorage,
  asyncStorageIndex,
  storeKeysTRX,
} from '../../../stores';
import firestore from '@react-native-firebase/firestore';
import {useBERNIEState} from '../../useBERNIEState';

export const handleTRXRequests = () => {
  const requestsRef = firestore()
    .collection(`fundamentals`)
    .doc('BERNIE')
    .collection('requests');

  return requestsRef.get().then((data: any) => {
    let requests: any = [];
    data.forEach((doc: any) => {
      requests.push({...doc.data(), id: doc.id});
    });
    return requests;
  });
};
