// import * as assert from "assert";
// import ECPairFactory from "ecpair";
// import * as ecc from "tiny-secp256k1";
// import * as bitcoin from "../../../bitcoin";
// import { regtestUtils } from "../utils";

// export const createBitcoinWallet = async () => {
//   const ECPair = ECPairFactory(ecc);
//   const dhttp = regtestUtils.dhttp;
//   // const TESTNET = bitcoin.networks.testnet;

//   const keyPair = ECPair.makeRandom();
//   const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });

//   const result = await dhttp({
//     method: "GET",
//     url: "https://blockchain.info/rawaddr/" + address,
//   });
//   console.log(
//     "🚀 ~ file: createBitcoinWallet.ts ~ line 19 ~ createBitcoinWal ~ result",
//     result
//   );

//   return result as string;
// };

export const ses = "";
