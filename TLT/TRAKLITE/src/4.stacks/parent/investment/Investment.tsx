import React, {useContext} from 'react';
import {Image, SafeAreaView} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Tape} from '../../../5.screens';
import {SearchResults} from '../../../5.screens';
// import {Track} from '../../../../5.screens';
import {store, useProvider} from '../../../3.stores';
import * as actions from '../../../3.stores';
import {TraklistPlayerContainer} from '../../../6.containers/hooks/traklist-player/TraklistPlayer';
import {Header} from '../../../6.containers/hooks/header';
// import {TrackScreen, TapeScreen, ArtistScreen} from '../../../../5.screens';

export const InvestmentStack = (props: any) => {
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
      {/* <Stack.Screen
        name="TrackScreen"
        component={TrackScreen}
        options={{
          header: props => null,
        }}
      /> */}
      <Stack.Screen
        name="Tape"
        component={Tape}
        options={{
          header: props => null,
        }}
      />
      {/* <Stack.Screen
        name="ArtistScreen"
        component={ArtistScreen}
        options={{
          header: props => null,
        }} */}
      {/* /> */}
    </Stack.Navigator>
  );
};
