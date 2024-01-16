import React from "react";
import { TransactionPurchaseWhitelistTUCElement } from "../../elements";
import { useTransactionPurchaseWhitelistTUC } from "./useTransactionPurchaseWhitelistTUC";

export const TransactionPurchaseWhitelistTUCContainer = () => {
  const { ...useTransactProps } = useTransactionPurchaseWhitelistTUC();
  return <TransactionPurchaseWhitelistTUCElement {...useTransactProps} />;
};
