import { db } from "../../../firestore";

export const migrateLikes = async ({ req, res }: any) => {
  const likes = await db
    .collection("likes")
    .get()
    .then((data) => {
      let likes: any = [];
      data.forEach((doc) => {
        likes.push(doc.data());
      });
      return likes;
    });

  likes.map(async (like: any) => {
    const trx = like?.trx04;

    if (!!trx) {
      const trx04: any = await db
        .doc(`/trx-04/${trx}`)
        .get()
        .then((doc) => {
          return doc.data();
        }); //
      console.log("🚀 ~ file: migrateLikes.ts:25 ~ likes.map ~ trx04:", trx04);

      if (!trx04?.serialized_trak) return;
      const trak = JSON.parse(trx04.serialized_trak);

      const innerTrak = trak.TRAK.trak;

      await db
        .collection("temp-likes")
        .doc(`04:${trx.split(":")[2]}:${like.userId}`)
        .set({ ...innerTrak, userId: like.userId, likedAt: like.likedAt });
    }
  });

  return res.json({ message: "success" });
};
