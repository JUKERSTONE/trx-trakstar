import {View, Text} from 'react-native';
import React from 'react';
import {useNFTStatus} from './useNFTStatus';
import {NFTStatusElement} from '../../elements';

export const NFTStatusContainer = ({navigation, route, ...props}: any) => {
  const {...useNFTProps} = useNFTStatus({
    navigation,
    route,
    transaction: props.item,
  });
  return <NFTStatusElement {...useNFTProps} {...props} />;
};
