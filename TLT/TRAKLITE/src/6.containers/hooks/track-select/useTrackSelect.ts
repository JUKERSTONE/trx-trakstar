import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {
  SPOTIFY_NEW_RELEASES,
  SPOTIFY_GET_ALBUM,
  SPOTIFY_GET_ARTIST,
  SPOTIFY_GET_TRACK,
  MUSIXMATCH_GET_LYRICS,
} from '../../../1.api';
import {useProvider} from '../../../3.stores';

export const useTrackSelect = ({navigation}: any) => {
  const {state} = useContext(useProvider);
  const [releases, setReleases] = useState();
  useEffect(() => {
    handleGetNewReleases();
  }, []);

  const handleTrackPress = (item: any, image: any) => {
    const id = {
      track: item.id,
      artist: item.artists[0].id,
    };

    const numOfTracks = item.total_tracks;

    axios
      .get(SPOTIFY_GET_ALBUM(id.track), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + state.keys.spotify.s_client_token,
        },
      })
      .then(response => {
        if (numOfTracks > 1) {
          const tape = response.data;
          // navigation.navigate('TapeView', {tape});
          navigation.navigate('Investment', {
            screen: 'Tape',
            params: {
              tape,
            },
          });
        } else if (numOfTracks === 1) {
          const items = response.data.tracks.items;
          const track_id = items[0].id;
          const artist_id = response.data.artists[0].id;

          // alert(track_id);

          axios
            .get(SPOTIFY_GET_ARTIST(artist_id), {
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + state.keys.spotify.s_client_token,
              },
            })
            .then(response => {
              axios
                .get(SPOTIFY_GET_TRACK(track_id), {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization:
                      'Bearer ' + state.keys.spotify.s_client_token,
                  },
                })
                .then(response2 => {
                  const images = response.data.images;

                  const isrc = response2.data.external_ids.isrc;

                  axios
                    .get(MUSIXMATCH_GET_LYRICS(isrc))
                    .then(response3 => {
                      // console.log(res.data, 'poi');
                      //   console.log(
                      //     response2.data.message.body.lyrics.lyrics_body,
                      //     response.data,
                      //   );
                      const lyrics_body = response3.data.message.body
                        ? response3.data.message.body.lyrics?.lyrics_body
                        : null;
                      const track = {
                        ...response2.data,
                        lyrics: lyrics_body,
                        artistImage: images,
                      };

                      navigation.navigate('TrackView', {track});
                    })
                    .catch(err => {
                      alert('Premium Content Only! Gain XP by using this app!');
                    });
                });
            })
            .catch(error => {
              console.error(error, 'sumn went wrong');
              alert('not navailable');
            });
        }
      });
  };

  const handleGetNewReleases = () => {
    axios
      .get(SPOTIFY_NEW_RELEASES, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + state.keys.spotify.s_client_token,
        },
      })
      .then(response => {
        setReleases(response.data.albums.items);
      })
      .catch(err => {
        console.log('lemme knoiw');
      });
  };

  return {
    releases,
    handleTrackPress,
  };
};
