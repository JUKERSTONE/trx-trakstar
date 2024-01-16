import React from "react";
import { BlockchainWalletElement } from "../../elements";
import { useCreateBlockchainWallet } from "./useBlockchainListen";

export const BlockchainListenerContainer = ({ ...props }) => {
  const { ...useBlockchainWalletProps } = useCreateBlockchainWallet();
  return <BlockchainWalletElement {...props} />;
};
