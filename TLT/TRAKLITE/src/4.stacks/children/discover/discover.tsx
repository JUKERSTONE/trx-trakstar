import React, {useContext} from 'react';
import {Image, SafeAreaView} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import {useProvider} from '../../../3.stores';

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Discover} from '../../../5.screens';
import {Tape, Track, Content, Caption} from '../../../5.screens';
import {TraklistPlayerContainer} from '../../../6.containers/hooks/traklist-player/TraklistPlayer';
import {Header} from '../../../6.containers/hooks/header';

export const DiscoverStack: React.FC<any> = ({...props}) => {
  const {state} = useContext(useProvider);
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#1db954',
      }}>
      <Stack.Screen
        name="DISCOVER."
        component={Discover}
        options={{
          title: 'DISCOVER',
          header: () => null,
        }}
      />
      <Stack.Screen
        name="TrackView"
        component={Track}
        options={{
          title: 'DISCOVER',
          header: props => {
            return <Header {...props} />;
          },
        }}
      />
      <Stack.Screen
        name="Content"
        component={Content}
        options={{
          title: 'Content',
          header: props => {
            if (state.player.title && state.player.isHidden) {
              return <Header {...props} />;
            }
          },
        }}
      />
      <Stack.Screen
        name="Caption"
        component={Caption}
        options={{
          title: 'CAPTION',
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
