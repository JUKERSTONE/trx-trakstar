import { db } from "../../../firestore";

export const purchaseNFT = (req: any, res: any) => {
  const id = req.params.nftID;
  const userId = req.user.userId;
  const market = req.body.market;
  const blockchain = req.body.blockchain;

  return db
    .doc("/metaverse/native/protocols/trx_00" + "/nft/" + id)
    .get()
    .then((doc: any) => {
      const nft = doc.data();
      const NFTDocument = {
        purchasedAt: new Date(),
        exchangedAt: null,
        market,
        blockchain,
        userId,
        ...nft,
      };
      db.doc("/platforms/TRAKLIST/users/" + userId + "/nft/" + id).set(
        NFTDocument
      );
      return nft;
    })
    .then((nftDoc: any) => {
      const nftItem = nftDoc.nft;

      if (nftItem.trakCOPIES[market] === 0) {
        return res.json("no more copies left");
      }

      const updatedNFTItem = {
        ...nftItem,
        trakCOPIES: {
          ...nftItem.trakCOPIES,
          [market]: nftItem.trakCOPIES[market] - 1,
        },
        // nftItem.trakCOPIES[market] !== 0 ? nftItem.trakCOPIES[market] - 1 : 0,
        trakPRICE: nftItem.trakPRICE + nftItem.trakIPO * 0.03,
      };

      db.doc("/metaverse/native/protocols/trx_00" + "/nft/" + id)
        .update({ nft: updatedNFTItem })
        .then(() => {
          return res.json({
            ...nftDoc,
            nft: updatedNFTItem,
            market,
          });
        })
        .catch((error: any) => {
          return res.json("not updated");
        });
    });
};
