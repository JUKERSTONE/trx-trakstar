import React, { useEffect, useState, useContext } from "react";
import {
  generateWallet,
  generateSecretKey,
  getStxAddress,
} from "@stacks/wallet-sdk";
import { TransactionVersion } from "@stacks/transactions";

export const useConnectStacksAccount = () => {
  const [secretKey, setSecretKey] = useState<any>();
  // @ts-ignore
  const handleSecretKey = (e: any) => {
    setSecretKey(e.target.value);
  };

  const handleConnect = () => {
    const password = "password";
    const wallet = generateWallet({
      secretKey,
      password,
    })
      .then((res: any) => {
        const account = res.accounts[0];
        console.log(
          "🚀 ~ file: useTransaction.ts ~ line 24 ~ .then ~ account",
          account
        );
        const mainnetAddress = getStxAddress({
          account,
          transactionVersion: TransactionVersion.Mainnet,
        });

        // @ts-ignore

        // @ts-ignore
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            secret: secretKey,
            private: account.stxPrivateKey,
            public: mainnetAddress,
          })
        );
      })
      .catch((err) => {
        // @ts-ignore
        window.rnWeb("error");
      });
  };

  return {
    handleSecretKey,
    handleConnect,
  };
};
