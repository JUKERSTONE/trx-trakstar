import { db } from "../../../../firestore";

export const getUserNFT = (req: any, res: any) => {
  const username = req.params.username;

  return db
    .collection("nft")
    .where("username", "==", username)
    .where("exchangedAt", "==", null)
    .get()
    .then((data: any) => {
      let nft: any[] = [];
      data.forEach((doc: any) => {
        const data = doc.data();
        nft.push(data);
      });
      // console.log("🚀 ~ file: nft.ts ~ line 12 ~ .then ~ data", data);
      res.json(nft);
    });
};
