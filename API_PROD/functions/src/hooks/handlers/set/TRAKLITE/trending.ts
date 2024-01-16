import { db } from "../../../../firestore";

export const setTLTTrending = (req: any, res: any) => {
  const {
    body: { data },
  } = req;

  const doc = db.doc("/fundamentals/TRAKLITE");
  return doc
    .update({ trending: data })
    .then(() => {
      res.json("successfully updated trending data");
    })
    .catch((error: any) => {
      res.json("error updating trending data");
    });
};
