import React from "react";
import { WalletProduceElement } from "../../elements";
import { useWalletProduce } from "./useProduce";

export const WalletProduceContainer = ({ ...props }) => {
  const { ...useWalletReproduceProps } = useWalletProduce();
  return <WalletProduceElement {...useWalletReproduceProps} {...props} />;
};
