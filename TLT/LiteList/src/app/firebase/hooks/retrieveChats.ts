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

export const handleRetrieveChats = () => {
  const {handleGetState} = useLITELISTState();

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const userId = TRXProfile.id;
  console.log(
    '🚀 ~ file: retrieveChats.ts ~ line 18 ~ handleRetrieveChats ~ userId',
    userId,
  );

  return firestore()
    .collection(`users/${userId}/chats`)
    .get()
    .then((data: any) => {
      let chats: any = [];

      data.forEach((doc: any) => {
        chats.push(doc.data());
      });

      console.log(
        '🚀 ~ file: retrieveChats.ts ~ line 36 ~ .then ~ chats',
        chats,
      );
      return chats;
    });
};
