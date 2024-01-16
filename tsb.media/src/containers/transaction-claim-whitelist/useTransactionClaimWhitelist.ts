import React, { useEffect, useState, useContext } from "react";
import {
  makeContractCall,
  broadcastTransaction,
  AnchorMode,
  FungibleConditionCode,
  makeStandardSTXPostCondition,
  UIntCV,
  uintCV,
  standardPrincipalCV,
} from "@stacks/transactions";
import { StacksMainnet } from "@stacks/network";

export const useTransactionClaimWhitelist = () => {
  // const handleTransact = async () => {
  //   const network = new StacksMainnet();

  //   const contractAddress = "SP26RS42R5ZH10VWWG4HFYPRJRC3JJ3FKWY4V58CW";
  //   const contractName = "TRAKLIST-MARKETPLACE-V2";

  //   // @ts-ignore
  //   const nftId: StringAsciiCV = stringAsciiCV(window.nftId);
  //   // @ts-ignore
  //   const userAddress = standardPrincipalCV(window.userAddress);

  //   const postConditionAddress = "SP26RS42R5ZH10VWWG4HFYPRJRC3JJ3FKWY4V58CW";
  //   const postConditionCode = FungibleConditionCode.Equal;
  //   // @ts-ignore
  //   const postConditionAmount = BigInt(0);

  //   const standardSTXPostCondition = makeStandardSTXPostCondition(
  //     postConditionAddress,
  //     postConditionCode,
  //     postConditionAmount
  //   );

  //   const txOptions = {
  //     contractAddress,
  //     contractName,
  //     functionName: "bernard-claim-whitelist",
  //     functionArgs: [nftId, userAddress],
  //     // @ts-ignore
  //     senderKey: window.senderKey,
  //     validateWithAbi: true,
  //     network,
  //     postConditions: [standardSTXPostCondition],
  //     anchorMode: AnchorMode.Any,
  //     fee: 1500n,
  //   };

  //   const transaction = await makeContractCall(txOptions);

  //   const broadcastResponse = await broadcastTransaction(transaction, network);
  //   const txId = broadcastResponse.txid;
  //   alert(txId);
  // };
  return {
    // handleTransact,
  };
};
