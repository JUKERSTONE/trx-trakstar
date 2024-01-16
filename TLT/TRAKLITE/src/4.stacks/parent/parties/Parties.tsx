import React, {useContext} from 'react';
import {Image, SafeAreaView, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {SearchLanding} from '../../../5.screens';
import {SearchResults} from '../../../5.screens';
import {Track} from '../../../5.screens';
import {store, useProvider} from '../../../3.stores';
import * as actions from '../../../3.stores';
import {TraklistPlayerContainer} from '../../../6.containers/hooks/traklist-player/TraklistPlayer';
import {Header} from '../../../6.containers/hooks/header';
import {
  PartiesLanding,
  PartyStart,
  PartyJoin,
  PartyAdmin,
  PartyUser,
  PartyContent,
} from '../../../5.screens';

export const Parties = (props: any) => {
  const {state} = useContext(useProvider);
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#cecece',
      }}>
      <Stack.Screen
        name="PartiesLanding."
        component={PartiesLanding}
        options={{
          header: props => {
            if (state.player.title && state.player.isHidden) {
              return <Header {...props} />;
            }
          },
        }}
      />
      <Stack.Screen
        name="PartyStart"
        component={PartyStart}
        options={{
          header: props => null,
        }}
      />
      <Stack.Screen
        name="PartyJoin"
        component={PartyJoin}
        options={{
          header: props => null,
        }}
      />
      <Stack.Screen
        name="PartyAdmin"
        component={PartyAdmin}
        options={{
          header: props => {
            if (state.player.title && state.player.isHidden) {
              return <Header {...props} />;
            }
          },
        }}
      />
      <Stack.Screen
        name="PartyUser"
        component={PartyUser}
        options={{
          header: props => {
            if (state.player.title && state.player.isHidden) {
              return <Header {...props} />;
            }
          },
        }}
      />
      <Stack.Screen
        name="PartyContent"
        component={PartyContent}
        options={{
          header: props => {
            if (state.player.title && state.player.isHidden) {
              return <Header {...props} />;
            }
          },
        }}
      />
    </Stack.Navigator>
  );
};
