import React from "react";
import { WalletSendElement } from "../../elements";
import { useWalletSend } from "./useWalletSend";

export const WalletSendContainer = ({ ...props }) => {
  const { ...useWalletSendProps } = useWalletSend();
  return <WalletSendElement {...props} />;
};
