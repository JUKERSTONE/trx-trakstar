import {APIKeys} from '../keys';

export const genius = ({method, payload}: any) => {
  const base = 'https://api.genius.com';
  const token = APIKeys.genius.accessToken;
  const {query, geniusId} = payload;

  switch (method) {
    case 'search':
      return `${base}/search?q=${query}`;
    case 'songs':
      return `${base}/songs/${geniusId}`;
    default:
      return '';
  }
};
