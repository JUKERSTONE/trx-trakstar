import { generateWallet, restoreWalletAccounts } from "@stacks/wallet-sdk";
import { StacksTestnet, StacksMainnet } from "@stacks/network";
import axios from "axios";

export const handleReproduceStacksWallet = async (address: any) => {
  const response = await axios.get(
    "https://stacks-node-api.mainnet.stacks.co/extended/v1/address/" +
      address +
      "/balances",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
