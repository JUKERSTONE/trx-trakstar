import React, {useContext} from 'react';
import {Image, SafeAreaView} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {SearchLanding} from '../../../5.screens';
import {WebView} from '../../../5.screens';
import {Track} from '../../../5.screens';
import {store, useProvider} from '../../../3.stores';
import * as actions from '../../../3.stores';
import {TraklistPlayerContainer} from '../../../6.containers/hooks/traklist-player/TraklistPlayer';
import {Header} from '../../../6.containers/hooks/header';
import {TicketsLanding} from '../../../5.screens';

export const WebViewStack = (props: any) => {
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
        name="WebView"
        component={WebView}
        options={{
          header: props => null,
        }}
      />
    </Stack.Navigator>
  );
};
