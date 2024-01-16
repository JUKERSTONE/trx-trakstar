import React from 'react';
import {View, Text} from 'react-native';
import {NFTRequestsElement} from '../../elements';
import {useNFTRequests} from './useNFTRequests';

export const NFTRequestsContainer = ({navigation, ...props}: any) => {
  const {...useNFTRequestsProps} = useNFTRequests({navigation});
  return <NFTRequestsElement {...useNFTRequestsProps} {...props} />;
};
