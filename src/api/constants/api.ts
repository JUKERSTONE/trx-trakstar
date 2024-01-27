import {
  handleSpotifyAPI,
  handleBernieAPI,
  handleWalterAPI,
  handleM3DIAAPI,
  handleGeniusAPI,
  handleStacksAPI,
} from './handlers';

export const api = {
  spotify: handleSpotifyAPI,
  bernie: handleBernieAPI,
  genius: handleGeniusAPI,
  walter: handleWalterAPI,
  m3dia: handleM3DIAAPI,
  stacks: handleStacksAPI,
};
