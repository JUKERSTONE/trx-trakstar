import React from "react";
import { WalletReproduceElement } from "../../elements";
import { useWalletReproduceBTC } from "./useReproduceBTC";

export const WalletReproduceBTCContainer = ({ ...props }) => {
  const { ...useWalletReproduceProps } = useWalletReproduceBTC();
  return <WalletReproduceElement {...useWalletReproduceProps} {...props} />;
};
