import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {HeaderContainer} from '../../containers';
import {SignInScreen} from '../../screens';
import {RegisterStack} from './internal';

const Stack = createStackNavigator();

export const AuthenticationStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#1db954',
        header: props => {
          return null;
        },
      }}>
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
