import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ExchangeScreen, RedeemScreen, NFTProductScreen} from '../../../screens';

const Stack = createStackNavigator();

export const RedeemStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#1db954',
      }}>
      <Stack.Screen
        name="REDEEM"
        component={RedeemScreen}
        options={{
          title: 'Exchange',
          header: () => null,
        }}
      />
      <Stack.Screen
        name="NFT_PRODUCT"
        component={NFTProductScreen}
        options={{
          title: 'NFT Product',
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};
