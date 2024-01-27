import {View, Text} from 'react-native';
import React from 'react';
import {useBasket} from './useBakset';
import {BasketElement} from '../../elements';

export const BasketContainer = ({...props}: any) => {
  const {...useBasketProps} = useBasket({...props});
  return <BasketElement {...useBasketProps} {...props} />;
};
