import auth from '@react-native-firebase/auth';
import {
  store,
  setTRXProfile,
  useAsyncStorage,
  asyncStorageIndex,
  storeKeysTRX,
  setChats,
} from '../../../stores';
import {api, useAPI} from '../../../api';
import firestore from '@react-native-firebase/firestore';
import {useLITELISTState} from '../../useLITELISTState';

export const handleRetrieveChats1 = () => {
  const {handleGetState} = useLITELISTState();

  const profile = handleGetState({index: 'profile'});
  console.log(
    '🚀 ~ file: retrieveChats1.ts ~ line 18 ~ handleRetrieveChats1 ~ profile',
    profile,
  );
  const TRXProfile = profile.TRX;
  const userId = TRXProfile.id;
  console.log(
    '🚀 ~ file: retrieveChats.ts ~ line 18 ~ handleRetrieveChats ~ userId',
    userId,
  );

  return firestore()
    .collection(`users/${userId}/chats`)
    .onSnapshot(snap => {
      const changedDocuments = snap.docChanges();
      // console.log(
      //   '🚀 ~ file: retrieveChats1.ts ~ line 29 ~ handleRetrieveChats1 ~ changedDocuments',
      //   changedDocuments,
      // );
      let chats: any = [];

      changedDocuments.forEach(async chat => {
        const {chatURI, lastMessage, thumbnail, users} = chat.doc.data();
        // console.log(
        //   '🚀 ~ file: retrieveChats1.ts ~ line 36 ~ handleRetrieveChats1 ~ users',
        //   users,
        // );

        const lastMessageSentAt = JSON.parse(lastMessage).sentAt;
        console.log(
          '🚀 ~ file: retrieveChats1.ts:47 ~ handleRetrieveChats1 ~ lastMessageSentAt:',
          lastMessageSentAt,
        );

        const messages = await firestore()
          .collection(`messaging`)
          .where('chatURI', '==', chatURI)
          .get()
          .then((data: any) => {
            let messages: any = [];

            data.forEach((doc: any) => {
              messages.push(doc.data());
            });

            // console.log(
            //   '🚀 ~ file: retrieveChat.ts ~ line 26 ~ .then ~ messages',
            //   messages,
            // );
            return messages;
          });

        const payload = {
          chatURI,
          lastMessage,
          messages,
          thumbnail,
          users,
          lastMessageSentAt,
        };

        const FBaction = setChats(payload);
        store.dispatch(FBaction);
      });

      return chats;
    });
};
