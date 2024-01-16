import { db } from "../../../../firestore";

export const getTLTTrending = (req: any, res: any) => {
  const doc = db.doc("/TLT_ADMIN/trending");

  return doc
    .get()
    .then((data: any) => {
      return res.json(data.data());
    })
    .catch((error: any) => {
      res.json("error getting trending data");
    });
};
