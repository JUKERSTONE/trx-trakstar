import React from "react";
import Button from "@mui/material/Button";

export const RefreshPage = () => {
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
      <Button variant="contained" /*onClick={handleStacksProfile}*/>
        REFRESH WALLET
      </Button>
    </div>
  );
};
