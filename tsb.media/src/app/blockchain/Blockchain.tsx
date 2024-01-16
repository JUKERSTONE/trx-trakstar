import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import {
  BlockchainWalletContainer,
  WalletSendContainer,
  BlockchainListenerContainer,
} from "../../containers";

export const BlockchainApp = () => {
  return (
    <Router>
      <Route exact path="/" component={BlockchainListenerContainer} />
      <Route
        exact
        path="/wallet/:hashParams"
        component={BlockchainWalletContainer}
      />
      <Route exact path="/send/:hashParams" component={WalletSendContainer} />
    </Router>
  );
};

/*******************************
 *
 * route
 * container
 *  - useEffect logic
 *  - views
 *
 */
