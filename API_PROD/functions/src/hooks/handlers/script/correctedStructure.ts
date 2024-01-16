import { db } from "../../../firestore";

export const correctDataStructure = async ({ req, res }: any) => {
  const TRX = await db
    .collection("TRX")
    .get()
    .then((data) => {
      let tracks: any = [];
      data.forEach((doc: any) => {
        tracks.push({ ...doc.data(), uri: doc.id });
      });

      return tracks;
    });

  for (const track of TRX) {
    const serializedTrak = track.serializedTrak || track.serialized_trak;
    const trak = JSON.parse(serializedTrak);

    if (trak) {
      // Extracting the keys that should remain on top level
      const {
        comments,
        isLocal,
        isrc,
        likes,
        meta,
        missingProviders,
        ...rest
      } = trak.TRAK;
      console.log(
        "🚀 ~ file: correctedStructure.ts:31 ~ correctDataStructure ~ trak:",
        trak
      );

      const correctedData = {
        protocol: "trx-00",
        TRAK: {
          comments,
          isLocal,
          isrc,
          likes,
          meta,
          missingProviders,
          trak: rest,
        }, // Moving everything else to `trak`
      };

      const mappedTrak = {
        artist: track.artist,
        title: track.title,
        serialized_trak: JSON.stringify(correctedData),
        isrc: track.uri.split(":")[2],
      };
      // console.log(
      //   "🚀 ~ file: correctedStructure.ts:51 ~ correctDataStructure ~ mappedTrak:",
      //   correctedData
      // );

      await db.collection("TRX").doc(track.uri).set(mappedTrak);
    }
  }

  return res.json("Data structure corrected");
};
