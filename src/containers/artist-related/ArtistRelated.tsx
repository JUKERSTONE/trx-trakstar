import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {useArtistRelated} from './useArtistRelated';
import {ArtistRelated} from '../../elements';
import {useEffectAsync} from '../../app';
import {APIKeys, api, useAPI} from '../../api';

export const ArtistRelatedContainer = ({
  navigation,
  route,
  albums,
  ...props
}: any) => {
  const {...useArtistAlbumsProps} = useArtistRelated({
    navigation,
    route,
  });

  const [media, setMedia] = useState<any>(null);
  const {useGET} = useAPI();

  return <ArtistRelated {...useArtistAlbumsProps} {...props} />;
};
