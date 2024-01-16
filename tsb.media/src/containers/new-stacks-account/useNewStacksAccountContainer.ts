import React, { useEffect, useState, useContext } from "react";
import { StacksMainnet, StacksMocknet } from "@stacks/network";
import {
  generateWallet,
  generateSecretKey,
  generateNewAccount,
  restoreWalletAccounts,
  getStxAddress,
} from "@stacks/wallet-sdk";
import { TransactionVersion } from "@stacks/transactions";
import axios from "axios";

export const useNewStacksAccount = () => {
  // useEffect(() => {
  //   handleStacksProfile();
  // }, []);

  const handleStacksProfile = async () => {
    const password = "password";
    const secretKey = generateSecretKey(128);

    const wallet = await generateWallet({
      secretKey,
      password,
    });

    const restoredWallet = await restoreWalletAccounts({
      // `baseWallet` is returned from `generateWallet`
      wallet,
      gaiaHubUrl: "https://hub.blockstack.org",
      network: new StacksMainnet(),
    });

    const account = restoredWallet.accounts[0];

    const mainnetAddress = getStxAddress({
      account,
      transactionVersion: TransactionVersion.Mainnet,
    });

    const keys = {
      secret: secretKey,
      private: account.stxPrivateKey,
      public: mainnetAddress,
    };
    console.log(
      "🚀 ~ file: useStacksPortal.ts ~ line 55 ~ handleStacksProfile ~ keys",
      keys
    );
    // @ts-ignore
    window.ReactNativeWebView.postMessage(JSON.stringify(keys));

    // const mainnetAddress = getStxAddress({
    //   account,
    //   transactionVersion: TransactionVersion.Mainnet,
    // });
  };

  return {
    handleStacksProfile,
  };
};
