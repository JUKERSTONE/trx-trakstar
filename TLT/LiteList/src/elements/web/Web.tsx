import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator,
  Dimensions,
  Button,
  SafeAreaView,
} from 'react-native';
// import {AlphabetList} from 'react-native-section-alphabet-list';
import {VHeader, Body} from '../typography';
import {TabView, TabBar} from 'react-native-tab-view';
import {colors} from '../../core';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {WebView} from 'react-native-webview';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const WebElement = ({
  handleRestoreProfile,
  handleClaim,
  handleClearKey,
  handleCopyKey,
  secretKey,
}: any) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'second', title: 'TOP TRACKS'},
    {key: 'fourth', title: 'TOP ARTISTS'},
    {key: 'third', title: 'PLAYLISTS'},
  ]);

  const injectedJavaScript1 = '';

  return (
    <SafeAreaView style={{backgroundColor: '#333333', flex: 1}}>
      <TabView
        swipeEnabled={false}
        navigationState={{index, routes}}
        style={{height: Dimensions.get('window').height * 2.5}}
        renderScene={({route}) => {
          switch (route.key) {
            case 'first':
              return (
                <WebView
                  injectedJavaScript={injectedJavaScript1}
                  source={{
                    uri: 'https://tsb.media/walter/stacks/contract-call/purchase-whitelist/stx',
                  }}
                  // onMessage={event => alert(JSON.stringify(event))}
                  // onMessage={event => handlePurchaseWhitelist(event, nft)}
                  // handle the event and listen to the mempool
                />
              );
            case 'second':
              return (
                <WebView
                  injectedJavaScript={injectedJavaScript1}
                  source={{
                    uri: 'https://tsb.media/walter/stacks/contract-call/purchase-whitelist/stx',
                  }}
                  // onMessage={event => alert(JSON.stringify(event))}
                  // onMessage={event => handlePurchaseWhitelist(event, nft)}
                  // handle the event and listen to the mempool
                />
              );
            case 'third':
              return (
                <WebView
                  injectedJavaScript={injectedJavaScript1}
                  source={{
                    uri: 'https://tsb.media/walter/stacks/contract-call/purchase-whitelist/stx',
                  }}
                  // onMessage={event => alert(JSON.stringify(event))}
                  // onMessage={event => handlePurchaseWhitelist(event, nft)}
                  // handle the event and listen to the mempool
                />
              );
            case 'fourth':
              return (
                <WebView
                  injectedJavaScript={injectedJavaScript1}
                  source={{
                    uri: 'https://tsb.media/walter/stacks/contract-call/purchase-whitelist/stx',
                  }}
                  // onMessage={event => alert(JSON.stringify(event))}
                  // onMessage={event => handlePurchaseWhitelist(event, nft)}
                  // handle the event and listen to the mempool
                />
              );
            default:
              return <View />;
          }
        }}
        onIndexChange={setIndex}
        initialLayout={{width: Dimensions.get('screen').width}}
        renderTabBar={props => (
          <TabBar
            {...props}
            style={{backgroundColor: '#1a1a1a'}}
            renderLabel={({route, focused, color}) => {
              let name;

              switch (route.title) {
                case 'HOME':
                  name = 'home';
                  break;
                case 'CHARTS':
                  name = 'stacked-line-chart';
                  break;
                case 'FEED':
                  name = 'rss-feed';
                  break;

                case 'BETA':
                  name = 'perm-device-information';
                  break;
                default:
                  name = 'home';
                  break;
              }
              return (
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      marginRight: 3,
                      backgroundColor: '#232323',
                      borderRadius: 12,
                      paddingVertical: 9,
                      paddingHorizontal: 15,
                      marginTop: 10,
                    }}>
                    <MaterialIcons
                      name={name}
                      size={22}
                      color={focused ? '#fff' : 'grey'}
                    />
                  </View>
                  {/* <Text
                      style={{
                        color: focused ? '#fff' : 'grey',
                        fontSize: 15,
                        fontWeight: 'bold',
                      }}>
                      {route.title}
                    </Text> */}
                </View>
              );
            }}
            indicatorStyle={{backgroundColor: '#1a1a1a'}}
          />
        )}
      />
    </SafeAreaView>
  );
};
