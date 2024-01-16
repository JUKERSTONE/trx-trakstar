import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {
  toggleTRAKRelationshipsView,
  store,
  handleMediaPlayerAction,
} from '../../stores';
import {useGenerate, handleGetColor} from '../../app';
import axios from 'axios';
import {useLITELISTState} from '../../app';
import {Alert} from 'react-native';

export const useArtist = ({artistData, navigation}: any) => {
  console.log(
    '🚀 ~ file: useArtist.ts ~ line 14 ~ useArtist ~ artistData, navigation',
    artistData,
    navigation,
  );
  const [colors, setColors] = useState();

  const artist = artistData.artist.artist;
  console.log('🚀 ~ file: useArtist.ts ~ line 16 ~ useArtist ~ artist', artist);

  useEffect(() => {
    handleColors();
  }, []);

  const handleColors = async () => {
    const url = artist.images[0].url;
    const colors = await handleGetColor(url);
    console.log(
      '🚀 ~ file: useArtist.ts ~ line 22 ~ handleColors ~ colors',
      colors,
    );
    setColors(colors);
  };

  const handleNavigateTRAK = (item: any) => {
    alert(2);
    console.log(
      '🚀 ~ file: useTape.ts ~ line 16 ~ handleNavigateTRAK ~ item',
      item,
    );
    Alert.alert(
      `${item.track.artists[0].name} - ${item.track.name}`,
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
            if (item.track.preview_url) {
              const action = handleMediaPlayerAction({
                playbackState: 'source',
                uri: item.track.preview_url,
                url: item.track.album.images[0].url,
                artist: item.track.artists[0].name,
                title: item.track.name,
                id: {
                  spotify: item.track.id,
                  apple_music: '',
                },
                isrc: item.external_ids.isrc,
              });
              store.dispatch(action);
            } else {
              alert(
                `Sorry. ${item.artists[0].name} didn't upload a preview for '${item.name}'`,
              );
            }
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
                  title: item.track.name,
                  artist: item.track.artists[0].name,
                },
              },
            });
          },
        },
      ],
    );
  };

  return {
    colors,
    handleNavigateTRAK,
  };
};
