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

export const NFTStatusElement = ({
  item,
  senderKey,
  publicKey,
  handlePurchaseWhitelist,
}: any) => {
  console.log('🚀 ~ file: NFTStatus.tsx ~ line 30 ~ item', item);
  return (
    <View>
      {/*  */}
      {/*  */}
      <Text>ewer</Text>
    </View>
  );
};
