import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import ModalUnstyled from "@mui/base/ModalUnstyled";

export const StacksPortalElement = ({ handleStacksProfile }: any) => {
  return (
    <div
      style={{
        backgroundColor: "#333333",
        height: 70,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button variant="contained" onClick={handleStacksProfile}>
        Get Secret Key
      </Button>
    </div>
  );
};
