import React from 'react';
import {Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {SearchLanding} from '../../../5.screens';
import {SearchResults} from '../../../5.screens';
import {Lyrics} from '../../../5.screens';

export const SEARCH_STACK: React.FC<any> = ({navigation}) => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: 'grey',
      }}>
      <Stack.Screen
        name="SEARCH."
        component={SearchLanding}
        options={{
          title: 'SEARCH',
          headerLeft: () => (
            <Entypo.Button
              name="menu"
              size={30}
              backgroundColor="transparent"
              color="grey"
              onPress={() => navigation.openDrawer()}
              style={{paddingLeft: 16}}></Entypo.Button>
          ),
          headerRight: () => (
            <MaterialCommunityIcons.Button
              name="waveform"
              size={30}
              backgroundColor="transparent"
              color="grey"
              onPress={() => alert('Shazam feature coming soon...')}
              style={{paddingLeft: 16}}></MaterialCommunityIcons.Button>
          ),
        }}
      />
      <Stack.Screen
        name="POST."
        component={SearchResults}
        options={{
          title: 'CONTENT',
          headerTitle: props => (
            <Image
              resizeMode="contain"
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/Asset%207.png?alt=media',
              }}
              style={{height: 33, width: 50}}
            />
          ),
          headerLeft: () => (
            <MaterialCommunityIcons.Button
              name="message-arrow-left-outline"
              size={30}
              backgroundColor="transparent"
              color="grey"
              onPress={() => navigation.navigate('TIMELINE.')}
              style={{paddingLeft: 16}}></MaterialCommunityIcons.Button>
          ),
          headerRight: () => (
            <MaterialCommunityIcons.Button
              name="cancel"
              size={30}
              backgroundColor="transparent"
              color="grey"
              onPress={() => navigation.navigate('TIMELINE.')}
              style={{paddingLeft: 16}}></MaterialCommunityIcons.Button>
          ),
        }}
      />
      <Stack.Screen
        name="PREVIEW."
        component={Lyrics}
        options={{
          title: 'CAPTION',
          headerRight: () => (
            <MaterialCommunityIcons.Button
              name="cancel"
              size={30}
              backgroundColor="transparent"
              color="grey"
              onPress={() => navigation.navigate('TIMELINE.')}
              style={{paddingLeft: 16}}></MaterialCommunityIcons.Button>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default SEARCH_STACK;
