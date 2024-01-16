import React from 'react';
import {View, Text} from 'react-native';
import {MerchandiseShopElement} from '../../elements';
import {useMerchandiseShop} from './useMerchandiseShop';

export const MerchandiseShopContainer = ({
  navigation,
  route,
  ...props
}: any) => {
  const {...useMerchandiseProps} = useMerchandiseShop({navigation, route});
  return <MerchandiseShopElement {...useMerchandiseProps} {...props} />;
};
