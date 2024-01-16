import React, { useEffect, useState, useContext } from "react";
import {
  generateWallet,
  generateSecretKey,
  getStxAddress,
} from "@stacks/wallet-sdk";
import { TransactionVersion } from "@stacks/transactions";

import Button from "@mui/material/Button";
import {
  broadcastTransaction,
  AnchorMode,
  makeSTXTokenTransfer,
} from "@stacks/transactions";
import { api } from "../../api";
import { StacksTestnet, StacksMainnet } from "@stacks/network";
import axios from "axios";

export const useTransactionSTX = () => {
  const [amount, setAmount] = useState<any>(null);

  // useEffect(() => {
  //   // @ts-ignore
  //   alert(window.recipient + " : tsb.media");
  // }, []);

  const handleSTXTransaction = async () => {
    // alert(amount);

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
        return;
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
        return;
      });

    const txId = broadcastResponse.txid;
    // @ts-ignore
    window.rnWeb(txId);
  };

  const handleAmount = (event: any) => {
    event.preventDefault();
    setAmount(BigInt(event.target.value));
  };

  return {
    handleSTXTransaction,
    handleAmount,
  };
};
