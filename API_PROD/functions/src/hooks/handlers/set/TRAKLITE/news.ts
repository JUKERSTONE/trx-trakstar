import { db } from "../../../../firestore";

export const setTLTNews = (req: any, res: any) => {
  const {
    body: { data },
  } = req;

  const doc = db.doc("/fundamentals/TRAKLITE");
  return doc
    .update({ news: data })
    .then(() => {
      res.json("successfully updated trending data");
    })
    .catch((error: any) => {
      res.json("error updating trending data");
    });
};
