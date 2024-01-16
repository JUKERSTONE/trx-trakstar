// import { db } from "../../../firestore";

export const setUserSessionPreferences = async ({ req, res }: any) => {
  // const users = await db
  //   .collection("users")
  //   .get()
  //   .then((data) => {
  //     let users: any = [];
  //     data.forEach((doc) => {
  //       users.push(doc.id);
  //     });
  //     return users;
  //   });
  // users.map((id: string) => {
  //   const likes = db
  //     .collection("likes")
  //     .where("userId", "==", id)
  //     .get()
  //     .then((data) => {
  //       let likes: any = [];
  //       data.forEach((doc) => {
  //         const like = doc.data();
  //         // is like trx:00? get preferences from like
  //         likes.push(doc.data());
  //       });
  //       return likes;
  //     });
  // });
  /**
   * - for each user
   *  - get all likes
   *  - for each like
   *   - if trx:00, get preferences
   *  - tally preferences
   *  - update document in users/id for genres & audio features
   *
   */
};
