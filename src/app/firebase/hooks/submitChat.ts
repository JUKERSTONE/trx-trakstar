import auth from '@react-native-firebase/auth';
import {
  store,
  setTRXProfile,
  useAsyncStorage,
  asyncStorageIndex,
  storeKeysTRX,
  handleMediaPlayerAction,
} from '../../../stores';
import {api, useAPI} from '../../../api';
import firestore from '@react-native-firebase/firestore';
import {useLITELISTState} from '../../useLITELISTState';
import uuid from 'react-native-uuid';
import axios from 'axios';

export const handleSubmitChat = async ({
  chat,
  chatURI,
  isMMS = false,
  player = null,
}: any) => {
  console.log('🚀 ~ file: submitChat.ts ~ line 21 ~ isMMS', isMMS, player);
  try {
    console.log(
      '🚀 ~ file: submitChat.ts ~ line 16 ~ handleSubmitChat ~ chat, chatURI',
      chat,
      chatURI,
    );
    const {usePOST} = useAPI();
    const {handleGetState} = useLITELISTState();
    const profile = handleGetState({index: 'profile'});
    const player = handleGetState({index: 'player'});
    const TRXProfile = profile.TRX;
    const userId = TRXProfile.id;
    const username = TRXProfile.trak_name;
    const avatar = TRXProfile.avatarURL;

    const messageId = uuid.v4();

    const chatId = chatURI.split(':')[1];

    const sentAt = new Date().toISOString();

    const users = await firestore()
      .doc(`users/${userId}/chats/${chatId}`)
      .get()
      .then((doc: any) => {
        return doc.data().users;
      });

    const filteredUsers = users.filter(
      (user: any) => user.id !== TRXProfile.id,
    );
    console.log(
      '🚀 ~ file: submitChat.ts ~ line 52 ~ filteredUsers',
      filteredUsers,
    );

    await firestore()
      .doc(`messaging/${messageId}`)
      .set({
        messageId,
        message: chat,
        chatURI,
        userId,
        username,
        sentAt,
        avatar,
        isMMS,
        player: JSON.stringify(player),
      });

    const registration_ids = await Promise.all(
      filteredUsers.map(async (user: any) => {
        firestore()
          .doc(`users/${user}/chats/${chatId}`)
          .update({
            lastMessage: JSON.stringify({
              chat,
              avatar,
              username,
              sentAt,
              isMMS,
              player: JSON.stringify(player),
            }),
          });

        const action = handleMediaPlayerAction({
          playbackState: 'sent',
          isMMS: false,
        });
        store.dispatch(action);

        return await firestore()
          .doc(`users/${user}`)
          .get()
          .then((doc: any) => {
            console.log(
              '🚀 ~ file: submitChat.ts ~ line 63 ~ .then ~ doc',
              doc.data(),
            );
            return doc.data().fcm_token;
          });
      }),
    );

    console.log(
      '🚀 ~ file: submitChat.ts ~ line 66 ~ constregistration_ids=awaitusers.forEach ~ registration_ids',
      registration_ids,
    );

    const route = 'https://fcm.googleapis.com/fcm/send';
    const payload = {
      registration_ids,
      data: {
        type: 'chat',
        chatURI,
        body: "See what's being said.",
        title: username + ' sent you a message! 📬',
      },
      notification: {
        body: "See what's being said.",
        title: username + ' sent you a message! 📬',
      },
    };

    return axios
      .post(route, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'key=AAAAYMB6JVM:APA91bH_ZcWYHY7HO-SwjaCku7UuBCeZwSX-ZzUbEOhab1WMisT1toHX_vC0c18zbMSeTSjpogBcIu8N5sRTFsmoa72SL47rqU7BLvcKBHRojy_r1wOWFD4mHQ0dtTYTAl3A15Iczsrn',
        },
      })
      .catch((err: any) => {
        console.log('🚀 ~ file: submitChat.ts ~ line 75 ~ .then ~ err', err);
        //
        //
      });
  } catch (error) {
    console.log(
      '🚀 ~ file: submitChat.ts ~ line 117 ~ handleSubmitChat ~ error',
      error,
    );
    alert(
      "Message couldn't be sent. Try going out and back into the chat again",
    );
  }
};
