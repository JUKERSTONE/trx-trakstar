import {SOUNDCLOUD_CLIENT_ID} from '../auth';

export const SOUNDCLOUD_SEARCH_TRACKS = (query: string) =>
  'https://api-v2.soundcloud.com/search/tracks?q=' +
  query +
  '&client_id=' +
  SOUNDCLOUD_CLIENT_ID +
  '&limit=20';
