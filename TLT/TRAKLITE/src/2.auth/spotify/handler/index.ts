import axios from 'axios';

import {
  SPOTIFY_CURRENT_USER,
  SPOTIFY_GET_PLAYLISTS,
  SPOTIFY_GET_TOP_TRACKS,
  SPOTIFY_GET_TOP_ARTISTS,
  SPOTIFY_GET_RECENTLY_PLAYED,
} from '../../../1.api';

/**
 * User Content Data
 * @param tokenDetails - this provides the refresh and access tokens
 * @returns
 */
export async function userContentData(tokenDetails: any) {
  return axios
    .all([
      axios.get(SPOTIFY_CURRENT_USER, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + tokenDetails.access_token,
        },
      }),
      axios.get(SPOTIFY_GET_PLAYLISTS, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + tokenDetails.access_token,
        },
      }),
      axios.get(SPOTIFY_GET_TOP_TRACKS, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + tokenDetails.access_token,
        },
      }),
      axios.get(SPOTIFY_GET_TOP_ARTISTS, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + tokenDetails.access_token,
        },
      }),
      axios.get(SPOTIFY_GET_RECENTLY_PLAYED, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + tokenDetails.access_token,
        },
      }),
    ])
    .then(
      axios.spread((data1, data2, data3, data4, data5) => {
        const playlists = data2.data.items;
        const top_tracks = data3.data.items;
        const top_artists = data4.data.items;
        const recently_played = data5.data.items;
        const response = {
          ...data1.data,
          playlists,
          top_artists,
          top_tracks,
          recently_played,
        };

        return {
          success: true,
          data: response,
        };
      }),
    )
    .catch(error => {
      return {
        success: false,
        data: error,
      };
    });
}
