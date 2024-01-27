import React from 'react';
import {View, Text} from 'react-native';
import {WalletSetupElement} from '../../elements';
import {useWalletSetup} from './useWalletSetup';

export const WalletSetupContainer = ({navigation, route, ...props}: any) => {
  const {...useWalletSetupProps} = useWalletSetup({navigation, route});
  return <WalletSetupElement {...useWalletSetupProps} {...props} />;
};
