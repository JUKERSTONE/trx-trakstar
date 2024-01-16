import React from 'react';
import {View, Text} from 'react-native';
import {WalletConnectElement} from '../../elements';
import {useWalletConnect} from './useWalletConnect';

export const WalletConnectContainer = ({navigation, ...props}: any) => {
  console.log(
    '🚀 ~ file: WalletConnect.tsx ~ line 7 ~ WalletConnectContainer ~ navigation',
    navigation,
  );
  const {...useWalletConnectProps} = useWalletConnect({navigation});
  return <WalletConnectElement {...useWalletConnectProps} {...props} />;
};
