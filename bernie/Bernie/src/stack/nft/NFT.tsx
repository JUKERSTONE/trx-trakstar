import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  TokencyScreen,
  SetTokenScreen,
  AppendTokenScreen,
  MineTokenScreen,
  NFTRequestsScreen,
  VerifyNFTScreen,
} from '../../screens';

const Stack = createStackNavigator();

export const NFTStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#1db954',
      }}>
      <Stack.Screen
        name="NFT_REQUESTS"
        component={NFTRequestsScreen}
        options={{
          title: 'NFT REQUESTS',
        }}
      />
      <Stack.Screen
        name="VERIFY_NFT"
        component={VerifyNFTScreen}
        options={{
          title: 'Verify NFT',
        }}
      />
    </Stack.Navigator>
  );
};
