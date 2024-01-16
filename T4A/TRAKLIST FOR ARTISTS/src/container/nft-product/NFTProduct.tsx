import React from 'react';
import {View, Text} from 'react-native';
import {NFTProductElement} from '../../elements';
import {useNFTProduct} from './useNFTProduct';

export const NFTProductContainer = ({navigation, route, ...props}: any) => {
  const {...useNFTProductProps} = useNFTProduct({navigation, route});
  return <NFTProductElement {...useNFTProductProps} {...props} />;
};
