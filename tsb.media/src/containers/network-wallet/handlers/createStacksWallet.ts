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

export const createStacksWallet = async () => {
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
    privateKey: account.stxPrivateKey,
    publicKey: mainnetAddress,
  };
  console.log(
    "🚀 ~ file: useStacksPortal.ts ~ line 55 ~ handleStacksProfile ~ keys",
    keys
  );

  // @ts-ignore
  return keys;
};
