import { db } from "../../../firestore";

export const appendHasNFTToTRAK = (req: any, res: any) => {
  db.collection("currency")
    .get()
    .then((data: any) => {
      data.forEach((doc: any) => {
        doc.ref.update({ hasNFT: false });
      });
      return res.json("successfully updated");
    });
};
