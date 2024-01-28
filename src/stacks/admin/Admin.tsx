import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {HeaderContainer} from '../../containers';
import {
  SocialScreen,
  MessagingScreen,
  ChatScreen,
  ProfileScreen,
  AdminScreen,
} from '../../screens';
import {MessagingInterface, ChatInterface} from '../../interfaces';

const Stack = createStackNavigator();

export const AdminStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#1db954',
        header: props => {
          return <HeaderContainer {...props} />;
        },
      }}>
      <Stack.Screen
        name="PROFILE"
        component={AdminScreen}
        options={{
          title: 'SIGN IN',
          header: props => (
            <HeaderContainer
              hasShazam={false}
              hasChat
              backgroundColor={'#1B3926'}
              {...props}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};
