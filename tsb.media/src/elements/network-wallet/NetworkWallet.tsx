import React from "react";
import { MetaverseElement } from "../../elements";
import mainLogo from "./Screenshot 2023-02-11 at 14.43.46.png";

export const NetworkWalletElement = ({
  endpoint,
  wallets,
  handleCreateWallet,
  ...props
}: any) => {
  console.log(
    "🚀 ~ file: NetworkWallet.tsx:5 ~ NetworkWalletElement ~ props",
    props
  );
  return (
    <>
      <div>
        <button onClick={handleCreateWallet}>
          NETWORK WALLET - Right click, and select console to recieve new keys -
          remember not to share your private keys with anyone.
        </button>
        <img
          // loader={myLoader}
          src={mainLogo}
          // width={200}
          // height={35}
          style={{ margin: 10 }}
        />
      </div>
      <MetaverseElement />
    </>
  );
};
