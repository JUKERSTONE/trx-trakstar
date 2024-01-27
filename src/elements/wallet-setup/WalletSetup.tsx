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
import LottieView from 'lottie-react-native';

export const WalletSetupElement = ({
  handleNewSecretKey,
  handleClaim,
  handleClearKey,
  handleCopyKey,
  secretKey,
}: any) => {
  return (
    <SafeAreaView style={{backgroundColor: '#333333', flex: 1}}>
      <LottieView
        source={require('../../core/102720-cryptocurrency-bitcoin-working-loop.json')}
        autoPlay
        loop
      />
      <View
        style={{
          // backgroundColor: 'red',
          height: 250,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 30,
        }}>
        <VHeader
          numberOfLines={1}
          type="four"
          color={'#fff'}
          text={'Sit tight..'}
        />
        <VHeader
          numberOfLines={1}
          type="four"
          color={'#fff'}
          text={'TRAKSTAR is securing your crypto keys with Apple, inc'}
        />
      </View>
    </SafeAreaView>
  );
};
