import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {PaywallScreen} from '../../../screens';

const Stack = createStackNavigator();

export const PaywallStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#1db954',
      }}>
      <Stack.Screen
        name="SUBSCRIPTIONS"
        component={PaywallScreen}
        options={{
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};
