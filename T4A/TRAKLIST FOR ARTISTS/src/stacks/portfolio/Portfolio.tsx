import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  PortfolioScreen,
  NFTDashboardScreen,
  NFTMerchandiseScreen,
} from '../../screens';

import {HeaderContainer} from '../../container';

import {MerchandiseStack} from './internal';

const Stack = createStackNavigator();

export const PortfolioStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#1db954',
      }}>
      <Stack.Screen
        name="PORTFOLIO_SCREEN"
        component={PortfolioScreen}
        options={{
          title: 'TRX DISTRIBUTION',
          header: props => {
            return <HeaderContainer {...props} />;
          },
        }}
      />
      <Stack.Screen
        name="NFT_DASHBOARD"
        component={NFTDashboardScreen}
        options={{
          title: 'NFT DASHBOARD',
          header: props => {
            return <HeaderContainer {...props} />;
          },
        }}
      />
      <Stack.Screen
        name="NFT_MERCHANDISE"
        component={MerchandiseStack}
        options={{
          title: 'NFT MERCHANDISE',
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};
