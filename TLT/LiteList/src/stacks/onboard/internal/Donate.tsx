import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  DonateTRAKScreen,
  DonateJUKEScreen,
  DonatePATRONScreen,
} from '../../../screens';

const Stack = createStackNavigator();

export const DonateStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#1db954',
      }}>
      <Stack.Screen
        name="DONATE_TRAK"
        component={DonateTRAKScreen}
        options={{
          title: 'DONATE TRAK',
        }}
      />
      <Stack.Screen
        name="DONATE_JUKE"
        component={DonateJUKEScreen}
        options={{
          title: 'DONATE JUKE',
        }}
      />
      <Stack.Screen
        name="DONATE_PATRON"
        component={DonatePATRONScreen}
        options={{
          title: 'DONATE PATRON',
        }}
      />
    </Stack.Navigator>
  );
};
