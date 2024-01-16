const ethers = require("ethers");

export const createEthereumWallet: any = async () => {
  const wallet = ethers.Wallet.createRandom();

  return {
    privateKey: wallet.privateKey,
    publicKey: wallet.address,
  };
};
