import axios from 'axios';

import {
  SPOTIFY_GET_RECOMMENDED_TRACKS,
  SPOTIFY_GET_ARTIST,
} from '../../../../1.api';

/**
 * modified https://stackoverflow.com/questions/2380019/generate-unique-random-numbers-between-1-and-100
 * @returns
 */
export const generate = (tracks: any) => {
  var arr: any = [];
  while (arr.length < 3) {
    var r = Math.floor(Math.random() * tracks.length) + 1;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
};

export const getSeedArray = (tracks: any, indicies: any, loggedIn: boolean) => {
  const feeder: any = [];
  indicies.map((number: any, key: any) => {
    if (loggedIn) {
      const id = tracks[number]
        ? tracks[number].id ?? tracks[number].trackID
        : null;
      feeder.push(id);
    } else feeder.push(tracks[number]);
  });
  return feeder;
};

// export const resolveRecommendTracks = (seeds: any) => {
//   return Promise.resolve(getRecommendedTracks(seeds))
//     .then(hasRecommendedTracks => {
//       return hasRecommendedTracks;
//     })
//     .then(hasRecommendedTracks => {
//       if (hasRecommendedTracks.success) {
//         const recommendedTracks: any = hasRecommendedTracks.response;
//         return recommendedTracks;
//       } else {
//         return 'error';
//       }
//     });
// };

export const getRecommendedTracks = (seeds: string, state: any) => {
  return axios
    .get(SPOTIFY_GET_RECOMMENDED_TRACKS(seeds), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + state.keys.spotify.s_client_token,
      },
    })
    .then(response => {
      return {
        success: true,
        response: response.data.tracks,
      };
    })
    .then(hasRecommendedTracks => {
      if (hasRecommendedTracks.success) {
        const recommendedTracks = hasRecommendedTracks.response;
        // return recommendedTracks;
        return {
          success: true,
          response: recommendedTracks,
        };
        // const tracks = await Promise.all(await getStack(recommendedTracks));
        // console.log(tracks, 'cwuo');
        // return tracks;
      } else {
        return 'error';
      }
    })
    .catch(error => {
      return {
        success: false,
        response: error,
      };
    });
};

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
