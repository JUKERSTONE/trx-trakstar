import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {DonateStack, InstructionsStack, PaywallStack} from '..';
import {SeedScreen, InstructionsScreen, SignInScreen} from '../../screens';
import {OfflineScreen} from '../../screens/Offline';
import {RegisterStack} from '../authenticate/internal';
import {HeaderContainer} from '../../containers';

const Stack = createStackNavigator();

export const ProfileSetupStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#1db954',
      }}>
      <Stack.Screen
        name="Offline"
        component={OfflineScreen}
        options={{
          header: () => null,
          title: 'Offline',
        }}
      />
      <Stack.Screen
        name="REGISTER"
        component={RegisterStack}
        options={{
          title: 'REGISTER',
        }}
      />
      <Stack.Screen
        name="SIGN_IN"
        component={SignInScreen}
        options={{
          title: 'SIGN IN',
          header: props => <HeaderContainer hasBackButton {...props} />,
        }}
      />
    </Stack.Navigator>
  );
};
