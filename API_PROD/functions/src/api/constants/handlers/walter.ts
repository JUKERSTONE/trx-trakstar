export const handleWalterAPI = ({ method, payload }: any) => {
  const base = "https://europe-west1-forchain-1cdb0.cloudfunctions.net/WALTER";

  switch (method) {
    case "connect_forchain":
      return `${base}/forchain/connect`;
    case "get_user_wallet":
      return `${base}/forchain/wallet`;
    case "get_asset":
      return `${base}/traklist/asset`;
    default:
      alert("Invalid Method");
      return "";
  }
};
