import React from "react";
import { TransactionClaimWhitelistElement } from "../../elements";
import { useTransactionClaimWhitelist } from "./useTransactionClaimWhitelist";

export const TransactionClaimWhitelistContainer = () => {
  const { ...useTransactProps } = useTransactionClaimWhitelist();
  return <TransactionClaimWhitelistElement {...useTransactProps} />;
};
