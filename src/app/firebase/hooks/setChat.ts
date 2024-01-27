import auth from '@react-native-firebase/auth';
import {
  store,
  setTRXProfile,
  useAsyncStorage,
  setFirebaseProfile,
  storeKeysTRX,
  asyncStorageIndex,
  setAuthentication,
} from '../../../stores';
import {api, useAPI} from '../../../api';
import firestore from '@react-native-firebase/firestore';
import {useLITELISTState} from '../../useLITELISTState';
import uuid from 'react-native-uuid';
import {handleRetrieveUser} from './retrieveUser';

export const handleSetChat = async (users: any, type: any) => {
  console.log('🚀 ~ file: setChat.ts ~ line 17 ~ handleSetChat ~ users', users);
  const {handleGetState} = useLITELISTState();
  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const userId = TRXProfile.id;
  const username = TRXProfile.user_name;
  // const avatar = TRXProfile.avatarURL;

  const filteredUsers = users.filter((item: any) => item != userId);
  console.log(
    '🚀 ~ file: setChat.ts ~ line 27 ~ handleSetChat ~ filteredUsers',
    filteredUsers,
  );

  const chatId = uuid.v4() as string;
  console.log(
    '🚀 ~ file: setChat.ts ~ line 25 ~ handleSetChat ~ chatId',
    chatId,
    typeof chatId,
  );

  const chatURI = `${type}:${chatId}`;
  console.log(
    '🚀 ~ file: setChat.ts ~ line 40 ~ handleSetChat ~ chatURI',
    chatURI,
  );

  function arraysContainSame(a: any, b: any) {
    a = Array.isArray(a) ? a : [];
    b = Array.isArray(b) ? b : [];
    return a.length === b.length && a.every((el: any) => b.includes(el));
  }

  if (filteredUsers.length === 0) {
    return {
      success: false,
      data: "you didn't add anyone",
    };
  }

  // if (type === 'group' && users.length < 3) {
  //   return {
  //     success: false,
  //     data: 'you need at least 3 users to create a group chat',
  //   };
  // }
  if (users.length > 2) {
    return {
      success: false,
      data: "you can't create a group chat on this version.. coming soon",
    };
  }

  const thumbnail = await Promise.all(
    users.map(async (user: any) => {
      const profile: any = await handleRetrieveUser(user);
      return {
        avatar: profile.avatarURL,
        trak_name: profile.trak_name,
      };
    }),
  );
  console.log(
    '🚀 ~ file: setChat.ts ~ line 68 ~ thumbnail ~ thumbnail',
    thumbnail,
  );

  // alert('poop');

  const duplicateChat = await firestore()
    .collection(`users/${userId}/chats`)
    .get()
    .then(async (data: any) => {
      let chats: any = [];

      data.forEach((doc: any) => {
        chats.push(doc.data());
      });

      const duplicateChat = chats.find((chat: any) => {
        const members: any = chat.users;
        return arraysContainSame(users, members);
      });

      // alert(JSON.stringify(duplicateChat));

      return duplicateChat;
    });

  switch (duplicateChat) {
    case undefined:
      await users.forEach((user: any, index: any) => {
        // alert(index);
        firestore()
          .collection(`users/${user}/chats`)
          .doc(chatId)
          .set({
            chatURI,
            thumbnail,
            lastMessage: JSON.stringify({
              chat: 'new chat',
              username,
              sentAt: new Date().toISOString(),
            }),
            users,
          })
          .then(doc => {
            // alert('works');
          })
          .catch(err => {
            alert('err');
          });
        // alert('done');
      });
      return {
        success: true,
        data: chatURI,
      };
    default:
      return {
        success: true,
        data: duplicateChat.chatURI,
      };
  }
};
