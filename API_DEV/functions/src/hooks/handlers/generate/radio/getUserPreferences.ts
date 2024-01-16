import { db } from "../../../../firestore";

export const getUserPreferences = async ({ userId }: { userId: string }) => {
  return await db
    .collection("likes")
    .where("userId", "==", userId)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => doc.data());
    });
};
