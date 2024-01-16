import React from 'react';
import {View, Text, Button} from 'react-native';
import {WebView} from 'react-native-webview';

export const WalletConnectElement = ({handleConnect}: any) => {
  return (
    <View style={{flex: 1, width: '100%'}}>
      <Text style={{color: '#fff'}}>WEBVIEW</Text>
      <WebView
        source={{uri: 'http://localhost:3000/walter/stacks/connect'}}
        onMessage={handleConnect}
        injectedJavaScript="window.rnWeb = (testnetAddress) => {
        window.ReactNativeWebView.postMessage(testnetAddress);
      };"
      />
    </View>
  );
};
