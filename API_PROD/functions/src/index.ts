import * as functions from "firebase-functions";
import * as express from "express";
import {
  spreadISRC,
  useCloudFunctions,
  getTrx00GenreCollections,
  getSpotifyGenre,
  getToken,
  setUserSessionPreferences,
  migrateLikes,
  migratePreviewLikes,
  migrateMatchedLikes,
  migrateTempsLikes,
} from "./hooks";
import { auth } from "./core";
// import { migrate0400 } from "./hooks/handlers/script/0400/migrate0400";
import { getSpotifyAccessToken } from "./hooks/handlers/get/token/spotify";
import { fixKeyUri } from "./hooks/handlers/script/fixKeyUri";
import { buildTreeFromRankedTracks } from "./hooks/handlers/generate/radio";
import { publishToAPNs } from "./hooks/handlers/set/publishToAPNs";

const {
  handleSwapTokenFunction,
  handleRefreshTokenFunction,
  setTLTTrendingFunction,
  getTLTTrendingFunction,
  setTLTNewsFunction,
  getTLTNewsFunction,
  triggerBeRealFunction,
  viewBeRealNotificationFunction,
  stripePaymentIntentFunction,
  // migrateSessionsFunctions,
  setTrakFunction,
  verifyDuplicateTrakFunction,
  transformTrx04Function,
} = useCloudFunctions();

export const app = express();

app.post("/spotify/swap", handleSwapTokenFunction);
app.post("/spotify/refresh", handleRefreshTokenFunction);
app.post("/traklite/admin/trending", auth, setTLTTrendingFunction);
app.get("/traklite/admin/trending", getTLTTrendingFunction);
app.post("/traklite/admin/news", auth, setTLTNewsFunction);
app.get("/traklite/admin/news", getTLTNewsFunction);
app.get("/traklist/be_real", triggerBeRealFunction);
app.post("/trakstar/stripe", stripePaymentIntentFunction);
// app.get("/trx/script/playback", migrateSessionsFunctions);
app.post("/trx_00/trak", auth, setTrakFunction);
app.post("/trx_00/trak/verify/duplicate", verifyDuplicateTrakFunction);
app.get("/trx_04/transform", transformTrx04Function);
app.get("/trx_00/spread/isrc", spreadISRC);
// app.get("/trx_00/trak/structure", correctDataStructure);
app.get("/trx_00/genre", getTrx00GenreCollections);
app.get("/spotify/genre/:id", getSpotifyGenre);
app.post("/trx/token", getToken);
app.get("/trx/script/user/session/preferences", setUserSessionPreferences);
app.get("/trx/script/likes", migrateLikes);
app.get("/trx/script/temp-likes", migrateTempsLikes);
app.get("/trx/script/likes/preview", migratePreviewLikes);
app.get("/trx/script/likes/matched", migrateMatchedLikes);
// app.get("/trx/script/04/00", migrate0400);
// app.get("/trx/script/04/spotify/id", migrateSpotifyUriToId);
app.get("/trx/script/fix/key/uri", fixKeyUri);
app.get("/spotify/token", getSpotifyAccessToken);
app.get("/trx/radio", auth, buildTreeFromRankedTracks);
app.post("/trx/notification", publishToAPNs);

exports.TRAKLIST_API = functions.region("europe-west1").https.onRequest(app);
exports.viewBeRealNotification = functions.https.onRequest(
  viewBeRealNotificationFunction
);
