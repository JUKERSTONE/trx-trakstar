import React from 'react';
import {View, Text} from 'react-native';
import {VerifyNFTElement} from '../../elements';
import {useVerifyNFT} from './useVerifyNFT';

export const VerifyNFTContainer = ({navigation, route, ...props}: any) => {
  const {...useVerifyNFTProps} = useVerifyNFT({navigation, route});
  return <VerifyNFTElement {...useVerifyNFTProps} {...props} />;
};
