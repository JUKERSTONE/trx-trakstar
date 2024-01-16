import { db } from "../../../../firestore";

export const getUserWallet = (req: any, res: any) => {
  const userId = req.user.userId;

  const trakSubCollection = db
    .collection("platform")
    .doc("TRAKLIST")
    .collection("users")
    .doc(userId)
    .collection("trak");

  const nftSubCollection = db
    .collection("platform")
    .doc("TRAKLIST")
    .collection("users")
    .doc(userId)
    .collection("nft");

  return trakSubCollection
    .where("exchangedAt", "==", null)
    .get()
    .then((data: any) => {
      let wallet: any = {
        trak: [],
        nft: [],
      };
      data.forEach((doc: any) => {
        const data = doc.data();
        wallet.trak.push(data);
      });

      nftSubCollection
        .where("exchangedAt", "==", null)
        .get()
        .then((data: any) => {
          data.forEach((doc: any) => {
            const data = doc.data();
            wallet.nft.push(data);
          });
          return res.json(wallet);
        });
    });
};
