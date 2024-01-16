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
import {
  handleReproduceBitcoinWallet,
  handleReproduceSolanaWallet,
  handleReproduceStacksWallet,
  handleReproduceEthereumWallet,
} from "./handlers";
import { doSignaturesMatchPublicKeys } from "blockstack";

export const useWalletReproduce = async () => {
  const pathname = window.location.pathname.split("/");
  const routeParams = pathname[pathname.length - 1];
  alert(JSON.stringify(routeParams));
  // @ts-ignore
  useEffect(() => {
    // @ts-ignore
    alert(window.params + " 34");
    // alert(2);
    // @ts-ignore
    // alert(window.params + "23");
    // handleNetworkWallet();
    // @ts-ignore
    // setPublicKeys(JSON.parse(window?.params));
  }, [window.params]);
  // const [publicKeys, setPublicKeys] = useState<any>(JSON.parse(window?.params));

  const handleNetworkWallet = async () => {
    alert(3);
    const [pathname] = window.location.pathname.split("/");
    const routeParams = pathname[pathname.length - 1];

    // const { link = "https://trxklist.page.link/zXbp" } = un_wrap_RouteParams({
    //   routeParams,
    // });

    const blockchains = [
      "bitcoin",
      "stacks",
      // "cardano",
      // "solana",
      // "doge",
      // "ethereum",
    ];

    let hashResponse: string | null | any = null;

    // @ts-ignore
    const { bitcoin, stacks, ethereum, solana } = publicKeys;
    // alert(JSON.stringify(bitcoin));

    const network_wallet_params = await Promise.all(
      blockchains.map(async (chain) => {
        switch (chain) {
          case "bitcoin":
            hashResponse = await handleReproduceBitcoinWallet(bitcoin);
            // alert(JSON.stringify({ bitcoin: hashResponse }));
            return { bitcoin: hashResponse };
          case "stacks":
            hashResponse = await handleReproduceStacksWallet(stacks);
            return { stacks: hashResponse };
          // case "cardano":
          //   hashResponse = await createCardanoWallet({});
          //   return { cardano: hashResponse };
          // case "solana":
          //   hashResponse = await handleReproduceSolanaWallet(solana);
          //   return { solana: hashResponse };
          // case "doge":
          //   hashResponse = await createDogeWallet();
          //   alert(JSON.stringify(hashResponse));
          //   return { doge: hashResponse };
          // case "ethereum":
          //   hashResponse = await handleReproduceEthereumWallet(ethereum);
          //   return { ethereum: hashResponse };
          default:
            return;
        }
      })
    );

    // alert(JSON.stringify(network_wallet_params));

    // @ts-ignore
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        success: true,
        data: network_wallet_params,
        mode: "reproduce",
      })
    );
  };
};
