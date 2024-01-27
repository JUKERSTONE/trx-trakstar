import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {DonateStack, InstructionsStack, PaywallStack} from '..';
import {SeedScreen, InstructionsScreen} from '../../screens';
import {OfflineScreen} from '../../screens/Offline';

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
    </Stack.Navigator>
  );
};
