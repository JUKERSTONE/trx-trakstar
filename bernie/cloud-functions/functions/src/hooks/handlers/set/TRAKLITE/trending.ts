import { db } from "../../../../firestore";

export const setTLTTrending = (req: any, res: any) => {
  const { body: data } = req;

  const doc = db.doc("/TLT_ADMIN/trending");
  return doc
    .set(data)
    .then(() => {
      res.json("updated trending data");
    })
    .catch((error: any) => {
      res.json("error updating trending data");
    });
};
