import {MUSIXMATCH_API_KEY} from '../auth/';

export const MUSIXMATCH = 'https://api.musixmatch.com/ws/1.1';

export const MUSIXMATCH_GET_LYRICS = (isrc: string) =>
  MUSIXMATCH +
  '/track.lyrics.get?format=json&callback=callback&track_isrc=' +
  isrc +
  '&apikey=' +
  MUSIXMATCH_API_KEY;
