import React from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Main} from '../../../../screens';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  AuthenticationStack,
  WalletStack,
  ExchangeStack,
  ListsStack,
} from '../../../../stacks';
import {createStackNavigator} from '@react-navigation/stack';
import {MainTabStack} from '../../../MainTab';
import {TRXModalContainer, HeaderContainer} from '../../../../containers';

const Tab = createMaterialBottomTabNavigator();

export const TRAKLIST = ({handleTheme, user}: any) => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer theme={handleTheme()}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1a1a1a',
          },
          headerTintColor: '#1db954',
        }}>
        <Stack.Screen
          name="MAIN"
          component={() => MainTabStack({user})} //add user to state
          options={{
            title: 'MAIN',
            header: () => null,
          }}
        />
        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen
            name="MODAL"
            component={TRXModalContainer}
            options={{
              title: 'MAIN',
              header: props => (
                <HeaderContainer hasBackButton isModal {...props} />
              ),
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
