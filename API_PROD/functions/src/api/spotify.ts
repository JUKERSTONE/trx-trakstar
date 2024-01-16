/**
 * Spotify Base API Route
 */
export const SPOTIFY_ACCOUNTS = 'https://accounts.spotify.com/api/token';

/**
 * Spotify Base API Route
 */
const SPOTIFY = 'https://api.spotify.com/v1';

/**
 * Spotify Basic Current User Data Route
 */
export const SPOTIFY_CURRENT_USER = SPOTIFY + '/me';

/**
 * Spotify Current Users Playlists Route
 */
export const SPOTIFY_GET_PLAYLISTS = SPOTIFY + '/me/playlists';

/**
 * Spotify Current Users Playlists Route
 */
export const SPOTIFY_PLAYLIST_ITEMS = (id: string) =>
  SPOTIFY + '/playlists/' + id + '/tracks';

// https://api.spotify.com/v1/playlists/{playlist_id}/tracks

/**
 * Spotify Current Users Top Tracks Route
 */
export const SPOTIFY_GET_TOP_TRACKS = SPOTIFY + '/me/top/tracks';

/**
 * Spotify Current Users Top Artists Route
 */
export const SPOTIFY_GET_TOP_ARTISTS = SPOTIFY + '/me/top/artists';

/**
 * Spotify Current Users Recently Played Route
 */
export const SPOTIFY_GET_RECENTLY_PLAYED =
  SPOTIFY + '/me/player/recently-played';

/**
 * Spotify Current Users Recommended Tracks Route
 * @param seeds
 * @returns
 */
export const SPOTIFY_GET_RECOMMENDED_TRACKS = (seeds: string) =>
  SPOTIFY + '/recommendations?limit=15&seed_tracks=' + seeds;

/**
 * Spotify Get Artists Route
 * @param artists
 * @returns
 */
export const SPOTIFY_GET_ARTIST = (artists: string) =>
  SPOTIFY + '/artists/' + artists;

/**
 * Spotify Get Track Route
 * @param id
 * @returns
 */
export const SPOTIFY_GET_TRACK = (id: string) => SPOTIFY + '/tracks/' + id;

/**
 * Spotify Get Audio Features Route
 * @param id
 * @returns
 */
export const SPOTIFY_GET_AUDIO_FEATURES = (id: string) =>
  SPOTIFY + '/audio-features/' + id;

/**
 * Spotify Search Route
 * @param track
 * @param type
 * @returns
 */
export const SPOTIFY_SEARCH = (query: string, type: string) =>
  SPOTIFY +
  '/search?query=' +
  query +
  '&type=' +
  type +
  '&market=US&offset=0&limit=20';

export const SPOTIFY_TRACKS = (option: 'save' | 'saved', ids?: string) => {
  switch (option) {
    case 'save':
      return SPOTIFY_CURRENT_USER + '/tracks?ids=' + ids;
    case 'saved':
      return SPOTIFY_CURRENT_USER + '/tracks?US';
  }
};

export const SPOTIFY_DELETE_TRACKS = (ids?: string) =>
  SPOTIFY_CURRENT_USER + '/tracks?ids=' + ids;

export const SPOTIFY_SAVE_ALBUMS = SPOTIFY_CURRENT_USER + '/albums';

export const SPOTIFY_NEW_RELEASES = SPOTIFY + '/browse/new-releases';

export const SPOTIFY_GET_ALBUM = (id?: string) => SPOTIFY + '/albums/' + id;

export const SPOTIFY_GET_ARTIST_TOP_TRACKS = (id?: string) =>
  SPOTIFY + '/artists/' + id + '/top-tracks?market=US';

export const SPOTIFY_GET_ARTIST_ALBUMS = (id?: string) =>
  SPOTIFY + '/artists/' + id + '/albums';

export const SPOTIFY_GET_ARTIST_RELATED_ARTISTS = (id?: string) =>
  SPOTIFY + '/artists/' + id + '/related-artists';
