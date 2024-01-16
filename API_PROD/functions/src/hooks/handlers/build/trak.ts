// import { generateTRAKID, generateTRAKURI } from "../generate";
// import { verifyCentralized } from "../verify";
// import { validateSetTRAK } from "../validate";

// import { constants } from "../../../core";

// const { trak } = constants;

export const buildTRAK = ({ req, res }: any) => {
  // res.json("Hello");
  // const {
  //   body: {
  //     isrc = null /** REQUIRED */,
  //     type = null /** REQUIRED */,
  //     isNFT = null /** REQUIRED */,
  //     trakIPO = null,
  //     trakIMAGE = null,
  //     trakAUDIO = null,
  //     trakVIDEO = null,
  //     subscriptions = null,
  //     spotify = null /** REQUIRED */,
  //     apple_music = null,
  //     genius = null,
  //   },
  // } = req;
  // const requiredProps = [isrc, type, isNFT, spotify];
  // const isValid = validateSetTRAK(requiredProps);
  // switch (isValid) {
  //   case true:
  //     const forchainHash = "generateTRAKID()";
  //     const solanaHash = "generateTRAKID()";
  //     const trakID = generateTRAKID();
  //     const trakURI = generateTRAKURI({ trak, type, trakID });
  //     const centralized = [spotify, apple_music, genius];
  //     const missingCentralizedPrimary: any[] = verifyCentralized(centralized);
  //     const trakToken: any = {
  //       forchainHash,
  //       solanaHash,
  //       trakID,
  //       trakURI,
  //       subscriptions,
  //       isrc,
  //       type,
  //       missingCentralizedPrimary,
  //       isNFT,
  //       web: {
  //         spotify,
  //         apple_music,
  //         genius,
  //       },
  //       content: {
  //         trakIPO,
  //         trakIMAGE,
  //         trakAUDIO,
  //         trakVIDEO,
  //       },
  //     };
  //     const isStillValid = validateSetTRAK(requiredProps);
  //     switch (isStillValid) {
  //       case true:
  //         const symbolizedTRAKToken = Symbol(trakToken);
  //         return symbolizedTRAKToken;
  //       case false:
  //         return "Invalid TRAK - Will not publish TRAK";
  //       default:
  //         return "Invalid TRAK";
  //     }
  //   case false:
  //     return "Invalid TRAK props - Will not publish TRAK";
  //   default:
  //     return "Invalid TRAK props";
  // }
};
