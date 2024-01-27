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

export const handleRetrieveChat = (chatURI: string) => {
  const {handleGetState} = useLITELISTState();

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const userId = TRXProfile.id;
  console.log(
    '🚀 ~ file: retrieveChat.ts ~ line 19 ~ handleRetrieveChat ~ userId',
    userId,
  );

  return firestore()
    .collection(`messaging`)
    .where('chatURI', '==', chatURI)
    .get()
    .then((data: any) => {
      let messages: any = [];

      data.forEach((doc: any) => {
        messages.push(doc.data());
      });

      console.log(
        '🚀 ~ file: retrieveChat.ts ~ line 26 ~ .then ~ messages',
        messages,
      );
      return messages;
    });

  // messaging where chatURI
  // reorder according to time
};
