import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  ConnectScreen,
  DetailsScreen,
  ProfileEditScreen,
  WalletSetupScreen,
} from '../../../../screens';
import {HeaderContainer} from '../../../../containers';

import {OnboardStack, PaywallStack} from '../../../onboard';

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
          // title: 'REGISTER',
          header: props => <HeaderContainer hasBackButton={true} {...props} />,
        }}
      />
      <Stack.Screen
        name="DETAILS"
        component={DetailsScreen}
        options={{
          title: 'DETAILS',
          header: props => <HeaderContainer hasBackButton {...props} />,
        }}
      />
      <Stack.Screen
        name="PROFILE_EDIT"
        component={ProfileEditScreen}
        options={{
          title: 'PROFILE',
          header: props => <HeaderContainer hasBackButton {...props} />,
        }}
      />
      <Stack.Screen
        name="WALLET_SETUP"
        component={WalletSetupScreen}
        options={{
          title: 'WALLET',
          header: props => <HeaderContainer hasBackButton {...props} />,
        }}
      />
      <Stack.Screen
        name="PAYWALL"
        component={PaywallStack}
        options={{
          header: props => <HeaderContainer hasBackButton {...props} />,
        }}
      />
      <Stack.Screen
        name="ONBOARD"
        component={OnboardStack}
        options={{
          title: 'ONBOARD',
          header: props => <HeaderContainer hasBackButton {...props} />,
        }}
      />
    </Stack.Navigator>
  );
};
