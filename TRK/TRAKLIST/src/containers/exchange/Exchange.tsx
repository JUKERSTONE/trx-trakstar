import React from 'react';
import {View, Text} from 'react-native';
import {ExchangeElement} from '../../elements';
import {useExchange} from './useExchange';

export const ExchangeContainer = ({navigation, ...props}: any) => {
  const {...useExchangeProps} = useExchange({navigation});
  return <ExchangeElement {...useExchangeProps} {...props} />;
};
