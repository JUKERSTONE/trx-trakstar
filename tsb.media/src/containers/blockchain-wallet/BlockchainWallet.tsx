import React from "react";
import { BlockchainWalletElement } from "../../elements";
import { useCreateBlockchainWallet } from "./useCreateBlockchainWallet";

export const BlockchainWalletContainer = ({ ...props }) => {
  const { ...useBlockchainWalletProps } = useCreateBlockchainWallet();
  return <BlockchainWalletElement {...props} />;
};
