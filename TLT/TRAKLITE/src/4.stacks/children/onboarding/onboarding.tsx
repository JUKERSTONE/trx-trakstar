import React, {useContext} from 'react';
import {Image, SafeAreaView} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Content} from '../../../5.screens';
import {Caption} from '../../../5.screens';
import {Welcome, TrackSelect, Track, Tape} from '../../../5.screens';
import {store, useProvider} from '../../../3.stores';
import * as actions from '../../../3.stores';
import {TraklistPlayerContainer} from '../../../6.containers/hooks/traklist-player/TraklistPlayer';

export const OnboardingStack: React.FC<any> = ({navigation}) => {
  const {state} = useContext(useProvider);
  const number = 6 - state.offline?.likes?.length;
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#1a1a1a',
      }}>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{
          // header: () => null,
          title: 'Welcome',
          headerTitle: props => (
            <Image
              resizeMode="contain"
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/Traklist%20launches?alt=media',
              }}
              style={{height: 25, width: 50}}
            />
          ),
          headerLeft: () => (
            <MaterialIcons.Button
              name="login"
              size={23}
              backgroundColor="transparent"
              color="#fff"
              onPress={() => navigation.navigate('MainTab', {screen: 'START'})}
              style={{paddingLeft: 16}}></MaterialIcons.Button>
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
        name="TrackSelect"
        component={TrackSelect}
        options={{
          title: 'Welcome',
          headerTitle: props => (
            <Image
              resizeMode="contain"
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/Traklist%20launches?alt=media',
              }}
              style={{height: 25, width: 50}}
            />
          ),
          headerLeft: () => (
            <MaterialCommunityIcons.Button
              name="page-previous"
              size={30}
              backgroundColor="transparent"
              color="#fff"
              onPress={() => navigation.navigate('Welcome')}
              style={{paddingLeft: 16}}></MaterialCommunityIcons.Button>
          ),
          headerRight: () => (
            <MaterialCommunityIcons.Button
              name={
                state.offline?.likes?.length === 6
                  ? 'page-next'
                  : state.offline?.likes?.length === 5
                  ? 'numeric-1-circle'
                  : state.offline?.likes?.length === 4
                  ? 'numeric-2-circle'
                  : state.offline?.likes?.length === 3
                  ? 'numeric-3-circle'
                  : state.offline?.likes?.length === 2
                  ? 'numeric-4-circle'
                  : state.offline?.likes?.length === 1
                  ? 'numeric-5-circle'
                  : 'numeric-6-circle'
              }
              size={30}
              backgroundColor="transparent"
              color={
                //MaterialCommunityIcons
                state.offline?.likes?.length === 6
                  ? '#20b654'
                  : state.offline?.likes?.length === 5
                  ? '#fff'
                  : state.offline?.likes?.length === 4
                  ? '#cecece'
                  : state.offline?.likes?.length === 4
                  ? 'grey'
                  : state.offline?.likes?.length === 2
                  ? 'yellow'
                  : state.offline?.likes?.length === 1
                  ? 'orange'
                  : 'red'
              }
              onPress={() => {
                if (state.offline?.likes?.length > 5) {
                  store.dispatch(actions.SET_ONBOARDED('user onboarded.'));
                } else
                  alert(
                    'Please like ' +
                      number +
                      ' more song(s). You can find more in the discover screen',
                  );
              }}
              style={{paddingLeft: 16}}></MaterialCommunityIcons.Button>
          ),
        }}
      />
      <Stack.Screen
        name="TrackView"
        component={Track}
        options={{
          title: 'DISCOVER',
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
          header: () => {
            if (state.player.title && state.player.isHidden) {
              return (
                <SafeAreaView style={{backgroundColor: '#1a1a1a'}}>
                  <TraklistPlayerContainer navigation={navigation} />
                </SafeAreaView>
              );
            }
          },
        }}
      />
      {/* <Stack.Screen
        name="TapeView"
        component={Tape}
        options={{
          title: 'DISCOVER',
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
          header: () => {
            // if (state.player.title && state.player.isHidden) {
            return (
              <SafeAreaView style={{backgroundColor: '#1a1a1a'}}>
                <TraklistPlayerContainer navigation={navigation} />
              </SafeAreaView>
            );
          },
          // },
        }}
      /> */}
    </Stack.Navigator>
  );
};
