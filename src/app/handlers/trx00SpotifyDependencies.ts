import axios from 'axios';
import {api, useAPI} from '../../api';

export const handleTRX00SpotifyDependancies = async ({
  id,
  accessToken,
}: {
  id: string;
  accessToken: string;
}) => {
  console.log('🚀 ~ file: trx00SpotifyDependencies.ts:10 ~ id:', id);
  const {useGET} = useAPI();

  const route = api.bernie({method: 'get-genre', payload: {trakID: id}});
  const route1 = api.spotify({
    method: 'audio-features',
    payload: {trakId: id},
  });
  console.log('🚀 ~ file: trx00SpotifyDependencies.ts:13 ~ route:', route);

  const trx00SpotifyDependencies = await axios
    .all([
      axios.get(route, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      }),
      axios.get(route1, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      }),
    ])
    .then(
      axios.spread((data1, data2) => {
        console.log(
          '🚀 ~ file: trx00SpotifyDependencies.ts:38 ~ axios.spread ~ data2:',
          data2,
        );
        console.log(
          '🚀 ~ file: trx00SpotifyDependencies.ts:38 ~ axios.spread ~ data1:',
          data1,
        );

        const audioFeatures = {
          acousticness: data2.data.acousticness,
          danceability: data2.data.danceability,
          energy: data2.data.energy,
          instrumentalness: data2.data.instrumentalness,
          liveness: data2.data.liveness,
          loudness: data2.data.loudness,
          speechiness: data2.data.speechiness,
          tempo: data2.data.tempo,
          valence: data2.data.valence,
        };

        return {
          audioFeatures,
          genres: data1.data.genre,
          isrc: data1.data.isrc,
        };
      }),
    )
    .catch(error => {
      console.log(error);
      return {
        audioFeatures: {
          acousticness: 0,
          danceability: 0,
          energy: 0,
          instrumentalness: 0,
          liveness: 0,
          loudness: 0,
          speechiness: 0,
          tempo: 0,
          valence: 0,
        },
        genres: null,
        isrc: null,
      };
    });

  return trx00SpotifyDependencies;
};
