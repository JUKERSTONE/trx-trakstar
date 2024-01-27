import React, {useEffect} from 'react';
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

export const AuctionElement = ({handleStakeTRX, handleInitialBid}: any) => {
  useEffect(() => {
    handleInitialBid(20);
  }, []);
  return (
    <SafeAreaView>
      <Button title="Auction" onPress={handleStakeTRX} />
    </SafeAreaView>
  );
};
