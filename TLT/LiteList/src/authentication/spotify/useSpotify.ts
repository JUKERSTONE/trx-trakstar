import React, {useEffect, useState, useContext} from 'react';
import {authorize, refresh, revoke} from 'react-native-app-auth';
import {useAsyncStorage, asyncStorageIndex} from '../../stores';
import {storeKeysSpotify, store} from '../../stores';

export const useSpotify = () => {
  const {handleStore} = useAsyncStorage();

  const [isAuthenticatedSpotify, setIsAuthenticatedSpotify] = useState(false);

  const config = {
    clientId: '29dec26a7f304507b4a9d9bcf0ef210b', // available on the app page
    clientSecret: '1d27af3b5c4946c1a411657ca50490d0', // click "show client secret" to see this
    redirectUrl: 'com.trxklist://oauthredirect/', // the redirect you defined after creating the app
    scopes: [
      'user-read-private',
      'user-read-email',
      'user-read-playback-state',
      'user-library-modify',
      'user-library-read',
      'streaming',
      'user-read-recently-played',
      'user-follow-modify',
      'user-top-read',
      'playlist-modify-public',
      'playlist-modify-private',
      'user-follow-read',
      'user-modify-playback-state',
      'app-remote-control',
    ], // the scopes you need to access
    serviceConfiguration: {
      authorizationEndpoint: 'https://accounts.spotify.com/authorize',
      tokenEndpoint: 'https://accounts.spotify.com/api/token',
    },
  };

  const authorizeSpotify = async () => {
    const result: any = await authorize(config);

    const payload = {
      accessToken: result.accessToken,
      accessTokenExpirationDate: result.accessTokenExpirationDate,
      refreshToken: result.refreshToken,
    };

    const action = storeKeysSpotify(payload);
    store.dispatch(action);

    const key0 = asyncStorageIndex.accessTokenSpotify;
    const key1 = asyncStorageIndex.accessTokenExpirationSpotify;
    const key2 = asyncStorageIndex.refreshTokenSpotify;
    handleStore({key: key0, value: payload.accessToken});
    handleStore({key: key1, value: payload.accessTokenExpirationDate});
    handleStore({key: key2, value: payload.refreshToken});

    setIsAuthenticatedSpotify(true);

    return {
      refreshToken: payload.refreshToken,
      accessToken: payload.accessToken,
    };
  };
  return {
    authorizeSpotify,
    isAuthenticatedSpotify,
  };
};
