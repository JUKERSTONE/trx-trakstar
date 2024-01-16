import { db } from "../../../../firestore";

export const getArtistPortfolio = (req: any, res: any) => {
  const userId = req.user.userId;

  const nftSubCollection = db
    .collection("platform")
    .doc("TRAKLIST")
    .collection("users")
    .doc(userId)
    .collection("nft");

  return nftSubCollection
    .where("minterID", "==", userId)
    .get()
    .then((data: any) => {
      let portfolio: any = [];
      data.forEach((doc: any) => {
        portfolio.push(doc.data());
      });
      return res.json(portfolio);
    });
};
