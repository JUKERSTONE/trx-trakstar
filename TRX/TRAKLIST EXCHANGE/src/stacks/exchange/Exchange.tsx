import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ExchangeInterface} from '../../interfaces';
import {HeaderContainer} from '../../containers';
const Stack = createStackNavigator();

export const ExchangeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#1db954',
        header: props => {
          return <HeaderContainer {...props} />;
        },
      }}>
      <Stack.Screen
        name="EXCHANGE"
        component={ExchangeInterface}
        options={{
          title: 'EXCHANGE',
        }}
      />
    </Stack.Navigator>
  );
};
