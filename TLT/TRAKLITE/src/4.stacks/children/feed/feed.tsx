import React, {useContext} from 'react';
import {Image, SafeAreaView} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Content} from '../../../5.screens';
import {Caption} from '../../../5.screens';
import {Timeline} from '../../../5.screens';
import {store, useProvider} from '../../../3.stores';
import * as actions from '../../../3.stores';
import {TraklistPlayerContainer} from '../../../6.containers/hooks/traklist-player/TraklistPlayer';
import {Header} from '../../../6.containers/hooks/header';

export const FeedStack: React.FC<any> = ({...props}) => {
  const {state} = useContext(useProvider);
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3a3a3a',
        },
        headerTintColor: '#1a1a1a',
      }}>
      <Stack.Screen
        name="TIMELINE."
        component={Timeline}
        options={{
          title: 'TIMELINE',
          header: props => {
            if (state.player.title && state.player.isHidden) {
              return <Header hasGoBack={false} hasMenu hasPost {...props} />;
            }
          },
        }}
      />
      <Stack.Screen
        name="POST."
        component={Content}
        options={{
          title: 'CONTENT',
          header: props => {
            if (state.player.title && state.player.isHidden) {
              return <Header {...props} />;
            }
          },
        }}
      />
      <Stack.Screen
        name="PREVIEW."
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
