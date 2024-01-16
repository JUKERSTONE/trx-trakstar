import { db } from "../../../../firestore";

export const setTLTNews = (req: any, res: any) => {
  const { body: data } = req;

  const doc = db.doc("/TLT_ADMIN/news");
  return doc
    .set({ news: data })
    .then(() => {
      res.json("updated news data");
    })
    .catch((error: any) => {
      res.json("error updating news data");
    });
};
