import React from 'react';
import {View, Text} from 'react-native';
import {RedeemElement} from '../../elements';
import {useRedeem} from './useRedeem';

export const RedeemContainer = ({navigation, route, ...props}: any) => {
  console.log(
    '🚀 ~ file: Redeem.tsx ~ line 7 ~ RedeemContainer ~ route',
    route,
  );
  const {...useRedeemProps} = useRedeem({navigation, route});
  return <RedeemElement {...useRedeemProps} {...props} />;
};
