import React, { useEffect, useState, useContext } from "react";
import {
  generateWallet,
  generateSecretKey,
  getStxAddress,
} from "@stacks/wallet-sdk";
import { TransactionVersion } from "@stacks/transactions";
// import { sign } from "jsonwebtoken";
import Button from "@mui/material/Button";
import {
  broadcastTransaction,
  AnchorMode,
  makeSTXTokenTransfer,
} from "@stacks/transactions";
import { StacksTestnet, StacksMainnet } from "@stacks/network";
import { readFileSync } from "fs";

export const useAppleMusic = () => {
  // const jwt = require("jsonwebtoken");
  // useEffect(() => {
  //   type Data = {
  //     token: string;
  //   };

  //   console.log("🏃 appStoreConnectAPIFromNode.js running 🏃‍");

  //   // You get privateKey, apiKeyId and issuerId from your Apple App Store Connect account
  //   // const path = require("path");
  //   // const privateKey = readFileSync(
  //   //   path.resolve(__dirname, "../api/AuthKey_4PKFJ37TH2.p8")
  //   // ); // this is the file you can only download once and should treat like a real, very precious key.

  //   const privateKey =
  //     "-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgDnVAe5C0dO1ouzHu\nfEJpHLfb4KsL3kAa5JVOLdcoiu+gCgYIKoZIzj0DAQehRANCAATvYaFa0e/LgWb2\noIwX1OOpBilYle616YJmPDhgNLvtb4YoiDCqIEdSdgcRzEM5rnnLFwc1evaYPyOb\neX8ghAKf\n-----END PRIVATE KEY-----";
  //   const keyId = "MBVSJA2QBU";
  //   const issuerId = "3J39XKJXT5";
  //   let now = Math.round(new Date().getTime() / 1000); // Notice the /1000
  //   let nowPlus20 = now + 1199; // 1200 === 20 minutes

  //   let payload = {
  //     iss: issuerId,
  //     exp: nowPlus20,
  //     aud: "appstoreconnect-v1",
  //   };

  //   let signOptions = {
  //     algorithm: "ES256",
  //     header: {
  //       alg: "ES256",
  //       kid: keyId,
  //       typ: "JWT",
  //     },
  //   };

  //   let token = jwt.sign(payload, privateKey, signOptions);
  //   console.log(
  //     "🚀 ~ file: useAppleMusic.ts ~ line 56 ~ useEffect ~ token",
  //     token
  //   );
  // }, []);

  return {
    //
  };
};
