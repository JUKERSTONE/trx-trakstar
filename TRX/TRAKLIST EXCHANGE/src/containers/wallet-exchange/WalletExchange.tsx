import React from 'react';
import {View, Text} from 'react-native';
import {ExchangeElement} from '../../elements';
import {useExchange} from './useWalletExchange';

export const WalletExchangeContainer = ({
  navigation,
  item,
  title,
  artist,
  id,
  ...props
}: any) => {
  const {...useExchangeProps} = useExchange({navigation, title, artist, id});
  return <ExchangeElement isModal {...useExchangeProps} {...props} />;
};
