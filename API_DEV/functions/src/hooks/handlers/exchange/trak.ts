import { db } from "../../../firestore";

export const exchangeTrak = (req: any, res: any) => {
  const {
    body: { boughtID, soldID },
  } = req;

  const userId = req.user.userId;

  return db
    .doc("/metaverse/native/protocols/trx_00" + "/trak/" + boughtID)
    .get()
    .then((doc: any) => {
      const trak = doc.data();
      const TRAKDocument = {
        createdAt: new Date(),
        exchangedAt: null,
        trakID: trak.trakID,
        isNFT: trak.isNFT,
        isPrimaryTRAK: trak.isPrimaryTRAK,
        isRare: trak.isRare,
        label: trak.label,
        artist: trak.artist,
        title: trak.title,
        cover_art: trak.cover_art,
        tier: trak.tier,
        hasBlankDisc: false,
        userId,
      };
      db.doc("/platforms/TRAKLIST/users/" + userId + "/trak/" + boughtID).set(
        TRAKDocument
      );
      return TRAKDocument;
    })
    .then((TRAKDocument) => {
      return db
        .doc("/platforms/TRAKLIST/users/" + userId + "/trak/" + soldID)
        .update({ exchangedAt: new Date() })
        .then(() => {
          return res.json(TRAKDocument);
        })
        .catch((err) => {
          return res.json("did not update");
        });
    });
};
