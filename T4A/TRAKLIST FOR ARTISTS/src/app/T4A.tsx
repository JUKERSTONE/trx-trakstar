import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  store,
  setFirebaseProfile,
  asyncStorageIndex,
  useAsyncStorage,
  setTRXProfile,
  storeKeysTRX,
} from '../stores';
import {Provider} from 'react-redux';
import {T4AView, T4A} from './internal';
import auth from '@react-native-firebase/auth';
import {useT4AApp} from '.';
import firestore from '@react-native-firebase/firestore';
import {useFirebase} from './firebase';

export const T4AApp = () => {
  const {handleTheme} = useT4AApp();
  const {handleGet} = useAsyncStorage();
  const {handleGetUserProfile} = useFirebase();
  const isDarkMode = useColorScheme() === 'dark';
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [modalState, setModalState] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber; // unsubscribe on unmount
  }, []);

  store.subscribe(() => {
    const state = store.getState();
    const modalState = state.modal;
    console.log(
      '🚀 ~ file: View.tsx ~ line 24 ~ store.subscribe ~ modalState',
      modalState,
    );
    setModalState(modalState);
    console.log('T4A APP STATE : ', state);
  });

  const onAuthStateChanged = async (user: any) => {
    setUser(user);
    console.log(
      '🚀 ~ file: T4A.tsx ~ line 52 ~ onAuthStateChanged ~ user',
      user,
    );
    switch (user) {
      case null:
        // delete redux data
        if (initializing) setInitializing(false);
        break;
      default:
        await handleGetUserProfile(user);
    }
    if (initializing) setInitializing(false);
  };

  // console.log = function () {};

  if (initializing) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <Provider store={store}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <T4A handleTheme={handleTheme} user={user} />
    </Provider>
  );
};
