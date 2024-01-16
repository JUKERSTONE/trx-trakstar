import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  Alert,
  TextInput,
  Button,
} from 'react-native';
import {styles} from './styles';
import {store, depositMoney} from '../../stores';
import {WebView} from 'react-native-webview';
import {useAPI, api} from '../../api';
import {useTRAKLISTState} from '../../';

const {handleGetState} = useTRAKLISTState();

const keys = handleGetState({index: 'keys'});
const accessToken = keys.trx.accessToken;

export const ForchainView = ({state}: any) => {
  const {usePOST} = useAPI();
  const handleConnect = (event: any) => {
    console.log(event.nativeEvent.data);
    const publicKey = event.nativeEvent.data;
    console.log(
      '🚀 ~ file: ForchainView.tsx ~ line 18 ~ handleConnect ~ publicKey',
      publicKey,
    );

    const route: any = api.walter({
      method: 'connect_forchain',
    });
    console.log(
      '🚀 ~ file: ForchainView.tsx ~ line 35 ~ handleConnect ~ route',
      route,
    );
    // console.log(
    //   '🚀 ~ file: ForchainView.tsx ~ line 34 ~ handleConnect ~ route',
    //   route,
    // );

    const payload = {
      publicKey: 'ST2X1BFRET1W8X0S8JAER85RZ7F145JZ4XCDEZ588',
    };

    const response = usePOST({route, payload, token: accessToken});
    console.log(
      '🚀 ~ file: ForchainView.tsx ~ line 49 ~ handleConnect ~ response',
      response,
    );

    // send to walter
  };

  return (
    <View style={{flex: 1, width: '100%'}}>
      <Text style={{color: '#fff'}}>WEBVIEW</Text>
      <WebView
        source={{uri: 'http://localhost:3000/connect'}}
        onMessage={handleConnect}
        injectedJavaScript="window.rnWeb = (testnetAddress) => {
          window.ReactNativeWebView.postMessage(testnetAddress);
        };"
      />
    </View>
  );
};
