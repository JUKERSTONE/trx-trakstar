import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  ConnectScreen,
  ProfileScreen,
  Main,
  DetailsScreen,
  ProfileEditScreen,
  WalletSetupScreen,
} from '../../../../screens';

import {OnboardStack} from '../../../onboard';

const Stack = createStackNavigator();

export const RegisterStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#1db954',
      }}>
      <Stack.Screen
        name="CONNECT"
        component={ConnectScreen}
        options={{
          title: 'REGISTER',
          header: props => {
            return null;
          },
        }}
      />
      <Stack.Screen
        name="DETAILS"
        component={DetailsScreen}
        options={{
          title: 'DETAILS',
          header: props => {
            return null;
          },
        }}
      />
      <Stack.Screen
        name="PROFILE_EDIT"
        component={ProfileEditScreen}
        options={{
          title: 'PROFILE',
          header: props => {
            return null;
          },
        }}
      />
      <Stack.Screen
        name="WALLET_SETUP"
        component={WalletSetupScreen}
        options={{
          title: 'WALLET',
          header: props => {
            return null;
          },
        }}
      />
      <Stack.Screen
        name="ONBOARD"
        component={OnboardStack}
        options={{
          title: 'ONBOARD',
          header: props => {
            return null;
          },
        }}
      />
    </Stack.Navigator>
  );
};
