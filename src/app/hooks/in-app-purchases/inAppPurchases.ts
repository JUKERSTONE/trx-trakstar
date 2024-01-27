import {View, Text, Platform} from 'react-native';
import React from 'react';
// @ts-ignore
import {getColorFromURL} from 'rn-dominant-color';
import {initConnection, getSubscriptions} from 'react-native-iap';
import {store, setSubscriptions} from '../../../stores';
const items: any = Platform.select({
  ios: ['trx_musichead', 'trx_pro', 'trx_basic'],
  android: [''],
});

export const handleInAppPurchases = async () => {
  // Purchases.setDebugLogsEnabled(true);
  // if (Platform.OS === 'ios') {
  // } else if (Platform.OS === 'android') {
  //   await Purchases.setup('public_google_sdk_key');
  // OR: if building for Amazon, be sure to follow the installation instructions then:
  // await Purchases.setup({apiKey: 'public_amazon_sdk_key', useAmazon: true});
  // }
  // await Purchases.setup('appl_pepUHYcBPwCrCbAvwzPqCWBjJTA')
  //   .then((res: any) => {
  //     console.log('🚀 ~ file: inAppPurchases.ts ~ line 23 ~ .then ~ res', res);
  //   })
  //   .catch((err: any) => {
  //     console.log(
  //       '🚀 ~ file: inAppPurchases.ts ~ line 26 ~ handleInAppPurchases ~ err',
  //       err,
  //     );
  //     //
  //     //
  //   });
};
