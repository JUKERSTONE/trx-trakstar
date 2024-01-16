import React from "react";
import { WalletReproduceElement } from "../../elements";
import { useWalletReproduce } from "./useReproduce";

export const WalletReproduceContainer = ({ ...props }) => {
  const { ...useWalletReproduceProps } = useWalletReproduce();
  return <WalletReproduceElement {...useWalletReproduceProps} {...props} />;
};
