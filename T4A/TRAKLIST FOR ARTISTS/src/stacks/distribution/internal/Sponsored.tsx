import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  SettingsScreen,
  SearchScreen,
  UploadsScreen,
  StrategyScreen,
  NFTProductScreen,
} from '../../../screens';
import {TracksScreen} from '../../../screens/Tracks';
import {SponsoredPreviewContainer} from '../../../container/sponsored-preview/SponsoredPreview';

const Stack = createStackNavigator();

export const SponsoredStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#1db954',
      }}>
      <Stack.Screen
        name="Sponsored_Form_1"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          header: () => null,
        }}
      />
      <Stack.Screen
        name="Sponsored_Form_2"
        component={TracksScreen}
        options={{
          title: 'Tracks / Products',
          header: () => null,
        }}
      />
      <Stack.Screen
        name="Sponsored_Form_3"
        component={SearchScreen}
        options={{
          title: 'Search / Targetting',
          header: () => null,
        }}
      />
      <Stack.Screen
        name="Sponsored_Form_4"
        component={NFTProductScreen}
        options={{
          title: 'NFT Product',
          header: () => null,
        }}
      />
      <Stack.Screen
        name="Sponsored_Form_5"
        component={StrategyScreen}
        options={{
          title: 'Strategy',
          header: () => null,
        }}
      />
      <Stack.Screen
        name="Sponsored_Preview"
        component={SponsoredPreviewContainer}
        options={{
          title: 'Preview',
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};
