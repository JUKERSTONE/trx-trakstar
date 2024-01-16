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

export const un_wrap_RouteParams = ({ params }: any) => {
  return {
    blockchain: "",
    link: "",
  };
};
