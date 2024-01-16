import { validateAppendTRAK } from "../validate";
import { db } from "../../../firestore";

export const appendTRAK = (req: any, res: any) => {
  const {
    body: {
      trakURI = null,
      trakIPO = null,
      trakIMAGE = null,
      trakAUDIO = null,
      trakVIDEO = null,
      subscriptions = null,
      apple_music = null,
      genius = null,
    },
  } = req;

  const requiredPropsWeb = [apple_music, genius];
  const requiredPropsNFT = [
    trakIPO,
    trakIMAGE,
    trakAUDIO,
    trakVIDEO,
    subscriptions,
  ];

  const type: "nft" | "web" | "both" | null = validateAppendTRAK({
    requiredPropsWeb,
    requiredPropsNFT,
  });

  const tokenDocument = db.doc("/currency/" + trakURI);

  switch (type) {
    case "both":
      return tokenDocument
        .update({
          web: { apple_music, genius },
          nft: { trakIPO, trakIMAGE, trakAUDIO, trakVIDEO, subscriptions },
        })
        .catch((error) => res.json("Error - Could not set TRAK"));
    case "nft":
      return tokenDocument
        .update({
          nft: { trakIPO, trakIMAGE, trakAUDIO, trakVIDEO, subscriptions },
        })
        .catch((error) => res.json("Error - Could not set TRAK"));
    case "web":
      return tokenDocument
        .update({
          web: { apple_music, genius },
        })
        .catch((error) => res.json("Error - Could not set TRAK"));
    default:
      return res.json("Invalid TRAK props - Could not append TRAK");
  }
};
