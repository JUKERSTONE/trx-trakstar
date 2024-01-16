import axios from 'axios';
import {useAsyncStorage, asyncStorageIndex} from '../../../../stores';
import {useLITELISTState} from '../../../useLITELISTState';
import {
  SPOTIFY_CURRENT_USER,
  SPOTIFY_GET_PLAYLISTS,
  SPOTIFY_GET_TOP_TRACKS,
  SPOTIFY_GET_TOP_ARTISTS,
  SPOTIFY_GET_RECENTLY_PLAYED,
} from '../../../../api';

const queryString = require('query-string');

export const spotifyProfileRefresh = async (accessToken: any) => {
  console.log(
    '🚀 ~ file: profileRefresh.ts ~ line 15 ~ spotifyProfileRefresh ~ accessToken',
    accessToken,
  );
  const {handleGetState} = useLITELISTState();

  const profile = handleGetState({index: 'profile'});
  console.log(
    '🚀 ~ file: profileRefresh.ts ~ line 18 ~ spotifyProfileRefresh ~ profile',
    profile,
  );
  const traklandProfile = profile.trakland;
  console.log(
    '🚀 ~ file: profileRefresh.ts ~ line 19 ~ spotifyProfileRefresh ~ traklandProfile',
    traklandProfile,
  );
  const spotify = traklandProfile.spotify;
  console.log(
    '🚀 ~ file: profileRefresh.ts ~ line 28 ~ spotifyProfileRefresh ~ spotify',
    spotify,
  );
  // const access_token = spotify.accessToken;
  // console.log(
  //   '🚀 ~ file: profileRefresh.ts ~ line 21 ~ spotifyProfileRefresh ~ access_token',
  //   access_token,
  // );

  return axios
    .all([
      axios.get(SPOTIFY_CURRENT_USER, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      }),
      axios.get(SPOTIFY_GET_PLAYLISTS, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      }),
      axios.get(SPOTIFY_GET_TOP_TRACKS, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      }),
      axios.get(SPOTIFY_GET_TOP_ARTISTS, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      }),
      axios.get(SPOTIFY_GET_RECENTLY_PLAYED, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      }),
    ])
    .then(
      axios.spread((data1, data2, data3, data4, data5) => {
        console.log(
          '🚀 ~ file: profileRefresh.ts ~ line 77 ~ axios.spread ~ data1',
          data1,
        );
        const user = data1.data;
        const playlists = data2.data.items;
        const topTracks = data3.data.items;
        const topArtists = data4.data.items;
        const recentlyPlayed = data5.data.items;
        return {
          user,
          playlists,
          topArtists,
          topTracks,
          recentlyPlayed,
        };
      }),
    )
    .catch(error => {
      return {
        success: false,
        data: error,
      };
    });
};
