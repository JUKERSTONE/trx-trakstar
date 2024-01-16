import { db } from "../../../../firestore";

export const getNFTMerchandise = (req: any, res: any) => {
  const nftID = req.params.nftID;
  // return res.json({ nftID });
  return db
    .collection("merchandise")
    .where("nftID", "==", nftID)
    .get()
    .then((data: any) => {
      let merchandise: any = [];
      data.forEach((doc: any) => {
        merchandise.push(doc.data());
      });
      return res.json(merchandise);
    });
};
