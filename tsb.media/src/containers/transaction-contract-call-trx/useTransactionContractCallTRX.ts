import React, { useEffect, useState, useContext } from "react";
import {
  makeContractCall,
  broadcastTransaction,
  AnchorMode,
  FungibleConditionCode,
  makeStandardSTXPostCondition,
  StringAsciiCV,
  stringAsciiCV,
} from "@stacks/transactions";
import { StacksMainnet } from "@stacks/network";

export const useTransactionContractCallTRX = () => {
  const handleTransact = async () => {
    const network = new StacksMainnet();

    const contractAddress = "SP26RS42R5ZH10VWWG4HFYPRJRC3JJ3FKWY4V58CW";
    const contractName = "TRAKLIST-MARKETPLACE-V1";

    const postConditionAddress = "SP26RS42R5ZH10VWWG4HFYPRJRC3JJ3FKWY4V58CW";
    const postConditionCode = FungibleConditionCode.Equal;
    const postConditionAmount = 100n;

    const ascii: StringAsciiCV = stringAsciiCV("Clarity");

    const standardSTXPostCondition = makeStandardSTXPostCondition(
      postConditionAddress,
      postConditionCode,
      postConditionAmount
    );

    const txOptions = {
      contractAddress,
      contractName,
      functionName: "claim",
      functionArgs: [ascii],
      senderKey:
        "26ce12b817ff4ac93919fe01ca0b178bbf5aa4f0535128d3341798e2ce3070cb01",
      validateWithAbi: true,
      network,
      postConditions: [standardSTXPostCondition],
      anchorMode: AnchorMode.Any,
      fee: 1500n,
    };

    const transaction = await makeContractCall(txOptions);

    const broadcastResponse = await broadcastTransaction(transaction, network);
    const txId = broadcastResponse.txid;
    alert(txId);
  };
  return {
    handleTransact,
  };
};
