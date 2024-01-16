import { db } from "../../../../firestore";

export const verifyDuplicate = (req: any, res: any) => {
  const {
    body: { artist, title },
  } = req;

  db.collection("currency")
    .where("meta.artist", "==", artist)
    .where("meta.title", "==", title)
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
