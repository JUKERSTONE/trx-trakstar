import { db } from "../../../firestore";

export const migrateMatchedLikes = async ({ req, res }: any) => {
  await db
    .collection("likes")
    .where("hasCheck", "==", true)
    .get()
    .then((data) => {
      // let likes: any = [];
      data.forEach((doc) => {
        const trakExists = db
          .doc(`TRX/TRX:00:${doc.data().isrc}}`)
          .get()
          .then((doc) => {
            if (!doc.exists) {
              return false;
            }
            return doc.data();
          });
        console.log(
          "🚀 ~ file: migrateMatchedLikes.ts:20 ~ data.forEach ~ trakExists:",
          trakExists
        );
        // likes.push(doc.data());
      });
      // return likes;
    });

  return res.json({ message: "success" });
};
