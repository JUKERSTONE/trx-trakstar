import {View, Text} from 'react-native';
import React from 'react';
import {TRAKWalletTabElement} from '../../elements';
import {useWalletTab} from './useWalletTab';

export const WalletTabContainer = ({
  wallet,
  trak,
  title,
  artist,
  item,
  navigation,
  id,
  ...props
}: any) => {
  const {...useWalletTabProps} = useWalletTab({
    navigation,
    title,
    artist,
    item,
    id,
  });
  return (
    <TRAKWalletTabElement
      wallet={wallet}
      items={trak}
      isExchange
      {...useWalletTabProps}
      {...props}
    />
  );
};
