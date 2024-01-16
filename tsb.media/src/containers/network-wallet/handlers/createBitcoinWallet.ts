import { PrivateKey, PublicKey, Address, Script, crypto } from "bitcore-lib";

export const createBitcoinWallet = async () => {
  const privateKey = new PrivateKey();
  const wif = privateKey.toWIF();
  const publicKey = PublicKey.fromPrivateKey(privateKey);
  const address = new Address(publicKey).toString();

  return { privateKey: wif, publicKey: address };
};
