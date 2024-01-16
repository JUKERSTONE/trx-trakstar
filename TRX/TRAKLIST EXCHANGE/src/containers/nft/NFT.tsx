import {View, Text} from 'react-native';
import React from 'react';
import {useNFT} from './useNFT';
import {NFTElement} from '../../elements';

export const NFTContainer = ({navigation, route, ...props}: any) => {
  const {...useNFTProps} = useNFT({navigation, route});
  return <NFTElement {...useNFTProps} {...props} />;
};
