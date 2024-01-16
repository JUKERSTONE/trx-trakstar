const ethers = require("ethers");

export const handleReproduceEthereumWallet = async (address: any) => {
  let wallet = new ethers.Wallet(address);
  const balance = await wallet.getBalance();

  return balance;
};
