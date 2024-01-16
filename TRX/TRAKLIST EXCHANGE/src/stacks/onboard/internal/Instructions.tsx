import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DonateTRAK, DonateJUKE, DonatePATRON} from '../../../screens';

const Stack = createStackNavigator();

export const InstructionsStack = () => {
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
        component={DonateTRAK}
        options={{
          title: 'DONATE TRAK',
        }}
      />
      <Stack.Screen
        name="DONATE_JUKE"
        component={DonateJUKE}
        options={{
          title: 'DONATE JUKE',
        }}
      />
      <Stack.Screen
        name="DONATE_PATRON"
        component={DonatePATRON}
        options={{
          title: 'DONATE PATRON',
        }}
      />
    </Stack.Navigator>
  );
};
