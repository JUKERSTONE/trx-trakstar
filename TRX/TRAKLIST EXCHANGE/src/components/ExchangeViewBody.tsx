import {View, Text, Alert} from 'react-native';
import React from 'react';
import {
  FamzViewContainer,
  WalletExchangeContainer,
  WalletTabContainer,
} from '../containers';

export const ExchangeViewBodyComponent = ({
  mode,
  isNFT,
  wallet,
  trak,
  item,
  title,
  artist,
  id,
  ...props
}: any) => {
  console.log('🚀 ~ file: ExchangeViewBody.tsx ~ line 20 ~ trak', trak);
  switch (mode) {
    case 'exchange':
      switch (isNFT) {
        case false:
          return (
            <WalletTabContainer
              wallet={wallet}
              trak={trak}
              title={title}
              artist={artist}
              item={item}
              id={id}
              {...props}
            />
          );
        case true:
          return <FamzViewContainer item={item} {...props} />;
      }
    case 'wallet':
      return (
        <WalletExchangeContainer
          item={item}
          title={title}
          artist={artist}
          id={id}
          {...props}
        />
      );
    default:
      return <View />;
  }
};
