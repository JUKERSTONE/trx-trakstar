import auth from '@react-native-firebase/auth';
import {
  store,
  setTRXProfile,
  useAsyncStorage,
  asyncStorageIndex,
} from '../../../stores';
import {api, useAPI} from '../../../api';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import {useFirebase, handleAppendSubscription} from '../../../app';
import {useTRX} from '../../hooks/useTRX';

const {useGET} = useAPI();
const {handleStore, handleGet} = useAsyncStorage();

export const handleRegister = async ({
  TRXProfile,
  userPackage,
  navigation,
  purchase,
  handleRequestTRX,
}: any) => {
  console.log(
    '🚀 ~ file: register.ts ~ line 22 ~ handleRegister ~ TRXProfile',
    TRXProfile,
  );

  console.log('🚀 ~ file: register.ts:23 ~ userPackage:', userPackage);
  const key = asyncStorageIndex.fcm_token;
  console.log('🚀 ~ file: register.ts:29 ~ key:', key);

  const {
    likes,
    email_address,
    isAuthenticatedSpotify,
    location,
    password,
    phone_number,
    quotable,
    subscription,
    trak_name,
    trak_symbol,
    spotifyRefreshToken = null,
    spotifyAccessToken = null,
    avatarURL,
    userCategory,
  } = TRXProfile;
  console.log('🚀 ~ file: register.ts:69 ~ handleRegister ~ TRXProfile:', {
    email_address,
    isAuthenticatedSpotify,
    location,
    password,
    phone_number,
    quotable,
    subscription,
    trak_name,
    trak_symbol,
    spotifyRefreshToken,
    spotifyAccessToken,
    avatarURL,
    userCategory,
  });

  const fcm_token = await messaging()
    .getToken()
    .then((token: string) => {
      handleStore({key, value: token});
      return token;
    })
    .catch(err => {
      alert('there was an error setting up notifications... ');
    });

  Promise.resolve(
    auth()
      .createUserWithEmailAndPassword(email_address, password)
      .then(async data => {
        console.log(
          '🚀 ~ file: register.ts ~ line 37 ~ handleRegister ~ data',
          data,
        );

        const user = data.user;
        const id = data.user.uid;

        console.log('🚀 ~ file: register.ts:87 ~ likes.map ~ likes:', likes);

        if (purchase) await handleAppendSubscription({purchase, userId: id});

        const accessToken = await user.getIdToken(true);

        console.log('🚀 ~ file: register.ts:92 ~ handleRegister ~ id:', id);

        const userDocument = firestore().doc(`users/${id}`);

        console.log(
          '🚀 ~ file: register.ts:111 ~ handleRegister ~ userDocument:',
          userDocument,
        );

        if (spotifyRefreshToken) {
          const spotifyServicesDocument = firestore().doc(
            `users/${id}/services/spotify`,
          );

          spotifyServicesDocument.set({
            refresh_token: spotifyRefreshToken,
          });
        }

        await userDocument
          .set({
            id,
            userCategory,
            fcm_token,
            email_address,
            isAuthenticatedSpotify,
            spotifyRefreshToken: spotifyRefreshToken,
            spotifyAccessToken: spotifyAccessToken,
            // location,
            password,
            phone_number,
            // quotable,
            subscription,
            trak_name,
            trak_symbol,
            last_logged_in: new Date().toString(),
            streak: 1,
            wallet: {
              trak: [],
              nft: [],
              tuc: 0,
              btc: 0,
              stx: 0,
              sol: 0,
              ada: 0,
              eth: 0,
              dai: 0,
            },
            avatarURL,
            isPrivate: false,
            userPackage,
            user_subscribed_at: new Date().toString(),
            // tuc_public_keys,
          })
          .then(async () => {
            // const payload = {tuc_public_keys, ...TRXProfile};
            const payload = {...TRXProfile};
            console.log(
              '🚀 ~ file: register.ts ~ line 84 ~ .then ~ payload',
              payload,
            );
            const action = setTRXProfile(payload);
            store.dispatch(action);
            const key = asyncStorageIndex.profile;
            console.log('🚀 ~ file: register.ts ~ line 88 ~ .then ~ key', key);
            handleStore({key, value: payload});
          })
          .then(() => {
            console.log(
              '🚀 ~ file: register.ts:189 ~ likes.map ~ likes:',
              likes,
            );
          })
          .catch(error =>
            console.log(
              '🚀 ~ file: register.ts:167 ~ handleRegister ~ error:',
              error,
            ),
          );
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          alert('That email address is already in use!');
        } else if (error.code === 'auth/invalid-email') {
          alert('That email address is invalid!');
        } else alert(error.code);

        navigation.navigate('DETAILS', {
          profile: {
            isAuthenticatedSpotify,
            spotifyRefreshToken,
            spotifyAccessToken,
            userCategory,
          },
        });

        console.error(error, 'poo');
      }),
  );
};
