import React from 'react';
import {View, Text} from 'react-native';
import {WalletConnectElement} from '../../elements';
import {useWalletConnect} from './useWalletConnect';

export const WalletConnectContainer = ({
  navigation,
  route,
  isCryptoWall,
  handleClaimSecretKey,
  user,
  ...props
}: any) => {
  // console.log('🚀 ~ file: WalletConnect.tsx ~ line 14 ~ user', user._user.uid);
  const {...useWalletConnectProps} = useWalletConnect({
    navigation,
    route,
    isCryptoWall,
    handleClaimSecretKey,
    user,
  });
  return <WalletConnectElement {...useWalletConnectProps} {...props} />;
};
