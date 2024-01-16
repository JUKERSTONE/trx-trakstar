import { generateID } from "../../generate";
import { validateSetTRAK } from "../../validate";

import { db } from "../../../../firestore";

export const setNFT = (req: any, res: any) => {
  const {
    body: {
      isNFT = null /** REQUIRED */,
      trakIPO = null /** REQUIRED */,
      trakIMAGE = null /** REQUIRED */,
      trakAUDIO = null /** REQUIRED */,
      trakTITLE = null /** REQUIRED */,
      trakARTIST = null /** REQUIRED */,
      trakASSET = null /** REQUIRED */,
      trakCOPIES = null /** REQUIRED */,
      trakPRODUCTS = null /** REQUIRED */,
      trakPRICE = null /** REQUIRED */,
      trakFLOOR = null /** REQUIRED */,
      trakIDRef = null /** REQUIRED */,
      minterID = null /** REQUIRED */,
    },
  } = req;

  const userId = req.params.userId;

  const requiredProps = [
    isNFT,
    trakIMAGE,
    trakAUDIO,
    trakIPO,
    trakTITLE,
    trakARTIST,
    trakCOPIES,
    trakPRODUCTS,
    trakFLOOR,
    trakPRICE,
    minterID,
    trakIDRef,
    trakASSET,
  ];

  const isValid = validateSetTRAK(requiredProps);

  switch (isValid) {
    case true:
      const forchainHash = "#forchain";
      const solanaHash = "#solana";
      const nftID = generateID();

      const nftToken: any = {
        forchainHash,
        solanaHash,
        nftID,
        trakIDRef,
        isNFT,
        nft: {
          trakTITLE,
          trakARTIST,
          trakIPO,
          trakIMAGE,
          trakAUDIO,
          trakCOPIES,
          trakPRODUCTS,
          trakFLOOR,
          trakPRICE,
          trakASSET,
        },
        minterID,
        createdAt: new Date().toString(),
      };

      const isStillValid = validateSetTRAK(requiredProps);

      switch (isStillValid) {
        case true:
          return db
            .doc("/metaverse/native/protocols/trx_00" + "/nft/" + nftID)
            .set(nftToken)
            .then((doc) => {
              const trakDocument = db.doc(
                "/metaverse/native/protocols/trx_00" + "/trak/" + trakIDRef
              );
              trakDocument.update({ hasNFT: true });
              // delete requests

              const requestDocument = db.doc(
                "/platforms/BERNIE/requests/trx_00/" + userId + "/" + trakIDRef
              );
              requestDocument.delete();

              return res.json({
                nftToken,
                success: true,
              });
            })
            .catch((error) => res.json("Error - Could not set NFT"));

        case false:
          return res.json("Invalid NFT - Will not publish NFT");
        default:
          return res.json("Invalid NFT");
      }
    case false:
      return res.json("Invalid NFT props - Will not publish NFT");
    default:
      return res.json("Invalid NFT props");
  }

  //   SEND TO SOLANA DATABASE
  //   SEND TO FORCHAIN DATABASE
};
