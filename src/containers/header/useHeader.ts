import {
  toggleExchangeView,
  store,
  setAuthentication,
  useAsyncStorage,
  setSpotifyPlayer,
  handleMediaPlayerAction,
  handleQueueControlsAction,
  setPlayers,
} from '../../stores';
import {useLITELISTState, handleNowPlaying} from '../../app';
import {useAPI, api} from '../../api';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import {useEffect, useState} from 'react';
import {
  auth as SpotifyAuth,
  remote as SpotifyRemote,
  ApiScope,
  ApiConfig,
} from 'react-native-spotify-remote';
import ShazamKit from '@edualm/react-native-shazam-kit';

export const useHeader = ({navigation}: any) => {
  const {handleGetState} = useLITELISTState();
  const {useGET} = useAPI();

  const isLoggedIn = handleGetState({index: 'authentication'}).isLoggedIn;
  const profile = handleGetState({index: 'profile'});
  const player = handleGetState({index: 'player'});
  const keys = handleGetState({index: 'keys'});
  const TRXProfile = profile.TRX;
  console.log(
    '🚀 ~ file: useHeader.ts:34 ~ useHeader ~ TRXProfile:',
    TRXProfile,
  );
  const userId = TRXProfile.id;
  const {handleClear, handleStore} = useAsyncStorage();

  useEffect(() => {
    handleHeaderPlayer();
  }, []);

  const handleHeaderPlayer = async () => {
    const nowPlaying = await handleNowPlaying();
    console.log(
      '🚀 ~ file: LITELISTInterface.tsx ~ line 304 ~ TRXInterfaceHOC ~ nowPlaying',
      nowPlaying,
    );

    const action = setPlayers({
      spotify: nowPlaying,
      apple_music: null,
    });
    store.dispatch(action);
  };

  const handleDeposit = () => {
    navigation.navigate('MODAL', {
      type: 'deposit',
      exchange: {
        active: true,
      },
    });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleAuthentication = (isModal: any, type: string) => {
    // remove state when logging out

    switch (isLoggedIn) {
      case true:
        Alert.alert(
          'CAUTION.',
          type == 'delete'
            ? 'You are about to delete your account!'
            : `You are about to sign out!`,
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text:
                type == 'delete'
                  ? 'Noted. Delete my account'
                  : 'Noted. Sign me out',
              onPress: async () => {
                if (isModal) {
                  navigation.goBack();
                }
                if (type === 'delete') {
                  return auth()
                    .currentUser?.delete()
                    .then(() => {
                      handleClear();
                      const authAction = setAuthentication(false);
                      store.dispatch(authAction);
                      console.log('User signed out!');
                    });
                } else
                  return auth()
                    .signOut()
                    .then(async () => {
                      handleClear();
                      firestore()
                        .doc(`users/${userId}`)
                        .update({fcm_token: null});
                      const authAction = setAuthentication(false);
                      store.dispatch(authAction);
                      console.log('User signed out!');
                    });
              },
            },
          ],
        );

      default:
        navigation.navigate('AUTHENTICATION');
    }
  };

  const handleProfile = () => {
    navigation.navigate('SOCIAL', {
      screen: 'MESSAGING',
    });
  };

  const handleResumeOnTRAKLIST = async (isPlaying: boolean) => {
    const config: any = {
      // clientId: '29dec26a7f304507b4a9d9bcf0ef210b', // available on the app page
      // clientSecret: '1d27af3b5c4946c1a411657ca50490d0', // click "show client secret" to see this
      // redirectUrl: 'com.trxklist://oauthredirect/', // the redirect you defined after creating the app
      // scopes: [
      //   'user-read-private',
      //   'user-read-email',
      //   'user-read-playback-state',
      //   'user-library-modify',
      //   'user-library-read',
      //   'streaming',
      //   'user-read-recently-played',
      //   'user-follow-modify',
      //   'user-top-read',
      //   'playlist-modify-public',
      //   'playlist-modify-private',
      //   'user-follow-read',
      //   'user-modify-playback-state',
      // ], // the scopes you need to access
      // serviceConfiguration: {
      //   authorizationEndpoint: 'https://accounts.spotify.com/authorize',
      //   tokenEndpoint: 'https://accounts.spotify.com/api/token',
      // },
      clientID: '29dec26a7f304507b4a9d9bcf0ef210b',
      redirectURL: 'com.trxklist://oauthredirect/',
      tokenRefreshURL:
        'https://europe-west1-trx-traklist.cloudfunctions.net/TRAKLIST/spotify/refresh',
      tokenSwapURL:
        'https://europe-west1-trx-traklist.cloudfunctions.net/TRAKLIST/spotify/swap',
      scopes: [ApiScope.AppRemoteControlScope, ApiScope.UserFollowReadScope],
    };

    try {
      if (await SpotifyRemote.isConnectedAsync()) {
        // await SpotifyAuth.endSession();
        const session = await SpotifyAuth.authorize(config);
        console.log(
          '🚀 ~ file: useTRAK.ts ~ line 306 ~ handleSpotify ~ session',
          session,
        );

        await SpotifyRemote.connect(session.accessToken);

        if (isPlaying) {
          await SpotifyRemote.pause();
        } else await SpotifyRemote.resume();
      } else {
        await SpotifyAuth.endSession();
        const session = await SpotifyAuth.authorize(config);
        console.log(
          '🚀 ~ file: useTRAK.ts ~ line 306 ~ handleSpotify ~ session',
          session,
        );

        await SpotifyRemote.connect(session.accessToken);
        if (isPlaying) {
          await SpotifyRemote.pause();
        } else await SpotifyRemote.resume();
      }
    } catch (err) {
      alert(err);

      console.error("Couldn't authorize with or connect to Spotify", err);
      // const session = await SpotifyAuth.authorize(config);
      // await SpotifyRemote.connect(session.accessToken);
      // await SpotifyRemote.resume();
    }
  };

  const handleSkipOnTRAKLIST = async (isForward: any) => {
    const config: any = {
      // clientId: '29dec26a7f304507b4a9d9bcf0ef210b', // available on the app page
      // clientSecret: '1d27af3b5c4946c1a411657ca50490d0', // click "show client secret" to see this
      // redirectUrl: 'com.trxklist://oauthredirect/', // the redirect you defined after creating the app
      // scopes: [
      //   'user-read-private',
      //   'user-read-email',
      //   'user-read-playback-state',
      //   'user-library-modify',
      //   'user-library-read',
      //   'streaming',
      //   'user-read-recently-played',
      //   'user-follow-modify',
      //   'user-top-read',
      //   'playlist-modify-public',
      //   'playlist-modify-private',
      //   'user-follow-read',
      //   'user-modify-playback-state',
      // ], // the scopes you need to access
      // serviceConfiguration: {
      //   authorizationEndpoint: 'https://accounts.spotify.com/authorize',
      //   tokenEndpoint: 'https://accounts.spotify.com/api/token',
      // },
      clientID: '29dec26a7f304507b4a9d9bcf0ef210b',
      redirectURL: 'com.trxklist://oauthredirect/',
      tokenRefreshURL:
        'https://europe-west1-trx-traklist.cloudfunctions.net/TRAKLIST/spotify/refresh',
      tokenSwapURL:
        'https://europe-west1-trx-traklist.cloudfunctions.net/TRAKLIST/spotify/swap',
      scopes: [ApiScope.AppRemoteControlScope, ApiScope.UserFollowReadScope],
    };

    try {
      if (await SpotifyRemote.isConnectedAsync()) {
        // await SpotifyAuth.endSession();
        const session = await SpotifyAuth.authorize(config);
        console.log(
          '🚀 ~ file: useTRAK.ts ~ line 306 ~ handleSpotify ~ session',
          session,
        );

        await SpotifyRemote.connect(session.accessToken);

        if (isForward) {
          await SpotifyRemote.skipToNext();
        } else await SpotifyRemote.skipToPrevious();
      } else {
        await SpotifyAuth.endSession();
        const session = await SpotifyAuth.authorize(config);
        console.log(
          '🚀 ~ file: useTRAK.ts ~ line 306 ~ handleSpotify ~ session',
          session,
        );

        await SpotifyRemote.connect(session.accessToken);
        if (isForward) {
          await SpotifyRemote.skipToNext();
        } else await SpotifyRemote.skipToPrevious();
      }
    } catch (err) {
      alert(err);

      console.error("Couldn't authorize with or connect to Spotify", err);
      // const session = await SpotifyAuth.authorize(config);
      // await SpotifyRemote.connect(session.accessToken);
      // await SpotifyRemote.resume();
    }
  };

  const handlePlayOnTRAKLIST = async ({type, id}: any) => {
    if (!id) return;
    const config: any = {
      // clientId: '29dec26a7f304507b4a9d9bcf0ef210b', // available on the app page
      // clientSecret: '1d27af3b5c4946c1a411657ca50490d0', // click "show client secret" to see this
      // redirectUrl: 'com.trxklist://oauthredirect/', // the redirect you defined after creating the app
      // scopes: [
      //   'user-read-private',
      //   'user-read-email',
      //   'user-read-playback-state',
      //   'user-library-modify',
      //   'user-library-read',
      //   'streaming',
      //   'user-read-recently-played',
      //   'user-follow-modify',
      //   'user-top-read',
      //   'playlist-modify-public',
      //   'playlist-modify-private',
      //   'user-follow-read',
      //   'user-modify-playback-state',
      // ], // the scopes you need to access
      // serviceConfiguration: {
      //   authorizationEndpoint: 'https://accounts.spotify.com/authorize',
      //   tokenEndpoint: 'https://accounts.spotify.com/api/token',
      // },
      clientID: '29dec26a7f304507b4a9d9bcf0ef210b',
      redirectURL: 'com.trxklist://oauthredirect/',
      tokenRefreshURL:
        'https://europe-west1-trx-traklist.cloudfunctions.net/TRAKLIST/spotify/refresh',
      tokenSwapURL:
        'https://europe-west1-trx-traklist.cloudfunctions.net/TRAKLIST/spotify/swap',
      scopes: [ApiScope.AppRemoteControlScope, ApiScope.UserFollowReadScope],
    };

    switch (type) {
      case 'back':
        // action back index

        const action1 = handleQueueControlsAction({
          playbackState: 'index:down',
        });
        store.dispatch(action1);
        try {
          if (await SpotifyRemote.isConnectedAsync()) {
            // await SpotifyAuth.endSession();
            const session = await SpotifyAuth.authorize(config);
            console.log(
              '🚀 ~ file: useTRAK.ts ~ line 306 ~ handleSpotify ~ session',
              session,
            );

            await SpotifyRemote.connect(session.accessToken);

            const action1 = handleMediaPlayerAction({
              playbackState: 'pause:force',
            });
            store.dispatch(action1);

            await SpotifyRemote.playUri(`spotify:track:${id}`);
          } else {
            await SpotifyAuth.endSession();
            const session = await SpotifyAuth.authorize(config);
            console.log(
              '🚀 ~ file: useTRAK.ts ~ line 306 ~ handleSpotify ~ session',
              session,
            );

            await SpotifyRemote.connect(session.accessToken);

            const action1 = handleMediaPlayerAction({
              playbackState: 'pause:force',
            });
            store.dispatch(action1);

            await SpotifyRemote.playUri(`spotify:track:${id}`);
          }
        } catch (err) {
          alert(err);

          console.error("Couldn't authorize with or connect to Spotify", err);
          // const session = await SpotifyAuth.authorize(config);
          // await SpotifyRemote.connect(session.accessToken);
          // await SpotifyRemote.resume();
        }
        break;
      case 'play':
        try {
          if (await SpotifyRemote.isConnectedAsync()) {
            // await SpotifyAuth.endSession();
            const session = await SpotifyAuth.authorize(config);
            console.log(
              '🚀 ~ file: useTRAK.ts ~ line 306 ~ handleSpotify ~ session',
              session,
            );

            await SpotifyRemote.connect(session.accessToken);

            const action1 = handleMediaPlayerAction({
              playbackState: 'pause:force',
            });
            store.dispatch(action1);

            await SpotifyRemote.playUri(`spotify:track:${id}`);
          } else {
            await SpotifyAuth.endSession();
            const session = await SpotifyAuth.authorize(config);
            console.log(
              '🚀 ~ file: useTRAK.ts ~ line 306 ~ handleSpotify ~ session',
              session,
            );

            await SpotifyRemote.connect(session.accessToken);

            const action1 = handleMediaPlayerAction({
              playbackState: 'pause:force',
            });

            store.dispatch(action1);

            if (!nowPlaying) {
              await SpotifyRemote.playUri(`spotify:track:${id}`);
            } else SpotifyRemote.resume();
          }
        } catch (err) {
          alert(err);

          console.error("Couldn't authorize with or connect to Spotify", err);
          // const session = await SpotifyAuth.authorize(config);
          // await SpotifyRemote.connect(session.accessToken);
          // await SpotifyRemote.resume();
        }
        break;
      case 'forward':
        console.log(
          '🚀 ~ file: useHeader.ts ~ line 390 ~ handlePlayOnTRAKLIST ~ id',
          id,
        );
        // action forward index

        const action2 = handleQueueControlsAction({
          playbackState: 'index:up',
        });
        store.dispatch(action2);
        try {
          if (await SpotifyRemote.isConnectedAsync()) {
            // await SpotifyAuth.endSession();
            const session = await SpotifyAuth.authorize(config);
            console.log(
              '🚀 ~ file: useTRAK.ts ~ line 306 ~ handleSpotify ~ session',
              session,
            );

            await SpotifyRemote.connect(session.accessToken);

            const action1 = handleMediaPlayerAction({
              playbackState: 'pause:force',
            });
            store.dispatch(action1);

            await SpotifyRemote.playUri(`spotify:track:${id}`);
          } else {
            await SpotifyAuth.endSession();
            const session = await SpotifyAuth.authorize(config);
            console.log(
              '🚀 ~ file: useTRAK.ts ~ line 306 ~ handleSpotify ~ session',
              session,
            );

            await SpotifyRemote.connect(session.accessToken);

            const action1 = handleMediaPlayerAction({
              playbackState: 'pause:force',
            });
            store.dispatch(action1);

            await SpotifyRemote.playUri(`spotify:track:${id}`);
          }
        } catch (err) {
          alert(err);

          console.error("Couldn't authorize with or connect to Spotify", err);
          // const session = await SpotifyAuth.authorize(config);
          // await SpotifyRemote.connect(session.accessToken);
          // await SpotifyRemote.resume();
        }
        break;
      default:
        break;
    }
  };

  const handleTestBeReal = () => {
    navigation.navigate('BE_REAL');
  };

  const handleNavigateSearch = () => {
    navigation.navigate('SEARCH');
  };

  const handleNavigateSwipe = () => {
    navigation.navigate('SWIPE.');
  };

  const handleNavigateBasket = () => {
    navigation.navigate('Basket');
  };

  const handleNavigatePaywall = () => {
    navigation.navigate('PAYWALL_MODAL');
  };

  const handleNavigateShop = () => {
    navigation.navigate('TRX');
  };

  const handleShazam = async () => {
    console.log(
      '🚀 ~ file: useHeader.ts:482 ~ handleShazam ~ await ShazamKit.isSupported():',
      await ShazamKit.isSupported(),
    );
    if (await ShazamKit.isSupported()) {
      const result = await ShazamKit.listen();
      alert(result.title);
      console.log(
        '🚀 ~ file: useHeader.ts:483 ~ handleShazam ~ result:',
        result,
      );
    }
  };

  const handleClearCache = () => {
    handleClear();
  };

  const handleNavigateConnect = () => {
    navigation.navigate('REGISTER');
  };

  return {
    handleDeposit,
    handleGoBack,
    isLoggedIn,
    handleAuthentication,
    handleProfile,
    TRXProfile,
    handleResumeOnTRAKLIST,
    handleSkipOnTRAKLIST,
    handlePlayOnTRAKLIST,
    handleTestBeReal,
    handleNavigateSearch,
    handleNavigateSwipe,
    handleNavigateBasket,
    handleNavigatePaywall,
    handleNavigateShop,
    handleShazam,
    handleClearCache,
    handleNavigateConnect,
    profile,
  };
};
