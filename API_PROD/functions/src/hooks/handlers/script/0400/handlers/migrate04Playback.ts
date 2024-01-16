import { db } from "../../../../../firestore";

export const migrate04Playback = async ({
  trak,
  isrc,
  ytid,
}: {
  trak: any;
  isrc: any;
  ytid: any;
}) => {
  const users = await db
    .collection("users")
    .get()
    .then((data) => {
      let users: any = [];
      data.forEach((doc) => {
        users.push(doc.id);
      });
      return users;
    });

  users.map(async (id: string) => {
    const streamRef = db.doc(`/users/${id}/playback/trx:04:${ytid}`);

    const streamDoc = (await streamRef.get()).data();

    if (!streamDoc) return;
    console.log(
      "🚀 ~ file: migrate04Playback.ts:27 ~ users.map ~ streamDoc:",
      streamDoc
    );

    await db
      .doc(`/users/${id}/playback/trx:00:${isrc}`)
      .set({
        ...streamDoc,
        uri: `trx:00:${isrc}`,
      })
      .then(() => {
        streamRef.delete();
      });
  });
};
