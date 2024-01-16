import React from 'react';
import {View, Text} from 'react-native';
import {useArtist} from './useArtist';
import {ArtistView} from '../../elements';

export const ArtistContainer = ({item: artistData, navigation}: any) => {
  const {...useArtistProps} = useArtist({artistData, navigation});
  return (
    <ArtistView
      {...useArtistProps}
      artistData={artistData.artist}
      navigation={navigation}
    />
  );
};
