import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {useArtistAlbums} from './useArtistAlbums';
import {ArtistAlbums} from '../../elements';
import {useEffectAsync} from '../../app';
import {APIKeys, api, useAPI} from '../../api';

export const ArtistAlbumsContainer = ({
  navigation,
  route,
  albums,
  ...props
}: any) => {
  const {...useArtistAlbumsProps} = useArtistAlbums({
    navigation,
    route,
  });

  const [media, setMedia] = useState<any>(null);
  const {useGET} = useAPI();

  return <ArtistAlbums {...useArtistAlbumsProps} {...props} />;
};
