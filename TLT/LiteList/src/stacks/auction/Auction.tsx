import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {HeaderContainer} from '../../containers';
import {ListsInterface} from '../../interfaces';
import {AuctionScreen} from '../../screens';
import {AuctionInterface} from '../../interfaces/Auction';

const Stack = createStackNavigator();
export const AuctionStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#1db954',
      }}>
      <Stack.Screen
        name="Auction"
        component={AuctionInterface}
        options={{
          header: props => (
            <HeaderContainer
              backgroundColor="#1a1a1a"
              // hasBackButton
              hasShazam
              {...props}
              hasTRAKLIST
            />
          ),
          title: 'LISTS',
        }}
      />
    </Stack.Navigator>
  );
};
