import React, {useState, useContext} from 'react';
import {useProvider} from '../../../3.stores';
import axios from 'axios';
import {
  SPOTIFY_NEW_RELEASES,
  SPOTIFY_GET_ALBUM,
  SPOTIFY_GET_TRACK,
  MUSIXMATCH_GET_LYRICS,
  SPOTIFY_GET_ARTIST,
  SPOTIFY_PLAYLIST_ITEMS,
  SPOTIFY_GET_ARTIST_TOP_TRACKS,
  SPOTIFY_GET_ARTIST_ALBUMS,
  SPOTIFY_GET_ARTIST_RELATED_ARTISTS,
} from '../../../1.api';

export const useProfile = ({navigation}: any) => {
  const {state} = useContext(useProvider);
  const [tab, setTab] = useState('playlists');
  const {playlists, top_tracks, top_artists} = state.user_data.services.spotify;
  // const {audio_features} = state.user_data.gamification;
  const tracks = top_tracks;
  const artists = top_artists;
  // const audioFeatures = audio_features;
  const {posts} = state.user_data;

  const handleTabChange = (tab: string) => {
    setTab(tab);
  };

  const handleView = (select: any, type: string) => {
    switch (type) {
      case 'tracks':
        axios
          .get(SPOTIFY_GET_ARTIST(select.id.artist), {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + state.keys.spotify.s_client_token,
            },
          })
          .then(response => {
            axios
              .get(SPOTIFY_GET_TRACK(select.id.track), {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + state.keys.spotify.s_client_token,
                },
              })
              .then(response2 => {
                const images = response.data.images;

                const isrc = response2.data.external_ids.isrc;

                axios
                  .get(MUSIXMATCH_GET_LYRICS(isrc))
                  .then(response3 => {
                    const lyrics_body = response3.data.message.body
                      ? response3.data.message.body.lyrics?.lyrics_body
                      : null;
                    const track = {
                      ...response2.data,
                      lyrics: lyrics_body,
                      artistImage: images,
                    };
                    console.log(navigation, 'poiil');
                    navigation.navigate('TrackView', {track});
                  })
                  .catch(err => {
                    console.log(err);
                    alert('hi');
                  });
              })
              .catch(err => {});
          })
          .catch(error => {
            console.error(error, 'sumn went wrong');
          });
        break;
      case 'artists':
        return axios
          .all([
            axios.get(SPOTIFY_GET_ARTIST(select.id.artist), {
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + state.keys.spotify.s_client_token,
              },
            }),
            axios.get(SPOTIFY_GET_ARTIST_TOP_TRACKS(select.id.artist), {
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + state.keys.spotify.access_token,
              },
            }),
            axios.get(SPOTIFY_GET_ARTIST_ALBUMS(select.id.artist), {
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + state.keys.spotify.access_token,
              },
            }),
            axios.get(SPOTIFY_GET_ARTIST_RELATED_ARTISTS(select.id.artist), {
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

              navigation.navigate('ArtistView', {artistData});

              console.log(
                '🚀 ~ file: useProfile.ts ~ line 126 ~ axios.spread ~ artistData',
                artistData,
              );
            }),
          )
          .catch(error => {
            alert('errors');
            // return {
            //   success: false,
            //   data: error,
            // };
          });

        break;
      case 'playlists':
        // SPOTIFY_PLAYLIST_ITEMS
        axios
          .get(SPOTIFY_PLAYLIST_ITEMS(select.id.playlist), {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + state.keys.spotify.s_client_token,
            },
          })
          .then(response => {
            console.log(response.data, 'oiuy');
            const items = {
              tracks: [...response.data.items],
              images: select.images,
            };
            console.log(
              '🚀 ~ file: useProfile.ts ~ line 89 ~ handleView ~ items',
              items,
            );
            // navigation.navigate('TapeView', {tape: items});
            navigation.navigate('Investment', {
              screen: 'Tape',
              params: {
                tape: items,
              },
            });
          });
        break;
      // case 'posts':
      //   data = posts ? posts : null;
      //   break;
      // default:
      //   data = tracks ? tracks : null;
    }
  };

  const handleNavigateArtist = (id: string) => {
    alert(id);
    axios.get(SPOTIFY_GET_ARTIST(id)).then(response => {
      console.log(response.data, 'poi');

      // navigation.navigate('TrackView', {track});
    });
  };

  return {
    tab,
    handleTabChange,
    posts,
    tracks,
    artists,
    playlists,
    // audioFeatures,
    handleView,
    handleNavigateArtist,
  };
};
