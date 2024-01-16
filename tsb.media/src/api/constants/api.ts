import {
  handleSpotifyAPI,
  handleBernieAPI,
  handleWalterAPI,
  handleCoinGeckoAPI,
  handleStacksAPI,
} from "./handlers";

export const api = {
  spotify: handleSpotifyAPI,
  bernie: handleBernieAPI,
  walter: handleWalterAPI,
  coingecko: handleCoinGeckoAPI,
  stacks: handleStacksAPI,
};
