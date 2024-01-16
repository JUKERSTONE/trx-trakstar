import React from 'react';
import {View, Text} from 'react-native';
import {WalletElement} from '../../elements';
import {useWallet} from './useWallet';

export const WalletContainer = ({navigation, route, ...props}: any) => {
  const {...useWalletProps} = useWallet({navigation, route});
  return <WalletElement {...useWalletProps} {...props} />;
};
