import React, { useState, useEffect } from "react";

import {
  createBitcoinWallet,
  createStacksWallet,
  // createCardanoWallet,
  createSolanaWallet,
  createDogeWallet,
  createEthereumWallet,
  un_wrap_RouteParams,
} from "./handlers";

export const useCreateNetworkWallet = async () => {
  useEffect(() => {
    handleNetworkWallet();
  }, []);

  const handleNetworkWallet = async () => {
    const [pathname] = window.location.pathname.split("/");
    const routeParams = pathname[pathname.length - 1];

    const { link = "https://trxklist.page.link/zXbp" } = un_wrap_RouteParams({
      routeParams,
    });

    const blockchains = [
      "bitcoin",
      "stacks",
      // "cardano",
      "solana",
      // "doge",
      "ethereum",
    ];

    let hashResponse: string | null = null;

    const network_wallet_params = await Promise.all(
      blockchains.map(async (chain) => {
        switch (chain) {
          case "bitcoin":
            // @ts-ignore
            hashResponse = await createBitcoinWallet();
            return { bitcoin: hashResponse };
          case "stacks":
            // @ts-ignore
            hashResponse = await createStacksWallet();
            return { stacks: hashResponse };
          // case "cardano":
          //   hashResponse = await createCardanoWallet({});
          //   return { cardano: hashResponse };
          case "solana":
            hashResponse = await createSolanaWallet();
            return { solana: hashResponse };
          // case "doge":
          //   hashResponse = await createDogeWallet();
          //   alert(JSON.stringify(hashResponse));
          //   return { doge: hashResponse };
          case "ethereum":
            hashResponse = await createEthereumWallet();
            return { ethereum: hashResponse };
          default:
            return;
        }
      })
    );

    // alert(JSON.stringify(network_wallet_params));
    console.log("🚀 ~ TSB M3DIA NETWORK KEYS HERE", network_wallet_params);

    // @ts-ignore
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        success: true,
        data: network_wallet_params,
        mode: "create-network-wallet",
      })
    );
  };
};
