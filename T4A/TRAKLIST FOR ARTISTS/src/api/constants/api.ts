import {handleSpotifyAPI, handleBernieAPI, genius} from './handlers';

export const api = {
  spotify: ({method, payload}: any) => handleSpotifyAPI({method, payload}),
  bernie: ({method, payload}: any) => handleBernieAPI({method, payload}),
  genius: ({method, payload}: any) => genius({method, payload}),
};
