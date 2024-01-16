import { initializeApp, credential } from "firebase-admin";
var serviceAccount = require("../core/trx-traklist-firebase-adminsdk-t44y0-54b7fcbc7e.json");

const bernie = initializeApp();
export const db = bernie.firestore();

const options = {
  credential: credential.cert(serviceAccount),
};
const name = "TRX";

export const trx = initializeApp(options, name);
