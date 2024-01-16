import { generateID } from "../../../generate";
import { verifyCentralized } from "../../../verify";
import { validateSetTRAK } from "../../../validate";

import { db } from "../../../../../firestore";

export const setTrak = (req: any, res: any) => {
  const {
    body: {
      artist = null /** REQUIRED */,
      title = null /** REQUIRED */,
      cover_art = null /** REQUIRED */,
      isrc = null,
      isPrimaryTRAK = null /** REQUIRED */,
      isNFT = null /** REQUIRED */,
      label = null /** REQUIRED */,
      isRare = null /** REQUIRED */,
      tier = null /** REQUIRED */,
      spotify = null,
      apple_music = null,
      genius = null,
      soundcloud = null,
      youtube = null,
      meta = null /** REQUIRED */,
    },
  } = req;

  const requiredProps = [
    artist,
    title,
    cover_art,
    isPrimaryTRAK,
    isNFT,
    label,
    isRare,
    tier,
    meta,
  ];
  const isValid = validateSetTRAK(requiredProps);

  switch (isValid) {
    case true:
      const forchainHash = "#forchain";
      const solanaHash = "#solana";
      const trakID = generateID();
      const centralized = [spotify, apple_music, genius, soundcloud, youtube];
      const missingCentralizedPrimary: any[] = verifyCentralized(centralized);

      const trakToken: any = {
        artist,
        title,
        cover_art,
        forchainHash,
        solanaHash,
        isPrimaryTRAK,
        trakID,
        isrc,
        missingCentralizedPrimary,
        isNFT,
        hasNFT: false,
        label,
        isRare,
        tier,
        web: {
          spotify,
          apple_music,
          genius,
          youtube,
          soundcloud,
        },
        meta,
        createdAt: new Date().toString(),
      };

      const isStillValid = validateSetTRAK(requiredProps);

      switch (isStillValid) {
        case true:
          return db
            .doc("/metaverse/native/protocols/trx_00" + "/trak/" + trakID)
            .set(trakToken)
            .then(() => {
              return res.json({
                trakToken,
                success: true,
              });
            })
            .catch((error) => res.json("Error - Could not set TRAK"));

        case false:
          return res.json("Invalid TRAK - Will not publish TRAK");
        default:
          return res.json("Invalid TRAK");
      }
    case false:
      return res.json("Invalid TRAK props - Will not publish TRAK");
    default:
      return res.json("Invalid TRAK props");
  }

  //   SEND TO SOLANA DATABASE
  //   SEND TO FORCHAIN DATABASE
};
