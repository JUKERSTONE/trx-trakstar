import React from "react";
import { TransactionContractCallElement } from "../../elements";
import { useTransactionContractCall } from "./useTransactionContractCall";

export const TransactionContractCallContainer = () => {
  const { ...useTransactProps } = useTransactionContractCall();
  return <TransactionContractCallElement {...useTransactProps} />;
};
