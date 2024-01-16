import axios from 'axios';
import {
  SPOTIFY_TRACKS,
  // SAVE_POST_ROUTE,
  SPOTIFY_GET_TRACK,
  SPOTIFY_GET_ARTIST,
} from '../../../../api';

export const getStack = (tracks: any, state: any) => {
  // console.log(tracks, 'preview?');
  if (!tracks) return;
  const result = Promise.all(
    tracks?.map(async (track: any, key: any) => {
      const hasArtist = await getArtist(track.artists[0].id, state);
      console.log(
        '🚀 ~ file: index.ts ~ line 87 ~ tracks?.map ~ hasArtist',
        hasArtist,
      );

      if (hasArtist.success) {
        return {
          artist: {
            followers: hasArtist.response.followers?.total,
            image: hasArtist.response.images[0]?.url,
            popularity: hasArtist.response.popularity,
            id: hasArtist.response.id,
            name: hasArtist.response.name,
          },
          track: {
            name: track.name,
            release_date: track.album.release_date,
            popularity: track.popularity,
            id: track.id,
            explicit: track.explicit,
            artist: track.artists[0].name,
            album: track.album.name,
            artwork: track.album.images[0].url,
            album_id: track.album.id,
            preview_url: track.preview_url,
            spotifyData: {
              ...track,
            },
          },
        };
      }
    }),
  );
  return result;
};

export const getArtist = (id: string, state: any) => {
  return axios
    .get(SPOTIFY_GET_ARTIST(id), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + state.keys.spotify.s_client_token,
      },
    })
    .then(response => {
      return {
        success: true,
        response: response.data,
      };
    })
    .catch(error => {
      return {
        success: false,
        response: error,
      };
    });
};
