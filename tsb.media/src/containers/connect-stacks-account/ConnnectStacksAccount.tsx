import React from "react";
import { ConnectStacksAccountElement } from "../../elements";
import { useConnectStacksAccount } from "./useConnectStacksAccount";

export const ConnectStacksAccountContainer = () => {
  const { ...useConnectStacksAccountProps } = useConnectStacksAccount();
  return <ConnectStacksAccountElement {...useConnectStacksAccountProps} />;
};
