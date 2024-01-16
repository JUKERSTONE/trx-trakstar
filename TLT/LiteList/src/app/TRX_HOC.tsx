import React, {Component, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  Alert,
  Button,
} from 'react-native';

import {Provider} from 'react-redux';
import crashlytics from '@react-native-firebase/crashlytics';
import LottieView from 'lottie-react-native';
import {ProgressBar} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
import {initStripe, useStripe} from '@stripe/stripe-react-native';
import KeepAwake from 'react-native-keep-awake';

import {
  handleServices,
  handleChats,
  handleFCMToken,
  handleStreakRewards,
  handleListenUserProfile,
  onAuthStateChanged,
  handleReduxListener,
  handleTRAKLIST,
  handleDefineUserPackage,
  handleRSS,
  handleFeed,
  handleRetrieveBasket,
  handleInitTRX,
  handleGetTRXRadio,
} from '.';

import {
  store,
  setSpotifyClientToken,
  setAuthentication,
  useAsyncStorage,
  asyncStorageIndex,
} from '../stores';

import {api} from '../api';
import {colors, Base64} from '../core';
import {SPOTIFY_ACCOUNTS_KEY} from '../auth';
import {HeaderContainer} from '../containers';
import {VHeader, Body} from '../elements';
import {handleTrakStarHome} from './hooks/trakstar/home';

const {handleClear, handleStore} = useAsyncStorage();
const queryString = require('query-string');

export const TRX_HOC = (InnerComponent: any) => {
  return class TRX_HOC extends Component {
    constructor(props: any) {
      super(props);
      this.state = {
        user: null,
        token: null,
        initializing: true,
        hasCrypto: true,
        theme: {
          dark: false,
          colors: {
            primary: colors.dark.primary,
            background: colors.dark.primary,
            card: colors.dark.primary,
            text: '#fff',
            border: 'whitesmoke',
            notification: 'purple',
          },
        },
        progress: 0,
        deepLink: null,
        error: null,
      };

      // console.log = function () {};
    }

    componentDidMount() {
      // handleClear();
      handleReduxListener();
      this.handleInitializeNotifications();
      this.handleFirebaseListener();
      this.handleInitializeStripe();

      return;
    }

    componentDidCatch(error: any) {
      this.setState({error});
      crashlytics().recordError(error);
    }

    handleInitializeStripe = async () => {
      await initStripe({
        publishableKey: __DEV__
          ? 'pk_test_51I6mKCDfXHQFQVOullPWJg7eYcVE87dBsMUsLNNWUz0h9JxVEGXgNpEwVhlkEwOxZx7c82ga81J6mxm53FWP2G2a00LjjoGjtb'
          : 'pk_live_51I6mKCDfXHQFQVOuJyBjQ91HD3nj81s5BjLuo2Ixovm0Y2iMEpSZ7O1LFvG5nXoTWFwDwVGnRIuXyojdDlsWtOWv00DEfb4RRD',
        merchantIdentifier: 'merchant.com.trakstar',
        urlScheme: 'traklist',
      });
    };

    handleInitializeNotifications = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }

      const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log(
          '🚀 ~ file: TRAKLITEInterface.tsx ~ line 85 ~ TRXInterfaceHOC ~ unsubscribe ~ remoteMessage',
          remoteMessage,
        );

        const data = remoteMessage.data;
        const type = data?.type;

        switch (type) {
          case 'chat':
            Toast.show({
              type: 'success',
              text1: data!.title,
              text2: data!.body,
            });

            // entry point to deeplinking application
            break;
          default:
            break;
        }
      });

      messaging().onNotificationOpenedApp(async (remoteMessage: any) => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
        // alert('type : ' + remoteMessage.data.type);

        const type = remoteMessage.data.type;

        const path = `traklist://app/${type}`;

        const supported = await Linking.canOpenURL(path);

        if (supported) {
          // Opening the link with some app, if the URL scheme is "http" the web link should be opened
          // by some browser in the mobile
          await Linking.openURL(path);
        } else {
          Alert.alert(`Don't know how to open this URL: ${path}`);
        }
      });

      // Check whether an initial notification is available
      messaging()
        .getInitialNotification()
        .then(async (remoteMessage: any) => {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from quit state:',
              remoteMessage.notification,
            );

            const type = remoteMessage.data.type;

            const deepLink = `traklist://app/${type}`;

            this.setState({deepLink});
          }
        });

      return unsubscribe;
    };

    handleFirebaseListener() {
      const subscriber = auth().onAuthStateChanged(
        this.onAuthStateChanged.bind(this),
      );
      return subscriber;
    }

    async onAuthStateChanged(user: any) {
      console.log(
        '🚀 ~ file: TRX_HOC.tsx:224 ~ TRX_HOC ~ onAuthStateChanged ~ user:',
        user,
      );
      this.setState({user});

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
          console.log(
            '🚀 ~ file: TRAKLIST.tsx ~ line 62 ~ useEffect ~ err',
            err,
          );
          alert(err);
        });

      switch (user) {
        case null:
          /** TODO :delete redux data */
          const authAction1 = setAuthentication(false);
          store.dispatch(authAction1);
          if (this.state.initializing) this.setState({initializing: false});
          break;
        default:
          this.setState({initializing: true, progress: 1 / 8});

          if (!!this.state.deepLink) {
            const supported = await Linking.canOpenURL(this.state.deepLink);

            if (supported) {
              // Opening the link with some app, if the URL scheme is "http" the web link should be opened
              // by some browser in the mobile
              setTimeout(async () => {
                await Linking.openURL(this.state.deepLink);
              }, 1000);
            } else {
              Alert.alert(
                `Don't know how to open this URL: ${this.state.deepLink}`,
              );
            }
            if (this.state.initializing) this.setState({initializing: false});
          }

          const token = await auth()
            .currentUser?.getIdToken(true)
            .then((token: any) => {
              console.log(
                '🚀 ~ file: TRX_HOC.tsx:257 ~ TRX_HOC ~ .then ~ token:',
                token,
              );
              return token;
            });
          this.setState({token});

          console.log(
            '🚀 ~ file: TRX_HOC.tsx ~ line 256 ~ TRX_HOC ~ onAuthStateChanged ~ token',
            token,
          );

          const response = await handleListenUserProfile(user, token);
          console.log(
            '🚀 ~ file: TRAKLITEInterface.tsx ~ line 184 ~ TRXInterfaceHOC ~ onAuthStateChanged ~ response',
            response,
          );
          const isSuccess = response?.success;

          if (isSuccess) {
            const profile = await handleStreakRewards(user, token);
            console.log(
              '🚀 ~ file: TRAKLITEInterface.tsx ~ line 191 ~ TRXInterfaceHOC ~ onAuthStateChanged ~ profile',
              profile,
            );
            await handleServices({user});
            this.setState({progress: 2 / 8});
            await handleFCMToken();
            await handleTRAKLIST();
            await handleGetTRXRadio();
            // await handleInitTRX(); no downloads in the app currently
            this.setState({progress: 4 / 8});
            await handleChats(); // could be done in chat
            // await handleRSS(); // can be done in discover screen
            await handleFeed(); // can be done in feed
            await handleRetrieveBasket(); // can be done in store
            await handleTrakStarHome();
            this.setState({progress: 7 / 8});

            const authAction = setAuthentication(true);
            store.dispatch(authAction);
          } else
            alert('Unsuccesful.. please try again or create a new account');
          if (this.state.initializing) this.setState({initializing: false});
          return;
      }
    }

    render() {
      if (this.state.error !== null)
        return (
          <SafeAreaView
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#1a1a1a',
            }}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>
              SUMN WENT WRONG
            </Text>
            {/* <Text style={{color: '#fff'}}>{this.state.error}</Text> */}
          </SafeAreaView>
        );

      if (this.state.initializing)
        return (
          <SafeAreaView
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#1a1a1a',
            }}>
            <LottieView
              source={require('../core/57276-astronaut-and-music.json')}
              autoPlay
              loop
            />

            <View style={{position: 'absolute', top: 100}}>
              <VHeader
                numberOfLines={1}
                type="four"
                color={'#fff'}
                text={'TAKING TOO LONG?'}
              />
              <TouchableOpacity
                onPress={() => onAuthStateChanged(this.state.user)}
                style={{marginTop: 5}}>
                <Body
                  numberOfLines={1}
                  type="one"
                  color={'blue'}
                  text={'RELOAD'}
                  textAlign="center"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  auth()
                    .signOut()
                    .then(async () => {
                      handleClear();
                      const authAction = setAuthentication(false);
                      store.dispatch(authAction);
                      console.log('User signed out!');
                    })
                }
                style={{marginTop: 5}}>
                <Body
                  numberOfLines={1}
                  type="one"
                  color={'blue'}
                  text={'SIGN OUT'}
                  textAlign="center"
                />
              </TouchableOpacity>

              <ProgressBar
                progress={this.state.progress}
                color={'#cecece'}
                style={{
                  marginTop: 3,
                  backgroundColor: 'grey',
                  height: 10,
                  borderRadius: 10,
                }}
              />
              {/* <Button
                title="RELOAD"
                onPress={() => this.onAuthStateChanged(this.state.user)}
              /> */}
            </View>
          </SafeAreaView>
        );

      return (
        <>
          <Provider store={store}>
            <InnerComponent
              handleTheme={this.state.theme}
              user={this.state.user}
            />
          </Provider>
          <Toast />
        </>
      );
    }
  };
};
