import {View, Text} from 'react-native';
import React from 'react';
import {useCheckout} from './useCheckout';
import {CheckoutElement} from '../../elements';

export const CheckoutContainer = ({...props}: any) => {
  const {...useCheckoutProps} = useCheckout({...props});
  return <CheckoutElement {...useCheckoutProps} {...props} />;
};
