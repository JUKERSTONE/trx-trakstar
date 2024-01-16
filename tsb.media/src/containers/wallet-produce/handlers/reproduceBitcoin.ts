import { PrivateKey, PublicKey } from "bitcore-lib";
import axios from "axios";

export const handleReproduceBitcoinWallet = async (address: any) => {
  const tes = JSON.stringify(address);
  // @ts-ignore
  const addy = tes.replaceAll('"', "");
  // alert(addy);
  const response = await axios
    .get(
      "https://api.blockcypher.com/v1/btc/main/addrs/194YUveLtrGiVgkLtFe9AeZA9QpL3Qd3cV/balance",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res: any) => {
      return res.data;
    })
    .catch((err) => {
      alert(err);
    });
  return response;
};
