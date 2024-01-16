import React from "react";
import { NetworkWalletElement } from "../../elements";
import { useCreateNetworkWallet } from "./useCreateNetworkWallet";

export const NetworkWalletContainer = ({ ...props }) => {
  const { ...useNetworkWalletProps } = useCreateNetworkWallet();
  return <NetworkWalletElement {...props} />;
};
