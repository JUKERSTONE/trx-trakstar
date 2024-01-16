import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {WalletInterface} from '../../interfaces';
import {TRAKStack} from '../TRAK';
import {HeaderContainer} from '../../containers';
import {WalletConnectScreen} from '../../screens';
const Stack = createStackNavigator();

export const WalletStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#1db954',
        header: props => {
          return <HeaderContainer {...props} />;
        },
      }}>
      <Stack.Screen
        name="WALLET"
        component={WalletInterface}
        options={{
          title: 'WALLET',
        }}
      />
      <Stack.Screen
        name="TRAK"
        component={TRAKStack}
        options={{
          title: 'TRAK',
          header: props => {
            return <HeaderContainer {...props} hasBackButton />;
          },
        }}
      />
      <Stack.Screen
        name="CONNECT"
        component={WalletConnectScreen}
        options={{
          title: 'CONNECT',
          header: props => {
            return <HeaderContainer {...props} hasBackButton />;
          },
        }}
      />
    </Stack.Navigator>
  );
};
