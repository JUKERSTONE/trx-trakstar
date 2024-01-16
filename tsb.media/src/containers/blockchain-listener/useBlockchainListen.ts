import React, { useState, useEffect } from "react";

import {
  // createBitcoinWallet,
  createStacksWallet,
  // createCardanoWallet,
  // createSolanaWallet,
  createDogeWallet,
  un_wrap_RouteParams,
} from "./handlers";

export const useCreateBlockchainWallet = async () => {
  const [hashParams, setHashParams] = useState<string>(null!);

  useEffect(() => {
    test();
  }, []);

  const test = async () => {
    // @ts-ignore
    const [pathname] = window.location.pathname.split("/");
    const routeParams = pathname[pathname.length - 1];

    const { blockchain, link } = un_wrap_RouteParams({
      routeParams,
    });

    let hashParams: string | null = null;
    switch (blockchain) {
      case "bitcoin":
        // hashParams = await createBitcoinWallet();
        window.location.replace(link);
        return;
      case "stacks":
        hashParams = await createStacksWallet();
        window.location.replace(link);
        return;
      // case "cardano":
      //   hashParams = await createCardanoWallet({});
      //   window.location.replace(link);
      //   return;
      // case "solana":
      //   hashParams = await createSolanaWallet();
      //   window.location.replace(link);
      //   return;
      case "doge":
        hashParams = await createDogeWallet();
        window.location.replace(link);
        return;
      case "ethereum":
        hashParams = await createStacksWallet();
        window.location.replace(link);
        return;
      default:
        return;
    }
  };
};
