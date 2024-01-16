import { db } from "../../../firestore";

export const spreadISRC = async ({ req, res }: any) => {
  const TRX = await db
    .collection("TRX")
    .get()
    .then((data) => {
      let track: any = [];
      data.forEach((doc: any) => {
        track.push({ ...doc.data(), uri: doc.id });
      });

      return track;
      //   return res.json("successfully updated");
    });

  TRX.map((track: any) => {
    console.log("🚀 ~ file: transformTRX04.ts:18 ~ trx04.map ~ track:", track);
    const serializedTrak = track.serializedTrak || track.serialized_trak;
    const trak = JSON.parse(serializedTrak);
    const hasISRC = trak?.isrc;

    let mappedTrak = {
      artist: track.artist,
      title: track.title,
      serialized_trak: JSON.stringify({ protocol: "trx-00", TRAK: trak }),
      isrc: track.uri.split(":")[2],
    };

    if (!hasISRC) {
      mappedTrak = {
        artist: track.artist,
        title: track.title,
        serialized_trak: JSON.stringify({
          protocol: "trx-00",
          TRAK: trak.TRAK,
        }),
        isrc: track.uri.split(":")[2],
      };
      //
    } else {
      console.log(
        "🚀 ~ file: spreadIsrc.ts:29 ~ TRX.map ~ mappedTrak:",
        mappedTrak
      );
      return res.json("ISRC already set");
    }

    // if (track.uri) db.collection("TRX").doc(track.uri).set(mappedTrak);
  });

  return res.json("done");
};
