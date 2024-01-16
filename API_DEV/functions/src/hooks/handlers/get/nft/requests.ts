import { db } from "../../../../firestore";

export const getNFTRequests = (req: any, res: any) => {
  const nftRequestsSubCollection = db
    .collection("platforms")
    .doc("BERNIE")
    .collection("requests")
    .doc("trx_00")
    .collection("nft");

  return nftRequestsSubCollection.get().then((data: any) => {
    let requests: any = [];
    data.forEach((doc: any) => {
      requests.push(doc.data());
    });
    return res.json({ requests });
  });
};
