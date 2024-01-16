import React, {useContext} from 'react';
import {View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {RADIO_, APP_BROWSER_} from '../../../../components';
import {
  TRXModalContainer,
  HeaderContainer,
  WalletConnectContainer,
  MMSChatContainer,
  SendCryptoContainer,
  GeniusContainer,
  WebContainer,
  PaywallModalContainer,
  SpotifyRefreshContainer,
  PlaylistContainer,
  PlaylistViewContainer,
} from '../../../../containers';
import {MainTabStack, BeRealStack} from '../../../../stacks';
import {MessagingInterface, ChatInterface} from '../../../../interfaces';
import {PlayerContext} from '../../../../stores';
import {useLITELISTState} from '../../../useLITELISTState';
import {AuctionStack} from '../../../../stacks/auction';

const Tab = createMaterialBottomTabNavigator();

export const INTEFACE_ = React.memo(({...props}: any) => {
  const {userData, setUserData} = useContext(PlayerContext);
  const Stack = createStackNavigator();
  const {handleGetState} = useLITELISTState();

  const keys = handleGetState({index: 'keys'});
  const isOOS = keys.spotify.isOOS;

  const config = {
    screens: {
      MESSAGING: 'chat',
      BE_REAL: 'be_real',
      Profile: 'user',
      AUCTION: 'auction',
    },
  };

  const linking = {
    prefixes: ['traklist://app'],
    config,
  };
  console.log(
    '🚀 ~ file: Navigation.tsx:48 ~ constINTEFACE_=React.memo ~ userData.navigationRef:',
    userData.navigationRef,
  );

  const handleTheme = userData.handleTheme;
  return (
    <>
      <NavigationContainer
        ref={userData.navigationRef}
        linking={linking}
        theme={handleTheme}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#1a1a1a',
            },
            headerTintColor: '#1db954',
          }}
          initialRouteName={isOOS ? 'SPOTIFY_REFRESH' : 'MAIN'}>
          <Stack.Screen
            name="MAIN"
            component={MainTabStack} //add user to state
            options={{
              title: 'MAIN',
              header: () => null,
            }}
          />
          <Stack.Screen
            name="AUCTION"
            component={AuctionStack}
            options={{
              title: 'AUCTION',
              header: () => null,
            }}
          />
          <Stack.Screen
            name="BE_REAL"
            component={BeRealStack} //add user to state
            options={{
              title: 'BE_REAL',
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
                  <View style={{marginTop: 10}}>
                    <HeaderContainer
                      hasTRAKLIST
                      hasBackButton
                      isModal
                      {...props}
                    />
                  </View>
                ),
              }}
            />
            <Stack.Screen
              name="Playlists"
              component={PlaylistContainer}
              options={{
                title: 'MAIN',
                header: props => (
                  <View style={{marginTop: 10}}>
                    <HeaderContainer hasBackButton isModal {...props} />
                  </View>
                ),
              }}
            />
            <Stack.Screen
              name="PlaylistsView"
              component={PlaylistViewContainer}
              options={{
                title: 'MAIN',
                header: props => (
                  <View style={{marginTop: 10}}>
                    <HeaderContainer hasBackButton isModal {...props} />
                  </View>
                ),
              }}
            />
            <Stack.Screen
              name="WalletConnect"
              component={WalletConnectContainer}
              options={{
                title: 'MAIN',
                header: props => (
                  <View style={{marginTop: 10}}>
                    <HeaderContainer hasBackButton isModal {...props} />
                  </View>
                ),
              }}
            />
            <Stack.Screen
              name="MMS"
              component={MMSChatContainer}
              options={{
                title: 'MAIN',
                header: props => (
                  <View style={{marginTop: 10}}>
                    <HeaderContainer hasBackButton isModal {...props} />
                  </View>
                ),
              }}
            />
            <Stack.Screen
              name="CRYPTO"
              component={SendCryptoContainer}
              options={{
                title: 'MAIN',
                header: props => (
                  <View style={{marginTop: 10}}>
                    <HeaderContainer hasBackButton isModal {...props} />
                  </View>
                ),
              }}
            />
            <Stack.Screen
              name="MESSAGING"
              component={MessagingInterface}
              options={{
                title: 'MESSAGING',
                header: props => <HeaderContainer hasBackButton {...props} />,
              }}
            />
            <Stack.Screen
              name="GENIUS"
              component={GeniusContainer}
              options={{
                title: 'MAIN',
                header: props => (
                  <View style={{marginTop: 10}}>
                    <HeaderContainer hasBackButton isModal {...props} />
                  </View>
                ),
              }}
            />
            <Stack.Screen
              name="PAYWALL_MODAL"
              component={PaywallModalContainer}
              options={{
                title: 'MAIN',
                header: props => (
                  <View style={{marginTop: 10}}>
                    <HeaderContainer hasBackButton isModal {...props} />
                  </View>
                ),
              }}
            />
            <Stack.Screen
              name="SPOTIFY_REFRESH"
              component={SpotifyRefreshContainer}
              options={{
                title: 'MAIN',
                header: props => (
                  <View style={{marginTop: 10}}>
                    <HeaderContainer hasChat={false} isModal {...props} />
                  </View>
                ),
              }}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
      <APP_BROWSER_ {...props} />
    </>
  );
});
