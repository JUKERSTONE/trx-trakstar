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

export const handleShowcase = () => {
  const {handleGetState} = useLITELISTState();

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const userId = TRXProfile.id;
  console.log(
    '🚀 ~ file: retrieveChat.ts ~ line 19 ~ handleRetrieveChat ~ userId',
    userId,
  );

  return firestore()
    .collection(`originals`)
    .get()
    .then((data: any) => {
      let originals: any = [];

      data.forEach((doc: any) => {
        originals.push(doc.data());
      });

      console.log(
        '🚀 ~ file: retrieveoriginals.ts ~ line 36 ~ .then ~ originals',
        originals,
      );
      return originals;
    });

  // messaging where chatURI
  // reorder according to time
};
