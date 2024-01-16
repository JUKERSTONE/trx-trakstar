import * as functions from "firebase-functions";
import * as express from "express";
import { useCloudFunctions } from "./hooks";
import { auth } from "./core";

const {
  setTLTTrendingFunction,
  getTLTTrendingFunction,
  setTLTNewsFunction,
  getTLTNewsFunction,
  setTrakFunction,
  verifyDuplicateTrakFunction,
  setTrakRaffleFunction,
  getTrakFunction,
  getTrakBankFunction,
  exchangeTrakFunction,
  requestNFTFunction,
  getNFTRequestsFunction,
  setNFTFunction,
  purchaseNFTFunction,
  getUserWalletFunction,
  getArtistPortfolioFunction,
} = useCloudFunctions();

export const app = express();

// v2
app.post("/trx_00/trak", auth, setTrakFunction);
app.post("/trx_00/trak/verify/duplicate", verifyDuplicateTrakFunction);
app.get(
  "/traklist/user/trak/trx_00/raffle/:subscription",
  auth,
  setTrakRaffleFunction // come back after platforms
);
app.get("/trx_00/trak/:trakId", getTrakFunction);
app.get("/trx_00/trak", auth, getTrakBankFunction);
app.post("/trx_00/trak/exchange", auth, exchangeTrakFunction);
app.post("/trx_00/nft/request", auth, requestNFTFunction); // come back after platforms
app.get("/trx_00/nft/requests", auth, getNFTRequestsFunction); // come back after platforms
app.post("/trx_00/nft", auth, setNFTFunction); // come back after platforms
app.post("/trx_00/nft/:nftID/purchase", auth, purchaseNFTFunction);
app.get("/traklist/user/wallet", auth, getUserWalletFunction);
app.get("/traklist/artist/portfolio", auth, getArtistPortfolioFunction);
app.post("/traklite/admin/trending", auth, setTLTTrendingFunction);
app.get("/traklite/admin/trending", getTLTTrendingFunction);
app.post("/traklite/admin/news", auth, setTLTNewsFunction);
app.get("/traklite/admin/news", getTLTNewsFunction);
exports.BERNIE = functions.region("europe-west1").https.onRequest(app);
