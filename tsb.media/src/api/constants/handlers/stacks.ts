export const handleStacksAPI = ({ method, payload }: any) => {
  const publicKey = payload?.publicKey;

  switch (method) {
    case "nonce":
      return `https://stacks-node-api.mainnet.stacks.co/extended/v1/address/${publicKey}/nonces`;
    case "mempool":
      return `https://stacks-node-api.mainnet.stacks.co/extended/v1/tx/mempool?address=${publicKey}`;
    default:
      alert("Invalid Method");
      return "";
  }
};
