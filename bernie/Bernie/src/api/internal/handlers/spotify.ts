import {APIKeys} from '../..';

export const spotify = ({method, payload}: any) => {
  const base = 'https://api.spotify.com/v1';
  const me = `${base}/me`;
  const id = payload?.id;
  const query = payload?.query;
  const type = payload?.type;
  const isrc = payload?.isrc;
  const ids = payload?.ids;
  const artistId = payload?.artistId;
  const albumId = payload?.albumId;
  const trakId = payload?.trakId;
  const trackURI = payload?.trackURI;
  const playlistId = payload?.playlistId;

  switch (method) {
    case 'track':
      return `${base}/tracks/${id}`;
    case 'token':
      return `https://accounts.spotify.com/api/token`;

    case 'search':
      return `${base}/search?query=${query}&type=${type}&market=US&offset=0&limit=20`;
    case 'new_releases':
      return `${base}/browse/new-releases`;
    case 'accounts':
      return `https://accounts.spotify.com/api/token`;
    case 'song_isrc':
      return `${base}/search?q=isrc%3A${isrc}&type=track`;
    case 'song':
      return `${base}/tracks/${trakId}`;
    case 'save-track':
      return `${me}/tracks?ids=${ids}`;
    case 'get-artist':
      return `${base}/artists/${artistId}`;
    case 'get-album':
      return `${base}/albums/${albumId}`;
    case 'top-tracks':
      return `${me}/top/tracks`;
    case 'now-playing':
      return `${me}/player/currently-playing`;
    case 'get-playback':
      return `${me}/player`;
    case 'queue-item':
      return `${me}/player/queue?uri=${trackURI}`;
    case 'get-devices':
      return `${me}/player/devices`;
    case 'recently-played':
      return `${me}/player/recently-played`;
    case 'playlist-tracks':
      return `${me}/playlists/${playlistId}/tracks`;
    case 'audio-features':
      return `${base}/audio-features/${trakId}`;
    default:
      alert('n/a');
      return '';
  }
};
