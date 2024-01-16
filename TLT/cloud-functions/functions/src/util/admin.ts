import * as admin from "firebase-admin";
import * as serviceAccount from "../service_account_key.json";

const file: any = serviceAccount;
admin.initializeApp({
  credential: admin.credential.cert(file),
});
const db = admin.firestore();
export const auth = admin.auth();
export default db;
