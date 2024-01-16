import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {DonateStack, InstructionsStack, PaywallStack} from '..';
import {SeedScreen, InstructionsScreen, Main, ListsScreen} from '../../screens';

import {HeaderContainer} from '../../containers';
import {ListsInterface} from '../../interfaces';

const Stack = createStackNavigator();
export const ListsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#1db954',
      }}>
      <Stack.Screen
        name="LIST_DASHBOARD"
        component={ListsInterface}
        options={{
          header: props => {
            return null;
          },
          title: 'LISTS',
        }}
      />
    </Stack.Navigator>
  );
};
