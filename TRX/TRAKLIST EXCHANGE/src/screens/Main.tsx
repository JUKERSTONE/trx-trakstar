import React from 'react';
import {View, Text, Button, SafeAreaView} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useAsyncStorage, toggleExchangeView, store} from '../stores';

export const Main = () => {
  const {handleClear} = useAsyncStorage();
  return (
    <SafeAreaView>
      <Button
        onPress={() => {
          auth()
            .signOut()
            .then(() => {
              handleClear();
            });
        }}
        title="Sign out"
      />
      <Button
        onPress={() => {
          const modal = {
            type: 'exchange',
            exchange: {
              active: true,
            },
          };
          const action = toggleExchangeView(modal);
          store.dispatch(action);
        }}
        title="pop exchange modal"
      />
    </SafeAreaView>
  );
};
