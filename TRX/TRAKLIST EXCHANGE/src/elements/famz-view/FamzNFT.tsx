import {
  View,
  Text,
  Button,
  FlatList,
  Image,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {VHeader, Body} from '..';
import {WebView} from 'react-native-webview';

export const FamzViewElement = ({
  item,
  handlePurchaseNFT,
  senderKey,
  handlePurchaseWhitelist,
  accessToken,
  publicKey,
  stxBalance,
}: any) => {
  console.log(
    '🚀 ~ file: FamzNFT.tsx ~ line 14 ~ FamzViewElement ~ senderKey',
    senderKey,
  );
  console.log('🚀 ~ file: FamzNFT.tsx ~ line 5 ~ FamzViewElement ~ item', item);
  const hasBTC = item.nft.trakCOPIES?.btc !== 0;
  const hasSTX = item.nft.trakCOPIES?.stx !== 0;
  const hasADA = item.nft.trakCOPIES?.ada !== 0;
  const hasSOL = item.nft.trakCOPIES?.sol !== 0;

  const price = item.nft.trakPRICE.toFixed(2);

  const injectedJavaScript: string = `window.id='${item.nftID}';
  window.market='stx';
  window.nft='${JSON.stringify(item.nft)}';
  window.price='${price}';
  window.senderKey='${senderKey}';
  window.accessToken='${accessToken}';
  window.publicKey='${publicKey}';`;

  return (
    <View>
      {/*  */}
      <View
        style={{
          marginLeft: 20,
          borderBottomWidth: 2,
          borderBottomColor: '#fff',
          alignItems:
            item.nft.trakPRODUCTS.length === 1 ? 'center' : 'flex-start',
        }}>
        <Body numberOfLines={1} type="one" color={'#fff'} text={'PRODUCTS'} />
      </View>

      <FlatList
        horizontal
        listKey="TRAK"
        contentContainerStyle={{
          marginTop: 10,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 20,
          flex: item.nft.trakPRODUCTS.length === 1 ? 1 : 0,
        }}
        data={item.nft.trakPRODUCTS}
        renderItem={({item, index}) => {
          console.log(
            '🚀 ~ file: FamzNFT.tsx ~ line 45 ~ FamzViewElement ~ item',
            item.image,
          );

          return (
            <ImageBackground
              source={{uri: item.image}}
              style={{
                backgroundColor: '#1B4F26',
                height: 250,
                width: 250,
                borderRadius: 5,
                alignSelf: 'center',
                marginLeft: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#1a1a1a',
                  width: '100%',
                  position: 'absolute',
                  padding: 4,
                  bottom: 0,
                  opacity: 0.7,
                  justifyContent: 'center',
                  borderBottomRightRadius: 5,
                }}>
                <Body
                  numberOfLines={1}
                  type="one"
                  color={'#fff'}
                  text={item.title.toUpperCase()}
                />
              </View>
            </ImageBackground>
          );
        }}
        keyExtractor={(item, index) => '' + index}
      />
      <View
        style={{
          backgroundColor: '#fff',
          margin: 10,
          borderRadius: 10,
        }}>
        {/*  */}
        <View style={{height: 70}}>
          <WebView
            injectedJavaScript={injectedJavaScript}
            source={{
              uri: 'http://localhost:3000/walter/stacks/contract-call/purchase-whitelist/tuc',
            }}
            onMessage={event =>
              handlePurchaseWhitelist({
                event,
                nft: item.nft,
                quantity: 1,
                id: item.nftID,
                market: 'stx',
              })
            }
            // style={{height: 50}}
          />
        </View>
        {hasBTC && (
          <Button
            title="PURCHASE BTC"
            onPress={() =>
              handlePurchaseNFT({
                nft: item.nft,
                quantity: 1,
                id: item.nftID,
                market: 'btc',
              })
            }
          />
        )}
        {hasSTX && (
          // <Button
          //   title="PURCHASE STX"
          //   onPress={() =>
          //     handlePurchaseNFT({
          //       nft: item.nft,
          //       quantity: 1,
          //       id: item.nftID,
          //       market: 'stx',
          //     })
          //   }
          // />
          <View style={{height: 70}}>
            <WebView
              injectedJavaScript={injectedJavaScript}
              source={{
                uri: 'http://localhost:3000/walter/stacks/contract-call/purchase-whitelist/stx',
              }}
              onMessage={event =>
                handlePurchaseWhitelist({
                  event,
                  nft: item.nft,
                  quantity: 1,
                  id: item.nftID,
                  market: 'stx',
                })
              }
              // style={{height: 50}}
            />
          </View>
        )}
        {hasADA && (
          <Button
            title="PURCHASE ADA"
            onPress={() =>
              handlePurchaseNFT({
                nft: item.nft,
                quantity: 1,
                id: item.nftID,
                market: 'ada',
              })
            }
          />
        )}
        {hasSOL && (
          <Button
            title="PURCHASE SOL"
            onPress={() =>
              handlePurchaseNFT({
                nft: item.nft,
                quantity: 1,
                id: item.nftID,
                market: 'ada',
              })
            }
          />
        )}
      </View>
    </View>
  );
};
