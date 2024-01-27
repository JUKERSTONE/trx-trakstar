import React from 'react';
import {View, Text} from 'react-native';
import {useCrypto} from './useSendCrypto';
import {SendCryptoElement} from '../../elements';

export const SendCryptoContainer = ({navigation, route, ...props}: any) => {
  const {...useSendCryptoProps} = useCrypto({navigation, route});
  return <SendCryptoElement {...useSendCryptoProps} {...props} />;
};
