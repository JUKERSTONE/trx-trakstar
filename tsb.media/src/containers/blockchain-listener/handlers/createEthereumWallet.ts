const ethers = require("ethers");

export const createEthereumWallet = async () => {
  const wallet = ethers.Wallet.createRandom();
  console.log("address:", wallet.address);
  console.log("mnemonic:", wallet.mnemonic.phrase);
  console.log("privateKey:", wallet.privateKey);

  return wallet;
};
