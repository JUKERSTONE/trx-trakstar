import { db } from "../../../../firestore";

export const getTLTTrending = (req: any, res: any) => {
  const doc = db.doc("/fundamentals/TRAKLITE");

  return doc
    .get()
    .then((data: any) => {
      return res.json(data.data());
    })
    .catch((error: any) => {
      res.json("error getting trending data");
    });
};
