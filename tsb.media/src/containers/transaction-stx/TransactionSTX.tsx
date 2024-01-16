import React from "react";
import { TransactionSTXElement } from "../../elements";
import { useTransactionSTX } from "./useTransactionSTX";

export const TransactionSTXContainer = () => {
  const { ...useTransactProps } = useTransactionSTX();
  return <TransactionSTXElement {...useTransactProps} />;
};
