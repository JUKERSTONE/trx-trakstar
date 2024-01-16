import React from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Main} from '../screens';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  AuthenticationStack,
  WalletStack,
  ExchangeStack,
  ListsStack,
} from '../stacks';
import {useTRAKLISTState} from '../app';

export const MainTabStack = ({user, ...props}: any) => {
  const {handleGetState} = useTRAKLISTState();
  const authentication = handleGetState({index: 'authentication'});
  const isLoggedIn = authentication.isLoggedIn;
  console.log(
    '🚀 ~ file: MainTab.tsx ~ line 21 ~ MainTabStack ~ FirebaseProfile',
    isLoggedIn,
  );
  const Tab = createMaterialBottomTabNavigator();
  return (
    <Tab.Navigator
      barStyle={{
        borderTopColor: '#333333',
        borderTopWidth: 2,
      }}>
      <Tab.Screen
        name="LISTS"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="compass" color={color} size={25} />
          ),
        }}
        component={ListsStack}
      />
      <Tab.Screen
        name="TRX"
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
        component={ExchangeStack}
      />
      {user ? (
        <Tab.Screen
          name="WALLET+"
          options={{
            tabBarLabel: '',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="wallet-plus"
                color={color}
                size={23}
              />
            ),
          }}
          component={WalletStack}
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
  );
};
