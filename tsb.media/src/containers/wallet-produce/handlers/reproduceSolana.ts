import { Connection, clusterApiUrl } from "@solana/web3.js";

export const handleReproduceSolanaWallet = async (address: any) => {
  let connection = new Connection(clusterApiUrl("mainnet-beta"));
  const account = await connection.getAccountInfo(address);
  return account;
};
