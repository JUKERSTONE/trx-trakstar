export const handleCoinGeckoAPI = ({ method, payload }: any) => {
  switch (method) {
    case "value":
      return `https://api.coingecko.com/api/v3/simple/price?ids=blockstack%2C%20bitcoin%2C%20cardano%2C%20solana&vs_currencies=gbp`;
    default:
      alert("Invalid Method");
      return "";
  }
};
