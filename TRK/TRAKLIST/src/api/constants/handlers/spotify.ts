export const handleSpotifyAPI = ({method, payload}: any) => {
  const base = 'https://api.spotify.com/v1';

  const query = payload?.query;
  const type = payload?.type;

  switch (method) {
    case 'search':
      return `${base}/search?query=${query}&type=${type}&market=US&offset=0&limit=20`;
    case 'new_releases':
      return `${base}/browse/new-releases`;
    case 'accounts':
      return `https://accounts.spotify.com/api/token`;
  }
};
