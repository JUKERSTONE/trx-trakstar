import React from 'react';
import {View, Text} from 'react-native';
import {RecordsShopElement} from '../../elements';
import {useRecordsShop} from './useRecordsShop';

export const RecordsShopContainer = ({navigation, route, ...props}: any) => {
  const {...useRecordsProps} = useRecordsShop({navigation, route});
  return <RecordsShopElement {...useRecordsProps} {...props} />;
};
