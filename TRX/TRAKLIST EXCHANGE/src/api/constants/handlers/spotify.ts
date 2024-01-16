export const handleSpotifyAPI = ({method, payload}: any) => {
  const base = 'https://api.spotify.com/v1';
  const me = base + '/me';

  const query = payload?.query;
  const type = payload?.type;
  const isrc = payload?.isrc;
  const ids = payload?.ids;
  const artistId = payload?.artistId;

  switch (method) {
    case 'search':
      return `${base}/search?query=${query}&type=${type}&market=US&offset=0&limit=20`;
    case 'new_releases':
      return `${base}/browse/new-releases`;
    case 'accounts':
      return `https://accounts.spotify.com/api/token`;
    case 'song_isrc':
      return `${base}/search?q=isrc%3A${isrc}&type=track`;
    case 'save-track':
      return `${me}/tracks?ids=${ids}`;
    case 'get-artist':
      return `${base}/artists/${artistId}`;
    case 'top-tracks':
      return `${me}/top/tracks`;
  }
};
