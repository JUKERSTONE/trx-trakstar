import { db } from "../../../../firestore";

export const getNFT = (req: any, res: any) => {
  const id = req.params.id;
  //

  return db
    .collection("currency")
    .where("nftID", "==", id)
    .get()
    .then((data: any) => {
      let nft: any = [];
      data.forEach((doc: any) => {
        nft.push(doc.data());
      });
      return res.json(nft[0]);
    });
};
