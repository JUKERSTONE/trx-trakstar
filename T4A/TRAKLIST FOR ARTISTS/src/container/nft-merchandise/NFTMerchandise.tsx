import React from 'react';
import {View, Text} from 'react-native';
import {NFTMerchandiseElement} from '../../elements';
import {useNFTMerchandise} from './useNFTMerchandise';

export const NFTMerchandiseContainer = ({navigation, route, ...props}: any) => {
  console.log(
    '🚀 ~ file: NFTMerchandise.tsx ~ line 7 ~ NFTMerchandiseContainer ~ route',
    route,
  );
  const {...useNFTMerchandiseProps} = useNFTMerchandise({navigation, route});
  return <NFTMerchandiseElement {...useNFTMerchandiseProps} {...props} />;
};
