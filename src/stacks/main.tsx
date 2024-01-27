import React, {useContext, useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  AuthenticationStack,
  SwipeStack,
  ListsStack,
  SocialStack,
  ChatStack,
  ProfileSetupStack,
} from '../stacks';
import {useLITELISTState} from '../app';
import {IStore, PlayerContext, store, storeSearch} from '../stores';
import {DiscoverContainer} from '../containers';
import {ShopStack} from './shop';

export const MainTabStack = ({...props}: any) => {
  const [chats, setChats] = useState({});
  const {userData, setUserData} = useContext(PlayerContext);

  const {handleGetState} = useLITELISTState();
  const authentication = handleGetState({index: 'authentication'});
  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  console.log(
    '🚀 ~ file: appendTRAKLIST.ts ~ line 37 ~ handleAppendLikes ~ TRXProfile',
    TRXProfile,
  );

  const userCategory = TRXProfile.userCategory;
  console.log(
    '🚀 ~ file: main.tsx:36 ~ MainTabStack ~ userCategory:',
    userCategory,
  );

  const isLoggedIn = authentication.isLoggedIn;
  console.log(
    '🚀 ~ file: MainTab.tsx ~ line 21 ~ MainTabStack ~ FirebaseProfile',
    isLoggedIn,
  );

  const Tab = createMaterialBottomTabNavigator();
  const user = userData.user;

  return (
    <Tab.Navigator initialRouteName="LISTS">
      {user && userCategory && (
        <Tab.Screen
          name="LISTS"
          options={{
            tabBarLabel: '',
            tabBarIcon: ({color, focused}) => (
              <MaterialIcons
                name="swipe"
                color={focused ? '#1db954' : 'grey'}
                size={20}
              />
            ),
          }}
          component={SwipeStack}
        />
      )}

      <Tab.Screen
        name="TRX"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, focused}) => (
            <MaterialIcons name="explore" color={color} size={22} />
          ),
        }}
        component={ListsStack}
      />

      <>
        {user && userCategory && (
          <Tab.Screen
            name="SOCIAL"
            options={{
              tabBarLabel: '',
              tabBarIcon: ({color, focused}) => (
                <MaterialIcons
                  name="library-music"
                  color={focused ? '#1db954' : 'grey'}
                  size={22}
                />
              ),
            }}
            component={SocialStack}
          />
        )}
        <Tab.Screen
          name="SHOP"
          options={{
            tabBarLabel: '',
            tabBarIcon: ({color, focused}) => (
              <MaterialIcons
                name="shop"
                color={focused ? '#1db954' : 'grey'}
                size={22}
              />
            ),
          }}
          component={ShopStack}
        />
      </>
    </Tab.Navigator>
  );
};
