import React from "react";
import { TransactionContractCallTRXElement } from "../../elements";
import { useTransactionContractCallTRX } from "./useTransactionContractCallTRX";

export const TransactionContractCallTRXContainer = () => {
  const { ...useTransactProps } = useTransactionContractCallTRX();
  return <TransactionContractCallTRXElement {...useTransactProps} />;
};
