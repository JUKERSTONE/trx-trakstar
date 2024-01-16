import { db } from "../../../firestore";

export const migrateSpotifyUriToId = async ({ req, res }: any) => {
  await db
    .collection("trx-04")
    .get()
    .then((data) => {
      data.forEach(async (doc) => {
        const trak = doc.data();
        if (!trak.serialized_trak) return;
        const deSerializedTrak = JSON.parse(trak.serialized_trak);
        if (
          deSerializedTrak.TRAK.trak.spotify?.uri &&
          deSerializedTrak.TRAK.trak.spotify?.uri.split(":")[2]
        ) {
          const spotify = {
            id: deSerializedTrak.TRAK.trak.spotify?.uri.split(":")[2],
          };

          const updatedSerializedTrak = {
            ...deSerializedTrak,
            TRAK: {
              ...deSerializedTrak.TRAK,
              trak: {
                ...deSerializedTrak.TRAK.trak,
                spotify,
              },
            },
          };
          console.log(
            "🚀 ~ file: migrateSpotifyUriToId.ts:21 ~ data.forEach ~ updatedSerializedTrak:",
            updatedSerializedTrak
          );
          await db
            .collection("trx-04")
            .doc(doc.id)
            .update({
              serialized_trak: JSON.stringify(updatedSerializedTrak),
            });
        }
      });
    });

  return res.json({ message: "success" });
};
