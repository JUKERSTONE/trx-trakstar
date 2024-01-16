import {View, Text, Dimensions, Pressable} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {TRAKLISTNavigation} from './internal';
import {useTRAKLIST} from './useTRAKLISTApp';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import {
  store,
  setSpotifyClientToken,
  setAuthentication,
  PlayerContext,
  handleMediaPlayerAction,
  setYoutubeId,
} from '../stores';
import {useFirebase} from '../app';
import {handleRefreshWallet} from './hooks';
import {api} from '../api';
import {Base64, content} from '../core';
import {SPOTIFY_ACCOUNTS_KEY} from '../auth';
import {TRXPictureInPictureContainer} from '../containers/trx-picture-in-picture';
import {Provider} from 'react-redux';

const queryString = require('query-string');

export const TRAKLISTApp = () => {
  const {handleTheme} = useTRAKLIST();
  const {
    handleListenUserProfile,
    handleStreakRewards,
    handleListenTUC,
    handleSpotifyService,
  } = useFirebase();

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const [userData, setUserData] = useState({
    user,
    handleTheme,
    currentTime: 1,
    playableDuration: 1,
    isStorefront: false,
    isPrimaryPlayer: true,
    trxProgress: 0,
    swiperRef: useRef(null),
    browserRef: useRef(null),
    playerRef: useRef(null),
    youtubePlayerRef: useRef(null),
    navigationRef: useRef(null),
    PiP1Ref: useRef(null),
    PiP2Ref: useRef(null),
  });

  useEffect(() => {
    const route: any = api.spotify({method: 'accounts'});
    console.log('🚀 ~ file: TRAKLIST.tsx ~ line 38 ~ useEffect ~ route', route);

    console.log(
      '🚀 ~ file: TRAKLIST.tsx ~ line 45 ~ useEffect ~ SPOTIFY_ACCOUNTS_KEY',
      SPOTIFY_ACCOUNTS_KEY,
    );
    axios
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
        console.log(
          '🚀 ~ file: TRAKLIST.tsx ~ line 47 ~ useEffect ~ response',
          response,
        );
        const clientCredentials = response.data.access_token;
        console.log(
          '🚀 ~ file: TRAKLIST.tsx ~ line 48 ~ useEffect ~ clientCredentials',
          clientCredentials,
        );

        const action = setSpotifyClientToken(clientCredentials);
        store.dispatch(action);
      })
      .catch(err => {
        console.log('🚀 ~ file: TRAKLIST.tsx ~ line 62 ~ useEffect ~ err', err);
        alert(err);
      });

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const onAuthStateChanged = async (user: any) => {
    setUser(user);
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

        await handleListenUserProfile(user, token).catch((error: any) => {
          alert('non breaking error caught');
        });
    }
    if (initializing) setInitializing(false);
  };

  if (initializing) return null;

  return (
    <Provider store={store}>
      <PlayerContext.Provider value={{userData, setUserData}}>
        <TRAKLISTNavigation handleTheme={handleTheme} user={user} />
        <View
          style={{
            height: 80,
            width: Dimensions.get('screen').width,
            padding: 20,
            flexDirection: 'row',
          }}>
          <View>
            <Pressable
              onPress={() => {
                const action1 = handleMediaPlayerAction({
                  playbackState: 'pause:force',
                });
                store.dispatch(action1);
                const action = setYoutubeId({
                  youtubeId: content.conferencesAndTalks[2].url,
                  player: {
                    // geniusId: trak.trak.genius.id,
                    title: content.conferencesAndTalks[0].title,
                    artist: 'trak.trak.artist',
                    cover_art: 'trak.trak.thumbnail',
                  },
                });
                store.dispatch(action);
              }}>
              <View
                style={{
                  height: 30,
                  width: 30,
                  backgroundColor: 'red',
                  marginRight: 20,
                }}
              />
            </Pressable>
          </View>
          <View>
            <Text>TRAKLIST</Text>
            <Text>TRAKLIST</Text>
          </View>
        </View>
        <View>
          <TRXPictureInPictureContainer isTraklist={false} />
        </View>
      </PlayerContext.Provider>
    </Provider>
  );
};
