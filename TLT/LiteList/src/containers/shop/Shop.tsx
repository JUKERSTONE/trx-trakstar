import React from 'react';
import {View, Text} from 'react-native';
import {ShopElement} from '../../elements';
import {useShop} from './useShop';
import {useSelector} from 'react-redux';

export const ShopContainer = ({navigation, route, ...props}: any) => {
  const {...useShopProps} = useShop({navigation, route});
  return <ShopElement {...useShopProps} {...props} />;
};
