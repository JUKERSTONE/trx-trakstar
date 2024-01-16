export const handleSpotifyAPI = ({method, payload}: any) => {
  const base = 'https://api.spotify.com/v1';

  const {query, type} = payload;

  switch (method) {
    case 'search':
      return `${base}/search?query=${query}&type=${type}&market=US&offset=0&limit=20`;
  }
};
