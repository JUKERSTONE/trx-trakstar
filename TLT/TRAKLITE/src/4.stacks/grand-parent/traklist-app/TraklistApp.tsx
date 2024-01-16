import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  MainTab,
  DrawerContent,
  Parties,
  Tickets,
  WebViewStack,
  InvestmentStack,
} from '../../parent';

export const TraklistAppStack = () => {
  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="MainTab" component={MainTab} />
        <Drawer.Screen name="Investment" component={InvestmentStack} />
        <Drawer.Screen name="WebView" component={WebViewStack} />
        <Drawer.Screen name="Parties" component={Parties} />
        <Drawer.Screen name="Tickets" component={Tickets} />
        {/* <Drawer.Screen name="Paywall" component={PaywallStack} />
            <Drawer.Screen name="Investment" component={InvestmentStack} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
