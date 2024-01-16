import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {HeaderContainer} from '../../containers';
import {RegisterStack} from './internal';
import {SignInScreen} from '../../screens';

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
          return <HeaderContainer {...props} />;
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
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};
