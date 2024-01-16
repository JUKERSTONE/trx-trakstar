import { db } from "../../../../firestore";

export const getTrak = (req: any, res: any) => {
  const id = req.params.trakId;

  return db
    .doc("/metaverse/native/protocols/trx_00" + "/trak/" + id)
    .get()
    .then((doc: any) => {
      return res.json(doc.data());
    });
};
