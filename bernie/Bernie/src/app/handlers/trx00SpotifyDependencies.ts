import axios from 'axios';
import {routes, useAPI} from '../../api';

export const handleTRX00SpotifyDependancies = async ({
  id,
  accessToken,
  isrc,
}: {
  id?: string;
  accessToken: string;
  isrc?: string;
}) => {
  console.log(
    '🚀 ~ file: trx00SpotifyDependencies.ts:11 ~ accessToken:',
    accessToken,
  );
  console.log('🚀 ~ file: trx00SpotifyDependencies.ts:10 ~ id:', id);

  if (isrc) {
    const route = routes.spotify({
      method: 'song_isrc',
      payload: {isrc},
    });
    const track = await axios.get(route!, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
    });
    console.log('🚀 ~ file: trx00SpotifyDependencies.ts:30 ~ track:', track);

    const id = track.data.tracks.items[0].id;

    const route2 = routes.traklist({
      method: 'get-genre',
      payload: {trakID: id},
    });
    const route3 = routes.spotify({
      method: 'audio-features',
      payload: {trakId: id},
    });

    const trx00SpotifyDependencies: any = await axios
      .all([
        axios.get(route2!, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
        }),
        axios.get(route3, {
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
            spotifyId: id,
          };
        }),
      )
      .catch(error => {
        console.log(error);
      });
    console.log(
      '🚀 ~ file: trx00SpotifyDependencies.ts:91 ~ trx00SpotifyDependencies:',
      trx00SpotifyDependencies,
    );

    return {
      audioFeatures: trx00SpotifyDependencies.audioFeatures,
      genres: trx00SpotifyDependencies.genres,
      isrc,
      spotifyId: id,
    };
  }

  const route = routes.traklist({method: 'get-genre', payload: {trakID: id}});
  const route1 = routes.spotify({
    method: 'audio-features',
    payload: {trakId: id},
  });
  console.log('🚀 ~ file: trx00SpotifyDependencies.ts:18 ~ route1:', route1);
  console.log('🚀 ~ file: trx00SpotifyDependencies.ts:13 ~ route:', route);

  const trx00SpotifyDependencies = await axios
    .all([
      axios.get(route!, {
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
    });

  return trx00SpotifyDependencies;
};
