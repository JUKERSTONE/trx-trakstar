import axios from 'axios';
import {SPOTIFY_GET_RECOMMENDED_TRACKS} from '../../../../api';

export const getRecommendedTracks = (seeds: string, clientToken: any) => {
  return axios
    .get(SPOTIFY_GET_RECOMMENDED_TRACKS(seeds), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + clientToken,
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
