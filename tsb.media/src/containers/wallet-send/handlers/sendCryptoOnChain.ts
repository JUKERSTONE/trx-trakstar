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
import Button from "@mui/material/Button";
import {
  broadcastTransaction,
  AnchorMode,
  makeSTXTokenTransfer,
} from "@stacks/transactions";
import { api } from "../../../api";

export const sendCryptoOnChain = async () => {
  const nonceRoute = api.stacks({
    method: "nonce",
    // @ts-ignore
    payload: { publicKey: window.recipient },
  });
  const nonceResponse = await axios
    .get(nonceRoute, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    });

  const mempoolRoute = api.stacks({
    method: "mempool",
    // @ts-ignore
    payload: { publicKey: window.recipient },
  });

  const mempoolResponse = await axios
    .get(mempoolRoute, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      // alert(JSON.stringify(response.data.results));
      return response.data.results;
    })
    .catch((err) => {});

  let largestMempoolNonce = nonceResponse.last_executed_tx_nonce ?? 5;
  mempoolResponse.forEach((transaction: any) => {
    if (transaction.nonce > largestMempoolNonce)
      largestMempoolNonce = transaction.nonce;
  });

  const txOptions: any = {
    // @ts-ignore
    recipient: window.recipient,
    // @ts-ignore
    amount,
    // @ts-ignore
    senderKey: window.senderKey,
    network: "mainnet", // for mainnet, use 'mainnet'
    memo: "trx:pay:2374",
    anchorMode: AnchorMode.Any,
    nonce: largestMempoolNonce + 1,
    fee: 1500n,
  };

  alert(largestMempoolNonce + 1);

  const transaction = await makeSTXTokenTransfer(txOptions)
    .then((transaction: any) => {
      // alert(JSON.stringify(transaction));

      return transaction;
    })
    .catch((err) => {
      // alert(JSON.stringify(err));
      alert(JSON.stringify(err + " : OI"));
      // // @ts-ignore
      // window.ReactNativeWebView.postMessage("err");
      // @ts-ignore
      window.rnWeb("err");
      return { success: false };
    });

  // // to see the raw serialized tx
  // const serializedTx = transaction.serialize().toString("hex");

  // broadcasting transaction to the specified network
  const broadcastResponse: any = await broadcastTransaction(transaction)
    .then((broadcastResponse) => {
      return broadcastResponse;
    })
    .catch((err) => {
      // @ts-ignore
      window.rnWeb("err");
      return { success: false };
    });

  const txId = broadcastResponse.txid;
  // @ts-ignore
  window.rnWeb(txId);
  return { success: false };
};
