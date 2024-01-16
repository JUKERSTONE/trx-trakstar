import React, { useState } from "react";
import { MetaverseElement } from "..";

export const WalletProduceElement = ({
  endpoint,
  wallets,
  handleChainSelect,
}: any) => {
  const [chainSelect, setChainSelect] = useState("bitcoin");

  let background;
  switch (chainSelect) {
    case "bitcoin":
      background = "#fbda42";
      break;
    case "stacks":
      background = "#5546ff";
      break;
    case "ethereum":
      background = "#343434";
      break;
    case "solana":
      background = "#00ffa3";
      break;

    default:
      background = "#fbda42";

      break;
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          height: "20vh",
          flexDirection: "column",
          backgroundColor: "#1a1a1a",
        }}
      >
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: background,
            width: "100vw",
            padding: 10,
          }}
        >
          <div>
            <button
              onClick={() => setChainSelect("stacks")}
              style={{
                backgroundColor: chainSelect === "stacks" ? "green" : "#fff",
              }}
            >
              <img
                // loader={myLoader}
                src="https://s2.coinmarketcap.com/static/img/coins/200x200/4847.png"
                alt="Picture of the stacks"
                width={35}
                height={35}
                style={{ margin: 10 }}
              />
            </button>
            <button
              onClick={() => setChainSelect("bitcoin")}
              style={{
                backgroundColor: chainSelect === "bitcoin" ? "green" : "#fff",
              }}
            >
              <img
                // loader={myLoader}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png"
                alt="Picture of the bitcoin"
                width={35}
                height={35}
                style={{ margin: 10 }}
              />
            </button>
            <button
              onClick={() => setChainSelect("solana")}
              style={{
                backgroundColor: chainSelect === "solana" ? "green" : "#fff",
              }}
            >
              <img
                // loader={myLoader}
                src="https://s2.coinmarketcap.com/static/img/coins/200x200/5426.png"
                alt="Picture of the solana"
                width={35}
                height={35}
                style={{ margin: 10, borderRadius: 15 }}
              />
            </button>
            <button
              onClick={() => setChainSelect("ethereum")}
              style={{
                backgroundColor: chainSelect === "ethereum" ? "green" : "#fff",
              }}
            >
              <img
                // loader={myLoader}
                src="https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/ZJZZK5B2ZNF25LYQHMUTBTOMLU.png"
                alt="Picture of the ethereum"
                width={35}
                height={35}
                style={{ margin: 10 }}
              />
            </button>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              margin: 10,
            }}
          >
            <input placeholder="SECRET RECOVERY PHRASE" />
            <button>GO</button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <input placeholder="PRIVATE KEY" />
            <button>GO</button>
          </div>
        </div>
      </div>
      <MetaverseElement />
    </>
  );
};
