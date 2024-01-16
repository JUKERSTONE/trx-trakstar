import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  useWindowDimensions,
  ActivityIndicator,
  Dimensions,
  Button,
  SafeAreaView,
} from 'react-native';
import {AlphabetList} from 'react-native-section-alphabet-list';
import {VHeader, Body} from '../typography';
import {TabView, TabBar} from 'react-native-tab-view';
import {NFTWalletTabElement} from '../nft-wallet-tab';
import {TRAKWalletTabElement} from '../trak-wallet-tab';
import {colors} from '../../core';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {WebView} from 'react-native-webview';

export const WalletSetupElement = ({
  handleNewSecretKey,
  handleClaim,
  handleClearKey,
  handleCopyKey,
  secretKey,
}: any) => {
  return (
    <SafeAreaView style={{backgroundColor: '#333333', flex: 1}}>
      {secretKey === null && (
        <View style={{height: 70}}>
          <WebView
            source={{uri: 'http://localhost:3000/walter/stacks'}}
            onMessage={handleNewSecretKey}
            // style={{height: 50}}
          />
        </View>
      )}
      <View style={{flex: 8, justifyContent: 'center'}}>
        {secretKey !== null && (
          <View
            style={{
              backgroundColor: '#1a1a1a',
              margin: 20,
              borderRadius: 6,
              paddingTop: 30,
              paddingBottom: 15,
              paddingHorizontal: 15,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#cecece',
              }}>
              {secretKey}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'space-around',
              }}>
              <Button title="clear" onPress={handleClearKey} />
              <Button title="copy" onPress={handleCopyKey} />
              <Button title="claim" onPress={handleClaim} />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
