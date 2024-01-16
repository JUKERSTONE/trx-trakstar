import React from "react";
import { TransactionPurchaseWhitelistSTXElement } from "../../elements";
import { useTransactionPurchaseWhitelistSTX } from "./useTransactionPurchaseWhitelist";

export const TransactionPurchaseWhitelistSTXContainer = () => {
  const { ...useTransactProps } = useTransactionPurchaseWhitelistSTX();
  return <TransactionPurchaseWhitelistSTXElement {...useTransactProps} />;
};
