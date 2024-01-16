import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
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
      }}>
      <Stack.Screen
        name="LOG_IN"
        component={SignInScreen}
        options={{
          title: 'Log In',
        }}
      />
    </Stack.Navigator>
  );
};
