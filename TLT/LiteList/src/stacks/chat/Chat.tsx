import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {HeaderContainer} from '../../containers';
import {
  SocialScreen,
  MessagingScreen,
  ChatScreen,
  ProfileScreen,
} from '../../screens';
import {MessagingInterface, ChatInterface} from '../../interfaces';

const Stack = createStackNavigator();

export const ChatStack = () => {
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
        name="MESSAGING"
        component={MessagingInterface}
        options={{
          title: 'MESSAGING',
          header: props => <HeaderContainer hasBackButton {...props} />,
        }}
      />
      <Stack.Screen
        name="CHAT"
        component={ChatInterface}
        options={{
          title: 'CHAT',
          header: props => <HeaderContainer hasBackButton isModal {...props} />,
        }}
      />
      <Stack.Screen
        name="SOCIAL_DASHBOARD"
        component={SocialScreen}
        options={{
          title: 'SIGN IN',
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};
