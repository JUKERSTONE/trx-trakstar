import {View, Text, Image} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Main} from '../../../screens';
import {
  LibraryStack,
  SearchStack,
  AuthenticationStack,
  ListStack,
} from '../../../stacks';

const Tab = createMaterialBottomTabNavigator();

export const TRAKLISTNavigation = ({handleTheme, user}: any) => {
  return (
    <NavigationContainer theme={handleTheme()}>
      <Tab.Navigator
        barStyle={{
          backgroundColor: '#1a1a1a',
          borderTopColor: '#fff',
          borderTopWidth: 3,
        }}
        activeColor="#1db954"
        inactiveColor="whitesmoke"
        style={{backgroundColor: 'transparent'}}>
        <Tab.Screen
          name="LISTS"
          options={{
            tabBarLabel: '',
            tabBarIcon: ({color}) => (
              <FontAwesome5 name="record-vinyl" color={color} size={24} />
            ),
          }}
          component={ListStack}
        />
        <Tab.Screen
          name="SEARCH"
          options={{
            tabBarLabel: '',
            tabBarIcon: ({color, focused}) => (
              <Image
                style={{
                  height: 35,
                  width: 35,
                  marginTop: 8,
                  backgroundColor: focused ? '#fff' : 'whitesmoke',
                  borderRadius: 15,
                  borderWidth: focused ? 3 : 2.5,
                  borderColor: focused ? 'green' : '#333333',
                  opacity: focused ? 1 : 0.85,
                }}
                source={{
                  uri: focused
                    ? 'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/Asset%207.png?alt=media'
                    : 'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/TRAKLIST.png?alt=media',
                }}
              />
            ),
          }}
          component={SearchStack}
        />
        {user ? (
          <Tab.Screen
            name="LIBRARY"
            options={{
              tabBarLabel: '',
              tabBarIcon: ({color}) => (
                <MaterialIcons name="book" color={color} size={24} />
              ),
            }}
            component={LibraryStack}
          />
        ) : (
          <Tab.Screen
            name="AUTHENTICATION"
            component={AuthenticationStack}
            options={{
              tabBarLabel: '',
              tabBarIcon: ({color}) => (
                <Entypo name="login" color={color} size={23} />
              ),
            }}
          />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};
