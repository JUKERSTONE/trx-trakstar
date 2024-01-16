import React, {useEffect, useState, useContext} from 'react';
import {
  APIKeys,
  SPOTIFY_GET_ARTIST,
  SPOTIFY_GET_ARTIST_ALBUMS,
  SPOTIFY_GET_ARTIST_RELATED_ARTISTS,
  SPOTIFY_GET_ARTIST_TOP_TRACKS,
  api,
  useAPI,
} from '../../api';
import {
  toggleTRAKRelationshipsView,
  store,
  handleMediaPlayerAction,
} from '../../stores';
import {
  useGenerate,
  useFirebase,
  useLITELISTState,
  useEffectAsync,
} from '../../app';
import {Alert} from 'react-native';
import axios from 'axios';

export const useArtistRelated = ({navigation, route}: any) => {
  console.log(
    '🚀 ~ file: useArtistTopTracks.ts ~ line 12 ~ useArtistTopTracks ~ navigation',
    navigation,
  );

  const {handleGetState} = useLITELISTState();
  const {useGET} = useAPI();
  const keys = handleGetState({index: 'keys'});

  const spotify = keys.spotify;
  const accessToken = spotify.accessToken;

  // const profile = handleGetState({index: 'profile'});
  // const TRXProfile = profile.TRX;
  // const userId = TRXProfile.id;
  // const trakName = TRXProfile.trak_name;

  // console.log('🚀 ~ file: useChat.ts ~ line 11 ~ useChat ~ route', route);
  // const {handleRetrieveChat, handleSubmitChat, handleRetrieveUser} =
  //   useFirebase();
  // const [chat, setChat] = useState<any>();
  // const [chatHistory, setChatHistory] = useState<any>();

  const handleTRAKNavigation = (item: any) => {
    console.log(
      '🚀 ~ file: useLandingRecommendations.ts ~ line 72 ~ handleTRAKNavigation ~ item',
      item,
    );
    Alert.alert(
      `${item.artists[0].name} - ${item.name}`,
      `What would you like to do?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Preview',
          onPress: async () => {
            if (item.preview_url) {
              const action = handleMediaPlayerAction({
                playbackState: 'source',
                uri: item.preview_url,
                url: item.album.images[0].url,
                artist: item.artists[0].name,
                title: item.name,
                id: {
                  spotify: item.id,
                  apple_music: '',
                },
                isrc: item.external_ids.isrc,
              });
              store.dispatch(action);
            } else
              alert(
                `Sorry. ${item.artists[0].name} didn't upload a preview for '${item.name}'`,
              );
          },
        },
        {
          text: 'Find',
          onPress: async () => {
            navigation.navigate('MODAL', {
              type: 'match-trak',
              exchange: {
                active: true,
                item: {
                  title: item.name,
                  artist: item.artists[0].name,
                },
              },
            });
          },
        },
      ],
    );
  };

  const handleArtistNavigation = async (artist: any) => {
    return axios
      .all([
        axios.get(SPOTIFY_GET_ARTIST(artist.id), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
        }),
        axios.get(SPOTIFY_GET_ARTIST_TOP_TRACKS(artist.id), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
        }),
        axios.get(SPOTIFY_GET_ARTIST_ALBUMS(artist.id), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
        }),
        axios.get(SPOTIFY_GET_ARTIST_RELATED_ARTISTS(artist.id), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
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

          console.log(
            '🚀 ~ file: useProfile.ts ~ line 126 ~ axios.spread ~ artistData',
            artistData,
          );

          setTimeout(() => {
            // setLoadingArtist(false);
            navigation.navigate('MODAL', {
              type: 'artist-view',
              exchange: {
                active: true,
                item: {
                  artist: artistData,
                },
              },
            });
          }, 800);
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
    handleTRAKNavigation,
    handleArtistNavigation,
  };
};
