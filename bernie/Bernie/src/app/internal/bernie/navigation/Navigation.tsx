import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {
  TokencyStack,
  NFTStack,
  AdminStack,
  AuthenticationStack,
} from '../../../../stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useBERNIEState} from '../../../';
import {createStackNavigator} from '@react-navigation/stack';
import {GeniusMatchContainer} from '../../../../containers';

const Tab = createMaterialBottomTabNavigator();

export const BernieNavigation = ({user, ...props}: any) => {
  const {handleGetState} = useBERNIEState();

  const Stack = createStackNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Interface"
      activeColor="#FFF"
      inactiveColor="grey"
      {...props}>
      {user ? (
        <>
          <Tab.Screen
            name="ADMIN"
            component={AdminStack}
            options={{
              tabBarLabel: 'ADMIN',
              tabBarIcon: ({color}) => (
                <FontAwesome5 name="user-shield" color={color} size={20} />
              ),
            }}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name="AUTHENTICATE"
            component={AuthenticationStack}
            options={{
              tabBarLabel: 'AUTHENTICATE',
              tabBarIcon: ({color}) => (
                <FontAwesome name="sign-in" color={color} size={20} />
              ),
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
};
