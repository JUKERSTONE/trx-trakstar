import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  useWindowDimensions,
  FlatList,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {VHeader, Body, Caption} from '..';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {TabView, TabBar} from 'react-native-tab-view';
import {colors} from '../../core';
import moment from 'moment';
import {WebView} from 'react-native-webview';

export const NFTElement = ({
  item: {status, nft},
  senderKey,
  publicKey,
  handlePurchaseWhitelist,
}: any) => {
  console.log('🚀 ~ file: NFT.tsx ~ line 30 ~ status, nft', status, nft);
  const injectedJavaScript: string = `window.market='stx';
  window.senderKey='${senderKey}';
  window.publicKey='${publicKey}';
  window.transaction='purchase-whitelist'`;

  // with bernard senderKey
  const injectedJavaScript1: string = `window.market='stx';
  window.senderKey='${senderKey}'; 
  window.userAddress='${publicKey}';
  window.nftId='${nft.nftId}';
  window.transaction='claim-whitelist'`;

  const assetName =
    status === 'purchase-whitelist'
      ? nft.trak.artist
      : nft.asset_name.split(' ')[0];

  const injectedJavaScript2: string = `window.assetName='${assetName}';
  window.senderKey='${senderKey}'; 
  window.userAddress='${publicKey}';
  window.nftId='${nft.nftId}';
  window.transaction='claim-nft'`;

  switch (status) {
    case 'purchase-whitelist':
      return (
        <View>
          <View style={{height: 36, width: 229, alignSelf: 'center'}}>
            <WebView
              injectedJavaScript={injectedJavaScript}
              source={{
                uri: 'https://tsb.media/walter/stacks/contract-call/purchase-whitelist/stx',
              }}
              // onMessage={event => alert(JSON.stringify(event))}
              onMessage={event => handlePurchaseWhitelist(event, nft)}
              // handle the event and listen to the mempool
            />
          </View>
        </View>
      );
    case 'claim-whitelist':
      return (
        <View>
          {/*  */}
          {/*  */}
          <View style={{height: 36, width: 229, alignSelf: 'center'}}>
            <WebView
              injectedJavaScript={injectedJavaScript1}
              source={{
                uri: 'https://tsb.media/walter/stacks/contract-call/purchase-whitelist/stx',
              }}
              // onMessage={event => alert(JSON.stringify(event))}
              onMessage={event => handlePurchaseWhitelist(event, nft)}
              // handle the event and listen to the mempool
            />
          </View>
        </View>
      );
    default:
      return (
        <View>
          {/*  */}
          {/*  */}
          <View style={{height: 36, width: 229, alignSelf: 'center'}}>
            <WebView
              injectedJavaScript={injectedJavaScript2}
              source={{
                uri: 'http://tsb.media/walter/stacks/contract-call/purchase-whitelist/stx',
              }}
              // onMessage={event => alert(JSON.stringify(event))}
              onMessage={event => handlePurchaseWhitelist(event, nft)}
              // handle the event and listen to the mempool
            />
          </View>
        </View>
      );
  }
  // return (
  //   <View>
  //     {/*  */}
  //     {/*  */}
  //     <View style={{height: 36, width: 229, alignSelf: 'center'}}>
  //       <WebView
  //         injectedJavaScript={injectedJavaScript}
  //         source={{
  //           uri: 'http://localhost:3000/walter/stacks/contract-call/purchase-whitelist/stx',
  //         }}
  //         // onMessage={event => alert(JSON.stringify(event))}
  //         onMessage={event => handlePurchaseWhitelist(event, nft)}
  //         // handle the event and listen to the mempool
  //       />
  //     </View>
  //   </View>
  // );
};
