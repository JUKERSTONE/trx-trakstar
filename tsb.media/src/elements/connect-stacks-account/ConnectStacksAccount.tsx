import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import ModalUnstyled from "@mui/base/ModalUnstyled";

export const ConnectStacksAccountElement = ({
  handleSecretKey,
  handleConnect,
}: any) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <input type="text" onChange={handleSecretKey} />
      <div className="">
        <Button variant="contained" onClick={handleConnect}>
          CONNECT
        </Button>
      </div>
    </div>
  );
};
