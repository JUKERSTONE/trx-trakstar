import {
  handleSpotifyAPI,
  handleBernieAPI,
  handleWalterAPI,
  handleM3DIAAPI,
} from './handlers';

export const api = {
  spotify: handleSpotifyAPI,
  bernie: handleBernieAPI,
  walter: handleWalterAPI,
  m3dia: handleM3DIAAPI,
};
