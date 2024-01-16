import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { TSBM3DIAApp, ON_CHAIN_TSB, ON_NETWORK_TSB } from "./app";
import reportWebVitals from "./reportWebVitals";
import { NavBarContainer } from "./containers";

ReactDOM.render(
  <React.StrictMode>
    <NavBarContainer />
    <ON_NETWORK_TSB />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
