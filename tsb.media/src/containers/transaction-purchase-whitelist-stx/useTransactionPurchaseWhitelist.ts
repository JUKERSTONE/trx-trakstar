import React, { useEffect, useState, useContext } from "react";
import {
  makeContractCall,
  broadcastTransaction,
  AnchorMode,
  FungibleConditionCode,
  makeStandardSTXPostCondition,
  UIntCV,
  uintCV,
  stringAsciiCV,
  StringAsciiCV,
  standardPrincipalCV,
  NonFungibleConditionCode,
  TransactionVersion,
  createStacksPrivateKey,
  makeRandomPrivKey,
  getPublicKey,
  makeStandardNonFungiblePostCondition,
  bufferCVFromString,
  makeContractNonFungiblePostCondition,
  createAssetInfo,
} from "@stacks/transactions";
import { StacksMainnet } from "@stacks/network";
import {
  generateWallet,
  generateSecretKey,
  generateNewAccount,
  restoreWalletAccounts,
  getStxAddress,
} from "@stacks/wallet-sdk";
import axios from "axios";
import { api } from "../../api";

export const useTransactionPurchaseWhitelistSTX = () => {
  const [transaction, setTransaction] = useState("claim-nft");

  // useEffect(() => {
  //   // @ts-ignore
  //   const transaction = window.transaction;
  //   setTransaction(transaction);

  //   // handleTest();
  // }, []);

  // const handleTest = async () => {
  //   const password = "password";
  //   const secretKey =
  //     "craft will spend casino bind tower beauty trash trust check surprise speed";

  //   const wallet = await generateWallet({
  //     secretKey,
  //     password,
  //   });

  //   const senderKey = wallet.accounts[0].stxPrivateKey;

  //   const restoredWallet = await restoreWalletAccounts({
  //     // `baseWallet` is returned from `generateWallet`
  //     wallet,
  //     gaiaHubUrl: "https://hub.blockstack.org",
  //     network: new StacksMainnet(),
  //   });

  //   const account = restoredWallet;

  //   const WALT3R = account.accounts.find(
  //     (account) => account.username === "walt3r.btc"
  //   );
  // };

  const handleTransact = async () => {
    const network = new StacksMainnet();

    const contractAddress = "SP26RS42R5ZH10VWWG4HFYPRJRC3JJ3FKWY4V58CW";
    const contractName = "TRAKLIST-MARKETPLACE-V5";

    switch (transaction) {
      case "purchase-whitelist":
        const coingeckoRoute = api.coingecko({ method: "value" });
        const coingeckoResponse = await axios.get(coingeckoRoute, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const nonceRoute = api.stacks({
          method: "nonce",
          // @ts-ignore
          payload: { publicKey: window.publicKey },
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
          payload: { publicKey: window.publicKey },
        });
        const mempoolResponse = await axios
          .get(mempoolRoute, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            return response.data.results;
          });

        let largestMempoolNonce = nonceResponse.last_executed_tx_nonce;
        mempoolResponse.forEach((transaction: any) => {
          if (transaction.nonce > largestMempoolNonce)
            largestMempoolNonce = transaction.nonce;
        });

        const sxtInGBP = coingeckoResponse.data.blockstack.gbp;

        // @ts-ignore
        const priceInSTX = 1 / sxtInGBP;

        const stxNotation = Math.floor(priceInSTX * Math.pow(10, 6) * 0.1);

        // @ts-ignore
        const price: UIntCV = uintCV(stxNotation);

        // @ts-ignore
        const postConditionAddress = window.publicKey;
        const postConditionCode = FungibleConditionCode.Equal;
        // @ts-ignore - DREAM TEAM
        // -- const postConditionAmount = BigInt(stxNotation);

        // -- const standardSTXPostCondition = makeStandardSTXPostCondition(
        //   -- postConditionAddress,
        //   -- postConditionCode,
        //   -- postConditionAmount
        // );
        const txOptions = {
          contractAddress,
          contractName,
          functionName: "user-purchase-whitelist",
          functionArgs: [price],
          // @ts-ignore
          senderKey: window.senderKey,
          validateWithAbi: true,
          network,
          // -- postConditions: [standardSTXPostCondition],
          anchorMode: AnchorMode.Any,
          fee: 1500n,
          nonce: largestMempoolNonce + 1,
        };

        return makeContractCall(txOptions)
          .then(async (transaction) => {
            broadcastTransaction(transaction, network)
              .then((broadcastResponse) => {
                const txId = broadcastResponse.txid;

                // @ts-ignore
                window.ReactNativeWebView.postMessage(
                  `purchase-whitelist:${txId}`
                );
              })
              .catch((err) => {
                console.log(
                  "🚀 ~ file: useTransactionPurchaseWhitelist.ts ~ line 63 ~ .then ~ err",
                  err,
                  "failed"
                );

                alert(JSON.stringify(err));

                // @ts-ignore
                window.ReactNativeWebView.postMessage("failed");
              });
          })
          .catch((err) => {
            console.log(
              "🚀 ~ file: useTransactionPurchaseWhitelist.ts ~ line 69 ~ handleTransact ~ err",
              err,
              "failed2"
            );
            alert(JSON.stringify(err));

            // @ts-ignore
            window.ReactNativeWebView.postMessage("failed");
          });
      case "claim-whitelist":
        // @ts-ignore
        const nftId: StringAsciiCV = stringAsciiCV(window.nftId);
        // @ts-ignore
        const userAddress = standardPrincipalCV(window.userAddress);

        const nonceRoute1 = api.stacks({
          method: "nonce",
          // @ts-ignore
          payload: { publicKey: "SP26RS42R5ZH10VWWG4HFYPRJRC3JJ3FKWY4V58CW" },
        });

        const nonceResponse1 = await axios
          .get(nonceRoute1, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            return response.data;
          });

        const mempoolRoute1 = api.stacks({
          method: "mempool",
          // @ts-ignore
          payload: { publicKey: "SP26RS42R5ZH10VWWG4HFYPRJRC3JJ3FKWY4V58CW" },
        });

        const mempoolResponse1 = await axios
          .get(mempoolRoute1, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            return response.data.results;
          });

        let largestMempoolNonce1 = nonceResponse1.last_executed_tx_nonce;
        mempoolResponse1.forEach((transaction: any) => {
          if (transaction.nonce > largestMempoolNonce1)
            largestMempoolNonce1 = transaction.nonce;
        });

        const password = "password";
        const secretKey =
          "craft will spend casino bind tower beauty trash trust check surprise speed";

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

        const WALT3R = restoredWallet.accounts.find(
          (account) => account.username === "walt3r.btc"
        );

        const txOptions1 = {
          contractAddress,
          contractName,
          functionName: "bernard-claim-whitelist",
          functionArgs: [nftId, userAddress],
          // @ts-ignore
          senderKey: WALT3R!.stxPrivateKey, //bernard senderKey
          validateWithAbi: true,
          network,
          anchorMode: AnchorMode.Any,
          fee: 1500n,
          nonce: largestMempoolNonce1 + 1,
        };

        return makeContractCall(txOptions1)
          .then(async (transaction) => {
            broadcastTransaction(transaction, network)
              .then((broadcastResponse) => {
                const txId = broadcastResponse.txid;

                // @ts-ignore
                window.ReactNativeWebView.postMessage(
                  `claim-whitelist:${txId}`
                );
              })
              .catch((err) => {
                console.log(
                  "🚀 ~ file: useTransactionPurchaseWhitelist.ts ~ line 63 ~ .then ~ err",
                  err,
                  "failed"
                );

                alert(JSON.stringify(err));

                // @ts-ignore
                window.ReactNativeWebView.postMessage("failed");
              });
          })
          .catch((err) => {
            console.log(
              "🚀 ~ file: useTransactionPurchaseWhitelist.ts ~ line 69 ~ handleTransact ~ err",
              err,
              "failed2"
            );
            alert(JSON.stringify(err));

            // @ts-ignore
            window.ReactNativeWebView.postMessage("failed");
          });

        break;
      case "claim-nft":
        const postConditionCode2 = NonFungibleConditionCode.Owns;
        const assetAddress = contractAddress; // is there a difference between the two?
        const assetContractName = contractName; // is there a difference between the two?
        //  @ts-ignore
        const assetName = window.assetName; // replace space with underscore
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
            postConditionCode2,
            nonFungibleAssetInfo,
            tokenAssetName
          );

        // @ts-ignore
        const nftId2: StringAsciiCV = stringAsciiCV(window.nftId);

        const nonceRoute2 = api.stacks({
          method: "nonce",
          // @ts-ignore
          payload: { publicKey: window.userAddress },
        });

        const nonceResponse2 = await axios
          .get(nonceRoute2, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            return response.data;
          });

        const mempoolRoute2 = api.stacks({
          method: "mempool",
          // @ts-ignore
          payload: { publicKey: window.userAddress },
        });

        const mempoolResponse2 = await axios
          .get(mempoolRoute2, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            return response.data.results;
          });

        let largestMempoolNonce2 = nonceResponse2.last_executed_tx_nonce;
        mempoolResponse2.forEach((transaction: any) => {
          if (transaction.nonce > largestMempoolNonce2)
            largestMempoolNonce2 = transaction.nonce;
        });

        // alert(largestMempoolNonce2 + 1);

        const txOptions2 = {
          contractAddress,
          contractName,
          //  @ts-ignore
          functionName: "user-claim-nft",
          functionArgs: [nftId2],
          //  @ts-ignore
          senderKey: window.senderKey,
          validateWithAbi: true,
          network,
          postConditions: [contractNonFungiblePostCondition],
          anchorMode: AnchorMode.Any,
          fee: 1500n,
          nonce: largestMempoolNonce2 + 1,
        };

        makeContractCall(txOptions2)
          .then(async (transaction) => {
            broadcastTransaction(transaction, network)
              .then((broadcastResponse) => {
                const txId = broadcastResponse.txid;
                // @ts-ignore
                window.ReactNativeWebView.postMessage(`claim-nft:${txId}`);
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
        break;
      default:
        alert(JSON.stringify("e"));
    }
  };

  return {
    handleTransact,
    transaction,
  };
};
