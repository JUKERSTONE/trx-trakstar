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

export const handleGetTrending = () => {
  const {handleGetState} = useBERNIEState();

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const userId = TRXProfile.id;
  console.log(
    '🚀 ~ file: retrieveChat.ts ~ line 19 ~ handleRetrieveChat ~ userId',
    userId,
  );

  return firestore()
    .collection(`fundamentals`)
    .doc('TRAKLITE')
    .get()
    .then((doc: any) => {
      console.log('🚀 ~ file: getTrending.ts:29 ~ .then ~ data:', doc.data());
      return doc.data();
    });

  // messaging where chatURI
  // reorder according to time
};
