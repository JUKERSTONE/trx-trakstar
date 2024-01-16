import { db } from "../../../../firestore";

export const getTLTNews = (req: any, res: any) => {
  const doc = db.doc("/fundamentals/TRAKLITE");

  return doc
    .get()
    .then((data: any) => {
      return res.json(data.data());
    })
    .catch((error: any) => {
      res.json("error getting news data");
    });
};
