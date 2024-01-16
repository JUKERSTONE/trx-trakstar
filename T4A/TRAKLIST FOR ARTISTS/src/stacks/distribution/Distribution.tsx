import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {RedeemStack, SponsoredStack} from './internal';
import {TRXDistributionScreen} from '../../screens';
import {HeaderContainer} from '../../container';

const Stack = createStackNavigator();

export const DistributionStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#1db954',
      }}>
      <Stack.Screen
        name="TRX_DISTRIBUTION"
        component={TRXDistributionScreen}
        options={{
          title: 'TRX DISTRIBUTION',
          header: props => {
            return <HeaderContainer {...props} />;
          },
        }}
      />
      <Stack.Screen
        name="REDEEM"
        component={RedeemStack}
        options={{
          title: 'REDEEM',
          header: props => {
            return <HeaderContainer {...props} />;
          },
        }}
      />
      <Stack.Screen
        name="Sponsored"
        component={SponsoredStack}
        options={{
          title: 'Sponsored',
          header: props => {
            return <HeaderContainer {...props} />;
          },
        }}
      />
    </Stack.Navigator>
  );
};
