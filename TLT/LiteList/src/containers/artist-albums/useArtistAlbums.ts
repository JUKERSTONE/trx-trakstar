import React, {useEffect, useState, useContext} from 'react';
import {APIKeys, api, useAPI} from '../../api';
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

export const useArtistAlbums = ({navigation, route}: any) => {
  console.log(
    '🚀 ~ file: useArtistTopTracks.ts ~ line 12 ~ useArtistTopTracks ~ navigation',
    navigation,
  );

  const {handleGetState} = useLITELISTState();
  const {useGET} = useAPI();
  const keys = handleGetState({index: 'keys'});

  const spotify = keys.spotify;
  const accessToken = spotify.appToken;

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

  const handleTapeNavigation = async (albumData: any) => {
    const route = api.spotify({
      method: 'get-album',
      payload: {albumId: albumData.id},
    });
    const response: any = await useGET({route, token: accessToken});
    console.log(
      '🚀 ~ file: useArtistAlbums.ts:103 ~ handleTapeNavigation ~ response:',
      response,
    );
    navigation.navigate('MODAL', {
      type: 'tape',
      exchange: {
        active: true,
        item: response.data,
      },
    });
  };

  return {
    handleTRAKNavigation,
    handleTapeNavigation,
  };
};
