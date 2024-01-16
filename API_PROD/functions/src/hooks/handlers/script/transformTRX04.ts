import { db } from "../../../firestore";

export const transformTrx04 = async ({ req, res }: any) => {
  const trx04 = await db
    .collection("trx-04")
    .get()
    .then((data) => {
      let track: any = [];
      data.forEach((doc: any) => {
        track.push(doc.data());
      });

      return track;
      //   return res.json("successfully updated");
    });

  trx04.map((track: any) => {
    console.log("🚀 ~ file: transformTRX04.ts:18 ~ trx04.map ~ track:", track);
    const serializedTrak = track.serializedTrak || track.serialized_trak;
    const trak = JSON.parse(serializedTrak);
    const mappedTrak = {
      artist: track.artist,
      title: track.title,
      serialized_trak: JSON.stringify({ protocol: "trx-04", TRAK: trak }),
      ytid: track.ytid,
    };

    if (trak.protocol) return;

    return db
      .collection("trx-04")
      .doc(`trx:04:${mappedTrak.ytid}`)
      .set(mappedTrak);
  });

  return res.json("done");
};
