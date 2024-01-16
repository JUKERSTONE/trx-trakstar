import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {SignInScreen} from '../../screens';

import {HeaderContainer} from '../../containers';

const Stack = createStackNavigator();

export const AuthenticationStack = ({...props}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#1db954',
      }}>
      <Stack.Screen
        name="SIGN_IN"
        component={SignInScreen}
        options={{
          title: 'SEARCH',
          header: () => <HeaderContainer {...props} />,
        }}
      />
    </Stack.Navigator>
  );
};
