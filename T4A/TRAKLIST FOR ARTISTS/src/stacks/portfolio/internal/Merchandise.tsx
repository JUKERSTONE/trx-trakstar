import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  PortfolioScreen,
  AddMerchandiseScreen,
  NFTMerchandiseScreen,
} from '../../../screens';

const Stack = createStackNavigator();

export const MerchandiseStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#1db954',
      }}>
      <Stack.Screen
        name="MERCHANDISE"
        component={NFTMerchandiseScreen}
        options={{
          title: 'MERCHANDISE',
          header: () => null,
        }}
      />
      <Stack.Screen
        name="ADD_MERCHANDISE"
        component={AddMerchandiseScreen}
        options={{
          title: 'ADD MERCHANDISE',
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};
