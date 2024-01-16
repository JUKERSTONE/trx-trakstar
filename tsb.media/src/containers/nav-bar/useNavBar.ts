import React, { useEffect, useState, useContext } from "react";
import { StacksMainnet, StacksTestnet, StacksMocknet } from "@stacks/network";
import {
  generateWallet,
  generateSecretKey,
  generateNewAccount,
  restoreWalletAccounts,
  getStxAddress,
} from "@stacks/wallet-sdk";
import { TransactionVersion } from "@stacks/transactions";
import axios from "axios";

export const useNavBar = async () => {
  const [STXProfile, setSTXProfile] = useState();
};
