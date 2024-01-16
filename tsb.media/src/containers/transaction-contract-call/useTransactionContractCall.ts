import React, { useEffect, useState, useContext } from "react";
import {
  generateWallet,
  generateSecretKey,
  getStxAddress,
} from "@stacks/wallet-sdk";
import { TransactionVersion } from "@stacks/transactions";

import Button from "@mui/material/Button";
import {
  createStacksPrivateKey,
  makeRandomPrivKey,
  getPublicKey,
  makeContractCall,
  broadcastTransaction,
  AnchorMode,
  FungibleConditionCode,
  NonFungibleConditionCode,
  makeStandardSTXPostCondition,
  makeStandardNonFungiblePostCondition,
  bufferCVFromString,
  makeContractNonFungiblePostCondition,
  createAssetInfo,
} from "@stacks/transactions";
import { StacksTestnet, StacksMainnet } from "@stacks/network";

export const useTransactionContractCall = () => {
  const handleTransact = async () => {
    const network = new StacksTestnet();

    // With a contract principal

    //  @ts-ignore
    const contractAddress = window.contractAddress;
    //  @ts-ignore
    const contractName = window.contractName;
    const postConditionCode = NonFungibleConditionCode.Owns;
    const assetAddress = contractAddress; // is there a difference between the two?
    const assetContractName = contractName; // is there a difference between the two?
    //  @ts-ignore
    const assetName = window.assetName;
    const tokenAssetName = bufferCVFromString(assetName); // is there a difference between the two?

    const nonFungibleAssetInfo = createAssetInfo(
      assetAddress,
      assetContractName,
      assetName
    );

    const contractNonFungiblePostCondition =
      makeContractNonFungiblePostCondition(
        contractAddress,
        contractName,
        postConditionCode,
        nonFungibleAssetInfo,
        tokenAssetName
      );

    const txOptions = {
      contractAddress,
      contractName,
      //  @ts-ignore
      functionName: window.functionName,
      functionArgs: [],
      //  @ts-ignore
      senderKey: window.senderKey,
      validateWithAbi: true,
      network,
      postConditions: [contractNonFungiblePostCondition],
      anchorMode: AnchorMode.Any,
    };

    makeContractCall(txOptions)
      .then(async (transaction) => {
        broadcastTransaction(transaction, network)
          .then((broadcastResponse) => {
            const txId = broadcastResponse.txid;
            // @ts-ignore
            window.ReactNativeWebView.postMessage(txId);
          })
          .catch((err) => {
            // @ts-ignore
            window.ReactNativeWebView.postMessage("failed");
          });
      })
      .catch((err) => {
        // @ts-ignore
        window.ReactNativeWebView.postMessage(err);
      });
  };
  return {
    handleTransact,
  };
};
