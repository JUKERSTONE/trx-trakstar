import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";

import {
  TSBM3DIAPage,
  TrakstarEULAPage,
  TrakstarPrivacyPolicyPage,
} from "../../pages";
import {
  NetworkWalletContainer,
  WalletProduceContainer,
  WalletReproduceBTCContainer,
  // WalletReproduceSTXContainer,
  // WalletReproduceSOLContainer,
  // WalletReproduceETHContainer,
} from "../../containers";

export const NetworkApp = () => {
  return (
    <Router>
      <Route exact path="/" component={TSBM3DIAPage} />
      <Route exact path="/wallet" component={NetworkWalletContainer} />
      <Route exact path="/wallet/produce" component={WalletProduceContainer} />
      <Route
        exact
        path="/wallet/reproduce/bitcoin/:privateKey"
        component={WalletReproduceBTCContainer}
      />
      <Route exact path="/trakstar/eula" component={TrakstarEULAPage} />
      <Route
        exact
        path="/trakstar/privacy"
        component={TrakstarPrivacyPolicyPage}
      />
      {/*<Route
        exact
        path="/wallet/reproduce/solana/:privateKey"
        component={WalletReproduceSOLContainer}
      />
      <Route
        exact
        path="/wallet/reproduce/ethereum/:privateKey"
        component={WalletReproduceETHContainer}
      /> */}
      <Route exact path="/protocol/:hashParams" component={TSBM3DIAPage} />
      <Route exact path="/convert/:hashParams" component={TSBM3DIAPage} />
      <Route exact path="/send/:hashParams" component={TSBM3DIAPage} />
    </Router>
  );
};
