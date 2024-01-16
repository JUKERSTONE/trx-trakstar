import React from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import {WalletContainer} from '../containers';

export const WalletScreen = ({...props}) => {
  return <WalletContainer {...props} />;
};
