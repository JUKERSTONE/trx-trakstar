import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {CollectionContainer, HeaderContainer} from '../../containers';
import {ListsScreen} from '../../screens';
import {ListsInterface} from '../../interfaces';

const Stack = createStackNavigator();

export const ListStack = ({...props}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#1db954',
      }}>
      <Stack.Screen
        name="LIST"
        component={ListsInterface}
        options={{
          title: 'SEARCH',
          header: () => null,
        }}
      />
      <Stack.Screen
        name="Collection"
        component={CollectionContainer}
        options={{
          title: 'Collection',
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};
