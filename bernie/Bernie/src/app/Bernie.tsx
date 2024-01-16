import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import axios from 'axios';
import {routes, useAPI, APIKeys} from '../api';
import {Base64} from '../core';
import {useBERNIEState} from './useBERNIEState';
import {
  storeKeysSpotifyClient,
  store,
  setFirebaseProfile,
  useAsyncStorage,
  asyncStorageIndex,
  storeKeysTRX,
} from '../stores';
import {BernieNavigation} from './internal';
import auth from '@react-native-firebase/auth';
import {Provider} from 'react-redux';

export const BernieApp = () => {
  const {handleGetState} = useBERNIEState();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const {handleGet} = useAsyncStorage();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    const route = routes.spotify({method: 'token', payload: params});
    const token = Base64.btoa(APIKeys.spotify.accountsKey);
    const {POST} = useAPI();
    const response = POST({
      route,
      token,
      body: params,
    });

    Promise.resolve(response).then(res => {
      const data = res.data;
      const action = storeKeysSpotifyClient(data);
      store.dispatch(action);
    });

    return subscriber;
  }, []);

  const onAuthStateChanged = async (user: any) => {
    setUser(user);

    switch (user) {
      case null:
        // delete redux data
        break;
      default:
        const idToken = await auth()
          .currentUser?.getIdToken(true)
          .then((token: any) => token);
        const payload = user._user;

        const FBaction = setFirebaseProfile(payload);
        store.dispatch(FBaction);

        const action_2 = storeKeysTRX(idToken);
        store.dispatch(action_2);
    }
    if (initializing) setInitializing(false);
  };

  // console.log = function () {};

  return (
    <Provider store={store}>
      <NavigationContainer>
        <BernieNavigation user={user} />
      </NavigationContainer>
    </Provider>
  );
};
