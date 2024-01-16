import React from 'react';
import {View, Text} from 'react-native';
import {RSSBillboardElement} from '../../elements';
import {useRSSBillboard} from './useRSSBillboard';

export const RSSBillboardContainer = ({navigation, ...props}: any) => {
  const {...usRSSBillboardProps} = useRSSBillboard({navigation, ...props});
  return <RSSBillboardElement {...usRSSBillboardProps} {...props} />;
};
