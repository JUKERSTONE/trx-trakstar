import React from "react";
// import "./navbar.css";
export const NavBarElement = ({ endpoint, wallets }: any) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "10vh",
        backgroundColor: "#1a1a1a",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "10%",
          backgroundColor: "transparent",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() => window.location.replace("/")}
      >
        <img
          // loader={myLoader}
          src="https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/Traklist%20launches?alt=media&token=64a57395-898c-4214-8132-8c3597a1cddc"
          alt="Picture of the author"
          width={35}
          height={35}
        />
      </div>
      <div style={{ display: "flex", flex: 1, justifyContent: "space-around" }}>
        <button
          onClick={() => window.location.replace("/wallet")}
          style={{
            padding: "10px 15px",
            backgroundColor: "transparent",
            color: "#fff",
            fontSize: 18,
            fontWeight: "600",
            // borderRadius: 5,
            border: "none",
            borderBottom: "1.5px solid whitesmoke",
          }}
        >
          WALLET
        </button>
        <button
          onClick={() => window.location.replace("/wallet/reproduce")}
          style={{
            padding: "5px 15px",
            backgroundColor: "transparent",
            color: "#fff",
            fontSize: 18,
            fontWeight: "600",
            // borderRadius: 5,
            border: "none",
            borderBottom: "1.5px solid whitesmoke",
          }}
        >
          RESTORE
        </button>
      </div>
    </div>
  );
};
