import React from 'react';
import {View, Text} from 'react-native';
import {AuctionElement} from '../../elements';
import {useAuction} from './useAuction';

export const AuctionContainer = ({
  navigation,
  route,
  handleStakeTRX,
  handleInitialBid,
  ...props
}: any) => {
  // console.log('🚀 ~ file: WalletConnect.tsx ~ line 14 ~ user', user._user.uid);
  const {...useAuctionProps} = useAuction({
    navigation,
    route,
  });
  return (
    <AuctionElement
      handleStakeTRX={handleStakeTRX}
      handleInitialBid={handleInitialBid}
      {...useAuctionProps}
      {...props}
    />
  );
};
