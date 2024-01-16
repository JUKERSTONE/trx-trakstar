import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {
  SPOTIFY_GET_ARTIST,
  SPOTIFY_GET_TRACK,
  MUSIXMATCH_GET_LYRICS,
  SPOTIFY_GET_ALBUM,
  SPOTIFY_GET_ARTIST_TOP_TRACKS,
  SPOTIFY_GET_ARTIST_ALBUMS,
  SPOTIFY_GET_ARTIST_RELATED_ARTISTS,
} from '../../../1.api';
import {useProvider, store} from '../../../3.stores';
import * as actions from '../../../3.stores';

export const useInvestment = ({navigation}: any) => {
  const {state} = useContext(useProvider);

  const handleAlbumNavigation = (item: any) => {
    console.log(
      '🚀 ~ file: useInvestment.ts ~ line 15 ~ handleAlbumNavigation ~ item',
      item,
    );
    const albumId = item.id;
    const artistId = item.artists[0].id;

    axios
      .get(SPOTIFY_GET_ARTIST(artistId), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + state.keys.spotify.s_client_token,
        },
      })
      .then(response => {
        axios
          .get(SPOTIFY_GET_ALBUM(albumId), {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + state.keys.spotify.s_client_token,
            },
          })
          .then(response => {
            const albumData = response.data;
            const isTape = albumData.tracks.items.length > 1;
            switch (isTape) {
              case true:
                const tape = response.data;
                navigation.navigate('Investment', {
                  screen: 'Tape',
                  params: {
                    tape,
                  },
                });
                break;
              case false:
                const trackId = albumData.tracks.items[0].id;
                axios
                  .get(SPOTIFY_GET_TRACK(trackId), {
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization:
                        'Bearer ' + state.keys.spotify.s_client_token,
                    },
                  })
                  .then(response => {
                    console.log(response.data);

                    const isrc = response.data.external_ids.isrc;

                    axios.get(MUSIXMATCH_GET_LYRICS(isrc)).then(response2 => {
                      const lyrics_body = response2.data.message.body
                        ? response2?.data?.message?.body?.lyrics?.lyrics_body
                        : null;
                      const trackData = response.data;

                      const track = {
                        spotifyData: trackData,
                        lyrics: lyrics_body,
                      };
                      console.log(
                        '🚀 ~ file: useInvestment.ts ~ line 74 ~ axios.get ~ track',
                        track,
                      );

                      const modal = {
                        ...state.modal,
                        type: 'track_screen',
                        track_screen: {
                          active: true,
                          track,
                        },
                      };

                      store.dispatch(
                        actions.TOGGLE_FULL_SCREEN(
                          'toggle full screen.',
                          modal,
                        ),
                      );
                    });
                  });
                break;
            }
          });
      });
  };

  const handleTrackNavigation = (item: any) => {
    // console.log(
    //   '🚀 ~ file: useInvestment.ts ~ line 86 ~ handleTrackNavigation ~ state',
    //   state,
    // );

    const trackId = item.id;
    const artistId = item.artists[0].id;
    axios
      .get(SPOTIFY_GET_ARTIST(artistId), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + state.keys.spotify.s_client_token,
        },
      })
      .then(response => {
        axios
          .get(SPOTIFY_GET_TRACK(trackId), {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + state.keys.spotify.s_client_token,
            },
          })
          .then(response => {
            console.log(response.data);

            const isrc = response.data.external_ids.isrc;

            axios.get(MUSIXMATCH_GET_LYRICS(isrc)).then(response2 => {
              const lyrics_body = response2.data.message.body
                ? response2?.data?.message?.body?.lyrics?.lyrics_body
                : null;
              const trackData = response.data;

              const track = {
                spotifyData: trackData,
                lyrics: lyrics_body,
              };

              // navigation.navigate('TrackView', {track});

              const modal = {
                ...state.modal,
                type: 'track_screen',
                track_screen: {
                  active: true,
                  track,
                },
              };

              store.dispatch(
                actions.TOGGLE_FULL_SCREEN('toggle full screen.', modal),
              );
            });
          });
      });
  };

  const handleArtistNavigation = (item: any) => {
    const artistId = item.id;
    console.log(
      '🚀 ~ file: useInvestment.ts ~ line 124 ~ handleArtistNavigation ~ item',
      item,
    );
    axios
      .all([
        axios.get(SPOTIFY_GET_ARTIST(artistId), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.keys.spotify.s_client_token,
          },
        }),
        axios.get(SPOTIFY_GET_ARTIST_TOP_TRACKS(artistId), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.keys.spotify.access_token,
          },
        }),
        axios.get(SPOTIFY_GET_ARTIST_ALBUMS(artistId), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.keys.spotify.access_token,
          },
        }),
        axios.get(SPOTIFY_GET_ARTIST_RELATED_ARTISTS(artistId), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.keys.spotify.access_token,
          },
        }),
      ])
      .then(
        axios.spread((data1, data2, data3, data4) => {
          const artist = data1.data;
          const artistTopTracks = data2.data.tracks;
          const artistAlbums = data3.data.items;
          const artistRelated = data4.data.artists;

          const artistData = {
            artist: {
              id: artist.id,
              name: artist.name,
              followers: artist.followers,
              genres: artist.genres,
              images: artist.images,
              popularity: artist.popularity,
            },
            artist_top_tracks: artistTopTracks,
            artist_albums: artistAlbums,
            artist_related: artistRelated,
          };

          // navigation.navigate('ArtistView', {artistData});

          const modal = {
            ...state.modal,
            type: 'artist_screen',
            artist_screen: {
              active: true,
              artist: artistData,
            },
          };

          store.dispatch(
            actions.TOGGLE_FULL_SCREEN('toggle full screen.', modal),
          );

          // console.log(
          //   '🚀 ~ file: useProfile.ts ~ line 126 ~ axios.spread ~ artistData',
          //   artistData,
          // );
        }),
      )
      .catch(error => {
        alert('errors');
        // return {
        //   success: false,
        //   data: error,
        // };
      });
  };

  return {
    handleAlbumNavigation,
    handleTrackNavigation,
    handleArtistNavigation,
  };
};
