import axios from 'axios';
import {SPOTIFY_GET_RECOMMENDED_TRACKS} from '../../../../1.api';

export const getRecommendedTracks = (seeds: string, state: any) => {
  return axios
    .get(SPOTIFY_GET_RECOMMENDED_TRACKS(seeds), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + state.keys.spotify.s_client_token,
      },
    })
    .then((response: any) => {
      return {
        success: true,
        response: response.data.tracks,
      };
    })
    .then((hasRecommendedTracks: any) => {
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
    .catch((error: any) => {
      return {
        success: false,
        response: error,
      };
    });
};
