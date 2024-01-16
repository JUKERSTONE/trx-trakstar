import {View, Text} from 'react-native';
import React from 'react';
import {NFTProductContainer} from '../container';

export const NFTProductScreen = ({...props}) => {
  console.log(
    '🚀 ~ file: NFTProduct.tsx ~ line 5 ~ NFTProductScreen ~ props',
    props,
  );
  return <NFTProductContainer {...props} />;
};
