import React, {useEffect, useRef, useState} from 'react';
import {
  TextInput,
  SafeAreaView,
  ImageBackground,
  FlatList,
  Keyboard,
  Button,
  Image,
  Alert,
} from 'react-native';
// @ts-ignore
import {TrendingCard} from '../trending-card/TrendingCard';
import {View, Text, TouchableOpacity} from 'react-native';
import {VHeader, Body, Caption, BHeader} from '../typography';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {Picker} from '@react-native-picker/picker';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import {WebView} from 'react-native-webview';

export const SendCryptoElement = ({
  currency,
  selectedValue,
  setSelectedValue,
  options,
  isVisible,
  handleChooseRecipient,
  handleSelectReceipient,
  handleCancel,
  recipient,
  handleSubmitTransaction,
  senderKey,
  publicKey,
  handleTransaction,
  ...props
}: any) => {
  // const keyboard = useRef(null);

  // useEffect(() => {
  //   keyboard.current.focus();
  // }, []);
  // alert(recipient.key + ' : trx');

  const injectedJavaScript: string = `window.rnWeb = (testnetAddress) => {
    window.ReactNativeWebView.postMessage(testnetAddress);
  };window.recipient='${recipient.key}';
  window.senderKey='${senderKey}';`;

  return (
    <TouchableOpacity
      style={{backgroundColor: '#1a1a1a', flex: 1}}
      onPress={() => Keyboard.dismiss()}>
      <View
        style={{
          flex: 1,
        }}>
        {/* <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TextInput
            ref={keyboard}
            style={{
              padding: 20,
              borderRadius: 10,
              color: '#fff',
              fontWeight: 'bold',
              marginHorizontal: 10,
            }}
            onChangeText={(text: any) => setAmount(text)}
            placeholder="AMOUNT"
            placeholderTextColor={'#cececece'}
            keyboardType="numeric"
          />
          <Picker
            itemStyle={{height: 37, fontSize: 10}}
            style={{
              backgroundColor: '#fff',
              borderRadius: 5,
              width: 100,
              marginHorizontal: 10,
            }}
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }>
            {currency.map((item: any) => {
              return <Picker.Item label={item.label} value={item.value} />;
            })}
          </Picker>
        </View> */}
        {recipient.key && (
          <View style={{height: 300}}>
            <WebView
              injectedJavaScript={injectedJavaScript}
              // source={{uri: 'https://tsb.media/walter/stacks/transaction/stx'}}
              source={{
                uri: 'https://tsb.media/walter/stacks/transaction/stx',
              }}
              onMessage={handleTransaction}
              // style={{height: 50}}
            />
          </View>
        )}
        {/* {recipient.key && (
          <Button title={'send'} onPress={() => handleSubmitTransaction()} />
        )} */}
        <Button
          title={recipient.key ? 'Change recipient' : 'Choose recipent'}
          onPress={() => handleChooseRecipient()}
        />
        <View style={{alignItems: 'center'}}>
          <Text style={{color: 'white'}}>{recipient.label}</Text>
          <Text style={{color: 'white'}}>{recipient.key}</Text>
        </View>
        <ModalFilterPicker
          visible={isVisible}
          onSelect={handleSelectReceipient}
          onCancel={handleCancel}
          options={options}
        />
      </View>
      <View style={{backgroundColor: '#1a1a1a', flex: 1}}></View>
    </TouchableOpacity>
  );
};
