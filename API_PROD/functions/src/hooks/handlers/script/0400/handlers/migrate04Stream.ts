import { db } from "../../../../../firestore";

export const migrate04Stream = async ({
  trak,
  isrc,
  ytid,
}: {
  trak: any;
  isrc: any;
  ytid: any;
}) => {
  const streamRef = db.doc(`/fundamentals/TRAKSTAR/streaming/trx:04:${ytid}`);

  const streamDoc = (await streamRef.get()).data();
  if (!streamDoc) return;
  console.log("🚀 ~ file: migrate04Stream.ts:26 ~ streamDoc:", streamDoc);

  await db
    .doc(`/fundamentals/TRAKSTAR/streaming/trx:00:${isrc}`)
    .set({
      ...streamDoc,
      uri: `trx:00:${isrc}`,
    })
    .then(() => {
      streamRef.delete();
    });
};
