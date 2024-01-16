import React, { useEffect, useState, useContext } from "react";

import { sendCryptoOnChain } from "./handlers";

export const useWalletSend = async () => {
  const { blockchain, link = "https://dynamic_link/" } = window as any;

  useEffect(() => {
    let hashResponse: any = "";
    let redirectURL: any = "";
    switch (blockchain) {
      case "bitcoin":
        hashResponse = sendCryptoOnChain();
        redirectURL = link + hashResponse;
        window.location.replace(redirectURL);
        return;
      case "stacks":
        hashResponse = sendCryptoOnChain();
        redirectURL = link + hashResponse;
        window.location.replace(redirectURL);
        break;
      case "doge":
        hashResponse = sendCryptoOnChain();
        redirectURL = link + hashResponse;
        window.location.replace(redirectURL);
        return;
      // case "cardano":
      //   hashResponse =  sendCryptoOnChain();
      //   redirectURL = link + hashResponse;
      //   window.location.replace(redirectURL);
      //   return;
      case "ethereum":
        hashResponse = sendCryptoOnChain();
        redirectURL = link + hashResponse;
        window.location.replace(redirectURL);
        return;
      case "solana":
        hashResponse = sendCryptoOnChain();
        redirectURL = link + hashResponse;
        window.location.replace(redirectURL);
        return;
      default:
        // @ts-ignore
        return window.ReactNativeWebView.postMessage(serealizedKeys);
    }
  }, []);
};
