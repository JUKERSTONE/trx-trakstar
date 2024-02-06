import auth from '@react-native-firebase/auth';
import {
  store,
  setTRXProfile,
  useAsyncStorage,
  asyncStorageIndex,
  setUnRedeemedProfile,
} from '../../../stores';
import {api, useAPI} from '../../../api';
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
    confirmation,
    otp,
  } = TRXProfile;

  const fcm_token = await messaging()
    .getToken()
    .then((token: string) => {
      handleStore({key, value: token});
      return token;
    })
    .catch(err => {
      alert('there was an error setting up notifications... ');
    });

  const action = setUnRedeemedProfile({
    profile: {fcm_token, ...TRXProfile},
    purchase,
    userPackage,
  });
  store.dispatch(action);

  console.log('🚀 ~ fcm_token:', fcm_token);

  console.log('🚀 ~ confirmation:', confirmation);

  await confirmation(otp).catch(error => {
    console.log('🚀 ~ error:', error);

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
  });
};
