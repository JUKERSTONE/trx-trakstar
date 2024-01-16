import { db } from "../../../firestore";

export const migrateTempsLikes = async ({ req, res }: any) => {
  const tempLikes = await db
    .collection("temp-likes")
    .get()
    .then((data) => {
      let tempLikes: any = [];
      data.forEach((doc) => {
        db.collection("likes").doc(doc.id).set(doc.data());
        tempLikes.push(doc.data());
      });
    });

  return res.status(200).json({ tempLikes });
};
