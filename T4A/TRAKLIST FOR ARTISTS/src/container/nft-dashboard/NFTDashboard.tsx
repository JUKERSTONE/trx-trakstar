import React from 'react';
import {View, Text} from 'react-native';
import {NFTDashboardElement} from '../../elements';
import {useNFTDashboard} from './useNFTDashboard';

export const NFTDashboardContainer = ({navigation, route, ...props}: any) => {
  const {...useNFTDashboardProps} = useNFTDashboard({navigation, route});
  return <NFTDashboardElement {...useNFTDashboardProps} {...props} />;
};
