import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import {
  TRXSupport,
  TSBM3DIAPage,
  NewStacksAccountPage,
  ConnectStacksAccountPage,
  RefreshPage,
  TransactionContractCallPage,
  TransactionContractCallTRXPage,
  TransactionPurchaseWhitelistSTXPage,
  TransactionPurchaseWhitelistTUCPage,
  TransactionSTXPage,
  TransactionClaimWhitelistPage,
  AppleMusicConnectPage,
} from "../pages";

export const TSBM3DIAApp = () => {
  return (
    <Router>
      <Route exact path="/" component={TSBM3DIAPage} />
      <Route exact path="/walter/stacks" component={NewStacksAccountPage} />
      <Route
        exact
        path="/walter/stacks/connect"
        component={ConnectStacksAccountPage}
      />
      <Route exact path="/walter/stacks/refresh" component={RefreshPage} />
      <Route
        exact
        path="/walter/stacks/transaction/contract/call"
        component={TransactionContractCallPage}
      />
      <Route
        exact
        path="/walter/stacks/transaction/stx"
        component={TransactionSTXPage}
      />
      <Route exact path="/test" component={TransactionContractCallTRXPage} />
      <Route
        exact
        path="/walter/stacks/contract-call/purchase-whitelist/stx"
        component={TransactionPurchaseWhitelistSTXPage}
      />
      <Route
        exact
        path="/walter/stacks/contract-call/purchase-whitelist/tuc"
        component={TransactionPurchaseWhitelistTUCPage}
      />
      <Route
        exact
        path="/walter/stacks/contract-call/claim-whitelist/stx"
        component={TransactionClaimWhitelistPage}
      />
      {/* 
      <Route
        exact
        path="/walter/stacks/contract-call/claim-whitelist/tuc"
        component={TransactionClaimWhitelistTUCPage}
      /> */}
      <Route exact path="/apple" component={AppleMusicConnectPage} />
    </Router>
  );
};
