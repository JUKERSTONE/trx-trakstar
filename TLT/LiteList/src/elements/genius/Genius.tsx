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

export const GeniusElement = ({url}: any) => {
  return (
    <SafeAreaView style={{backgroundColor: '#333333', flex: 1}}>
      <WebView
        source={{uri: url}}
        // onMessage={(event: any) => handleRestoreProfile(event)}
        style={{flex: 1, backgroundColor: '#1a1a1a'}}
      />
    </SafeAreaView>
  );
};
