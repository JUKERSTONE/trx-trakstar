import React, { useEffect, useState, useContext } from "react";
import {
  makeContractCall,
  broadcastTransaction,
  AnchorMode,
  FungibleConditionCode,
  makeStandardSTXPostCondition,
  UIntCV,
  uintCV,
} from "@stacks/transactions";
import { StacksMainnet } from "@stacks/network";
import axios from "axios";

// @ts-ignore
// import CoinMarketCap from "coinmarketcap-api";

export const useTransactionPurchaseWhitelistTUC = () => {
  // const handleTransact = async () => {
  //   const network = new StacksMainnet();

  //   const contractAddress = "SP26RS42R5ZH10VWWG4HFYPRJRC3JJ3FKWY4V58CW";
  //   const contractName = "TRAKLIST-MARKETPLACE-V2";

  //   // const response = await axios.get(
  //   //   "https://api.coingecko.com/api/v3/simple/price?ids=blockstack%2C%20bitcoin%2C%20cardano%2C%20solana&vs_currencies=gbp",
  //   //   {
  //   //     headers: {
  //   //       "Content-Type": "application/json",
  //   //       // "Access-Control-Allow-Origin": "*",
  //   //       // "X-CMC_PRO_API_KEY": "f1ff99d1-89e5-4de6-8305-ebc6ded39353",
  //   //     },
  //   //     // withCredentials: true,
  //   //   }
  //   // );

  //   // const sxtInGBP = response.data.blockstack.gbp;
  //   // // @ts-ignore
  //   // const tucInGBP = 1 / window.price;

  //   // // @ts-ignore
  //   // const price = sxtInGBP / tucInGBP;

  //   // const client = await new CoinMarketCap(
  //   //   "f1ff99d1-89e5-4de6-8305-ebc6ded39353"
  //   // );
  //   // const response = await client.getQuotes({
  //   //   symbol: ["STX"],
  //   //   convert: "GBP",
  //   // });

  //   // const marketPrice = response.data;
  //   // console.log(
  //   //   "🚀 ~ file: useTransactionPurchaseWhitelist.ts ~ line 31 ~ handleTransact ~ marketPrice",
  //   //   marketPrice
  //   // );

  //   // @ts-ignore
  //   const price: UIntCV = uintCV(window.price * 100);

  //   const postConditionAddress = "SP26RS42R5ZH10VWWG4HFYPRJRC3JJ3FKWY4V58CW";
  //   const postConditionCode = FungibleConditionCode.Equal;
  //   // @ts-ignore
  //   const postConditionAmount = BigInt(window.price * 100);

  //   const standardSTXPostCondition = makeStandardSTXPostCondition(
  //     postConditionAddress,
  //     postConditionCode,
  //     postConditionAmount
  //   );
  //   const txOptions = {
  //     contractAddress,
  //     contractName,
  //     functionName: "user-purchase-whitelist",
  //     functionArgs: [price],
  //     // @ts-ignore
  //     senderKey: window.senderKey,
  //     validateWithAbi: true,
  //     network,
  //     postConditions: [standardSTXPostCondition],
  //     anchorMode: AnchorMode.Any,
  //     fee: 1500n,
  //   };

  //   // const transaction = await makeContractCall(txOptions);

  //   // const broadcastResponse = await broadcastTransaction(transaction, network);
  //   // const txId = broadcastResponse.txid;
  //   // alert(txId);

  //   return makeContractCall(txOptions)
  //     .then(async (transaction) => {
  //       broadcastTransaction(transaction, network)
  //         .then((broadcastResponse) => {
  //           const txId = broadcastResponse.txid;
  //           console.log(
  //             "🚀 ~ file: useTransactionPurchaseWhitelist.ts ~ line 58 ~ .then ~ txId",
  //             txId
  //           );
  //           // @ts-ignore
  //           window.ReactNativeWebView.postMessage(txId);
  //         })
  //         .catch((err) => {
  //           console.log(
  //             "🚀 ~ file: useTransactionPurchaseWhitelist.ts ~ line 63 ~ .then ~ err",
  //             err,
  //             "failed"
  //           );
  //           alert(2);

  //           // @ts-ignore
  //           window.ReactNativeWebView.postMessage("failed");
  //         });
  //     })
  //     .catch((err) => {
  //       console.log(
  //         "🚀 ~ file: useTransactionPurchaseWhitelist.ts ~ line 69 ~ handleTransact ~ err",
  //         err,
  //         "failed2"
  //       );
  //       // @ts-ignore
  //       window.ReactNativeWebView.postMessage(err);
  //     });
  // };
  return {
    // handleTransact,
  };
};
