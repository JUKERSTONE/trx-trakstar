import React, {useEffect, useState} from 'react';
import {TRAKLIST} from './internal';
import {useTRAKLISTApp} from '.';
import {store, setSpotifyClientToken, setAuthentication} from '../stores';
import {Provider} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {useFirebase} from './firebase';
import {api, useAPI} from '../api';
import {handleRefreshWallet} from './hooks';
import {
  SafeAreaView,
  Text,
  View,
  Button,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {Base64} from '../core';
import {SPOTIFY_ACCOUNTS_KEY} from '../auth';
import {useTRAKLISTState} from './useTRAKLISTState';
import {StripeProvider} from '@stripe/stripe-react-native';
import {handleServices} from '../app';

const queryString = require('query-string');

export const TRAKLISTApp = () => {
  const {handleTheme} = useTRAKLISTApp();
  const {
    handleListenUserProfile,
    handleStreakRewards,
    handleListenTUC,
    handleSpotifyService,
  } = useFirebase();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const {handleGetState} = useTRAKLISTState();

  const wallet = handleGetState({index: 'wallet'});
  console.log(
    '🚀 ~ file: TRAKLIST.tsx ~ line 30 ~ TRAKLISTApp ~ wallet',
    wallet,
  );

  useEffect(() => {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');

    const route: any = api.spotify({method: 'accounts'});

    axios
      .post(route, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + Base64.btoa(SPOTIFY_ACCOUNTS_KEY),
        },
      })
      .then(response => {
        const clientCredentials = response.data.access_token;

        const action = setSpotifyClientToken(clientCredentials);
        store.dispatch(action);
      })
      .catch(err => alert(err));

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const onAuthStateChanged = async (user: any) => {
    setUser(user);

    const route: any = api.spotify({method: 'accounts'});

    await axios
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

        const action = setSpotifyClientToken(clientCredentials);
        store.dispatch(action);
      })
      .catch(err => {
        console.log('🚀 ~ file: TRAKLIST.tsx ~ line 62 ~ useEffect ~ err', err);
        alert(err);
      });

    switch (user) {
      case null:
        // delete redux data
        const authAction1 = setAuthentication(false);
        store.dispatch(authAction1);
        break;
      default:
        const authAction = setAuthentication(true);
        store.dispatch(authAction);
        const token = await auth()
          .currentUser?.getIdToken(true)
          .then((token: any) => token);

        await handleListenUserProfile(user, token);
        const newTRAK = handleStreakRewards(user, token);
        await handleRefreshWallet(token);
        await handleServices({user});
        await handleListenTUC();
    }
    if (initializing) setInitializing(false);
  };

  // console.log = function () {};

  if (initializing)
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#1a1a1a',
        }}>
        <View style={{padding: 30}}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'whitesmoke',
              paddingBottom: 10,
            }}>
            ONE MOMENT PLEASE...
          </Text>
          <ActivityIndicator color="green" size="large" />
        </View>

        <View>
          <Text style={{color: 'white'}}>Taking too long?</Text>
          <Button title="reload" onPress={() => onAuthStateChanged(user)} />
        </View>
      </SafeAreaView>
    );

  return (
    <Provider store={store}>
      <StripeProvider
        publishableKey="pk_test_51JoVjBElqiqnGEzQVMYyfZUV5vXHtiA7DdRponXzx0muYoDmgcFUDXu7PaeMJJJ4077VpSvc6mvyXix62tWnQ7r300VNOuYWwi"
        merchantIdentifier="merchant.com.bernie.trx">
        <TRAKLIST handleTheme={handleTheme} user={user} />
      </StripeProvider>
    </Provider>
  );
};
