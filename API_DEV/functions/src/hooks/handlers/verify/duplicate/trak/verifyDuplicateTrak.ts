import { db } from "../../../../../firestore";

export const verifyDuplicateTrak = (req: any, res: any) => {
  const {
    body: { artist, title, isTRX },
  } = req;

  const trakCollection = isTRX ? db.collection("TRX") : db.collection("trx-04");

  trakCollection
    .where("artist", "==", artist)
    .where("title", "==", title)
    .get()
    .then((data: any) => {
      let duplicates: any = [];
      data.forEach((doc: any) => {
        duplicates.push(doc.data());
      });

      if (duplicates === undefined || duplicates.length == 0) {
        return res.json({ hasDuplicates: false });
      }

      return res.json({ hasDuplicates: true, duplicates });
    });
};
