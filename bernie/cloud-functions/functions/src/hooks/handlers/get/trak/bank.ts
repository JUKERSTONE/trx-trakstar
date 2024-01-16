import { db } from "../../../../firestore";

export const getTrakBank = (req: any, res: any) => {
  const trakSubCollection = db
    .collection("metaverse")
    .doc("native")
    .collection("protocols")
    .doc("trx_00")
    .collection("trak");

  return trakSubCollection.get().then((data: any) => {
    let bank: any = {
      trak: [],
      nft: [],
    };
    data.forEach((trak: any) => {
      const trakData = trak.data();

      const {
        artist,
        title,
        cover_art,
        createdAt,
        trakID,
        trakURI,
        isNFT,
        isPrimaryTRAK,
        isRare,
        label,
        tier,
      } = trakData;

      bank.trak.push({
        createdAt,
        trakID,
        trakURI,
        isNFT,
        isPrimaryTRAK,
        isRare,
        label,
        artist,
        title,
        cover_art,
        tier,
      });
    });

    const nftSubCollection = db
      .collection("metaverse")
      .doc("native")
      .collection("protocols")
      .doc("trx_00")
      .collection("nft");

    return nftSubCollection.get().then((data: any) => {
      data.forEach((item: any) => {
        bank.nft.push(item.data());
      });
      return res.json(bank);
    });
  });
};
