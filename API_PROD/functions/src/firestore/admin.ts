import { initializeApp } from "firebase-admin";
const admin = require("firebase-admin");
const serviceAccount = require("../core/trx-traklist-firebase-adminsdk-t44y0-54b7fcbc7e.json");

export const TRAKLIST = initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
export const db = TRAKLIST.firestore();
export const auth = TRAKLIST.auth();
