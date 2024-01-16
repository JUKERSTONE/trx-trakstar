import { db } from "../../../../firestore";

export const getNFTRequest = (req: any, res: any) => {
  const trakID = req.params.trakID;
  const requestDocument: any = db.doc(`/verify/${trakID}`);

  return requestDocument
    .get()
    .then((doc: any) => {
      return doc.data();
    })
    .then((data: any) => {
      return db
        .doc(`/currency/TRX:${data.type}:${data.trakID}`)
        .get()
        .then((doc: any) => {
          return res.json({
            ...data,
            trak: doc.data(),
          });
        });
    });
};
