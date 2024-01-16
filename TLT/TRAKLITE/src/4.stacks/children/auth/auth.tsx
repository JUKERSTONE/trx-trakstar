import React from 'react';
import {Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import {SignIn} from '../../../5.screens';
import {Register} from '../../../5.screens';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

export const AuthStack: React.FC = ({navigation}: any) => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#fff',
        headerTitle: props => (
          <Image
            resizeMode="contain"
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/Traklist%20launches?alt=media',
            }}
            style={{height: 25, width: 50}}
          />
        ),
      }}>
      <Stack.Screen
        name="SIGN IN."
        component={SignIn}
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
              backgroundColor="#1a1a1a"
              color="yellow"
              onPress={() => navigation.goBack()}
              style={{paddingLeft: 16}}></MaterialCommunityIcons.Button>
          ),
          headerRight: () => (
            <MaterialCommunityIcons.Button
              name={'page-next'}
              size={25}
              backgroundColor="transparent"
              color="#fff"
              onPress={() => navigation.navigate('TrackSelect')}
              style={{paddingLeft: 16}}></MaterialCommunityIcons.Button>
          ),
        }}
      />
      <Stack.Screen
        name="REGISTER."
        component={Register}
        options={{
          title: 'CONTENT',
          headerTitle: props => (
            <Image
              resizeMode="contain"
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/Traklist%20launches?alt=media',
              }}
              style={{height: 25, width: 50}}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};
