import auth from '@react-native-firebase/auth';
import {api} from '../../../api';
import {
  handleListenUserProfile,
  handleStreakRewards,
  handleServices,
  handleChats,
  handleFCMToken,
  handleTRAKLIST,
} from '../../../app';
import {Base64} from '../../../core';
import {SPOTIFY_ACCOUNTS_KEY} from '../../../auth';
import {store, setSpotifyClientToken, setAuthentication} from '../../../stores';
import axios from 'axios';

const queryString = require('query-string');

export const handleFirebaseListener = () => {
  const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  return subscriber;
};

export const onAuthStateChanged = async (user: any) => {
  // alert('here?');

  console.log(
    '🚀 ~ file: firebaseListener.ts ~ line 16 ~ onAuthStateChanged ~ user',
    user,
  );
  // this.setState({user});

  const route: any = api.spotify({method: 'accounts'});

  const clientCredentials = await axios
    .post(
      route,
      queryString.stringify({
        grant_type: 'client_credentials',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + Base64.btoa(SPOTIFY_ACCOUNTS_KEY),
        },
      },
    )
    .then(response => {
      const clientCredentials = response.data.access_token;
      return clientCredentials;
    })
    .catch(err => {
      console.log('🚀 ~ file: TRAKLIST.tsx ~ line 62 ~ useEffect ~ err', err);
      alert(err);
    });
  console.log(
    '🚀 ~ file: firebaseListener.ts ~ line 55 ~ onAuthStateChanged ~ clientCredentials',
    clientCredentials,
  );

  const action = setSpotifyClientToken(clientCredentials);
  store.dispatch(action);

  // await handleInAppPurchases();
  switch (user) {
    case null:
      // delete redux data
      const authAction1 = setAuthentication(false);
      store.dispatch(authAction1);
      return {initializing: false};
    default:
      const token = await auth()
        .currentUser?.getIdToken(true)
        .then((token: any) => token);

      const response = await handleListenUserProfile(user, token);
      const isSuccess = response?.success;

      if (!isSuccess && response?.data === 'connect your wallet') {
        return {hasCrypto: false};
      } else if (isSuccess) {
        const profile = await handleStreakRewards(user, token);
        console.log(
          '🚀 ~ file: TRAKLITEInterface.tsx ~ line 191 ~ TRXInterfaceHOC ~ onAuthStateChanged ~ profile',
          profile,
        );
        return {hasCrypto: true, progress: 2 / 8};
      }
      await handleServices({user});
      await handleChats();
      await handleFCMToken();
      await handleTRAKLIST();

      const authAction = setAuthentication(true);
      store.dispatch(authAction);
  }
  return {initializing: false};
};
