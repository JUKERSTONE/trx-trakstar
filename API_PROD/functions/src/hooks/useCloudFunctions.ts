import {
  setTRAK,
  appendTRAK,
  findTRAK,
  searchTRAK,
  listenTRAK,
  watchCurrency,
  raffleTRAK,
  verifyDuplicate,
  getUserTRAK,
  requestNFT,
  getNFTRequests,
  getNFTRequest,
  appendHasNFTToTRAK,
  setNFT,
  purchaseNFT,
  getUserNFT,
  getNFT,
  getUserWallet,
  getArtistPortfolio,
  appendNFTMerchandise,
  getNFTMerchandise,
  test,
  setTLTTrending,
  getTLTTrending,
  setTLTNews,
  getTLTNews,
  //
  setTrak,
  verifyDuplicateTrak,
  setTrakRaffle,
  getTrak,
  getTrakBank,
  exchangeTrak,
  // getTRAKLISTAccess,
  TUCStoreValue,
  handleSwapToken,
  handleRefreshToken,
  triggerBeReal,
  viewBeRealNotification,
  //
  stripePaymentIntent,
  // migrateSessions,
  // deleteUserPlayback,
  transformTrx04,
  spreadISRC,
} from "./handlers";

export const useCloudFunctions = () => {
  const setTRAKFunction = setTRAK;
  const appendTRAKFunction = appendTRAK;
  const findTRAKFunction = findTRAK;
  const watchCurrencyFunction = watchCurrency;
  const listenTRAKFunction = listenTRAK;
  const listenJUKEFunction = listenTRAK;
  const listenPATRONFunction = listenTRAK;
  const searchTRAKFunction = searchTRAK;
  const raffleFreeFunction = raffleTRAK;
  const verifyDuplicateFunction = verifyDuplicate;
  const getUserTRAKFunction = getUserTRAK;
  const requestNFTFunction = requestNFT;
  const getNFTRequestsFunction = getNFTRequests;
  const getNFTRequestFunction = getNFTRequest;
  const scriptHasNFTFunction = appendHasNFTToTRAK;
  const setNFTFunction = setNFT;
  const purchaseNFTFunction = purchaseNFT;
  const getUserNFTFunction = getUserNFT;
  const getNFTFunction = getNFT;
  const getUserWalletFunction = getUserWallet;
  const getArtistPortfolioFunction = getArtistPortfolio;
  const appendNFTMerchandiseFunction = appendNFTMerchandise;
  const getNFTMerchandiseFunction = getNFTMerchandise;
  const check = test;
  const setTLTTrendingFunction = setTLTTrending;
  const getTLTTrendingFunction = getTLTTrending;
  const setTLTNewsFunction = setTLTNews;
  const getTLTNewsFunction = getTLTNews;
  //
  const setTrakFunction = setTrak;
  const verifyDuplicateTrakFunction = verifyDuplicateTrak;
  const setTrakRaffleFunction = setTrakRaffle;
  const getTrakFunction = getTrak;
  const getTrakBankFunction = getTrakBank;
  const exchangeTrakFunction = exchangeTrak;
  const TUCStoreValueFunction = TUCStoreValue;
  const handleSwapTokenFunction = handleSwapToken;
  const handleRefreshTokenFunction = handleRefreshToken;
  const triggerBeRealFunction = triggerBeReal;
  const viewBeRealNotificationFunction = viewBeRealNotification;
  //
  const stripePaymentIntentFunction = stripePaymentIntent;
  // const migrateSessionsFunctions = deleteUserPlayback;
  const transformTrx04Function = transformTrx04;
  const spreadISRCFunction = spreadISRC;

  return {
    setTRAKFunction,
    appendTRAKFunction,
    findTRAKFunction,
    searchTRAKFunction,
    watchCurrencyFunction,
    listenTRAKFunction,
    listenPATRONFunction,
    listenJUKEFunction,
    raffleFreeFunction,
    verifyDuplicateFunction,
    getUserTRAKFunction,
    requestNFTFunction,
    getNFTRequestsFunction,
    getNFTRequestFunction,
    scriptHasNFTFunction,
    setNFTFunction,
    purchaseNFTFunction,
    getUserNFTFunction,
    getNFTFunction,
    getUserWalletFunction,
    getArtistPortfolioFunction,
    appendNFTMerchandiseFunction,
    getNFTMerchandiseFunction,
    check,
    setTLTTrendingFunction,
    getTLTTrendingFunction,
    setTLTNewsFunction,
    getTLTNewsFunction,
    //
    setTrakFunction,
    verifyDuplicateTrakFunction,
    setTrakRaffleFunction,
    getTrakFunction,
    getTrakBankFunction,
    exchangeTrakFunction,
    // getTRAKLISTAccessFunction,
    TUCStoreValueFunction,
    handleSwapTokenFunction,
    handleRefreshTokenFunction,
    triggerBeRealFunction,
    viewBeRealNotificationFunction,
    //
    stripePaymentIntentFunction,
    // migrateSessionsFunctions,
    transformTrx04Function,
    spreadISRCFunction,
  };
};
