import { Keypair, PublicKey } from "@solana/web3.js";

export const createSolanaWallet: any = async () => {
  let keypair = Keypair.generate();
  console.log(
    "🚀 ~ file: createSolanaWallet.ts ~ line 5 ~ constcreateSolanaWallet:any= ~ keypair",
    keypair
  );

  // @ts-ignore
  const publicKey = keypair._keypair.publicKey;
  console.log(
    "🚀 ~ file: createSolanaWallet.ts ~ line 12 ~ constcreateSolanaWallet:any= ~ publicKey",
    publicKey
  );
  // @ts-ignore
  const secretKey = keypair._keypair.secretKey;

  let privateKey = new TextDecoder().decode(secretKey);
  console.log(
    "🚀 ~ file: createSolanaWallet.ts ~ line 20 ~ constcreateSolanaWallet:any= ~ privateKey",
    privateKey
  );

  // let res = new TextEncoder().encode(arr);

  const address = new PublicKey(publicKey).toString();
  console.log(
    "🚀 ~ file: createSolanaWallet.ts ~ line 24 ~ constcreateSolanaWallet:any= ~ address",
    address
  );

  return {
    privateKey,
    publicKey: address,
  };
};
