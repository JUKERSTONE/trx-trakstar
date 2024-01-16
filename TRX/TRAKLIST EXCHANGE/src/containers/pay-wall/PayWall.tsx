import React from 'react';
import {View, Text} from 'react-native';
import {PayWallElement} from '../../elements';
import {usePayWall} from './usePayWall';

export const PayWallContainer = ({navigation, route, ...props}: any) => {
  const {...usePayWallProps} = usePayWall({navigation, route});
  return <PayWallElement {...usePayWallProps} {...props} />;
};
