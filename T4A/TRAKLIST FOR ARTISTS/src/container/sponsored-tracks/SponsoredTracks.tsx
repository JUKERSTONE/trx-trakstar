import React from 'react';
import {View, Text} from 'react-native';
import {SponsoredTracksElement} from '../../elements';
import {useSponsoredTracks} from './useSponsoredTracks';

export const SponsoredTracksContainer = ({...props}: any) => {
  const {...useSponsoredTracksProps} = useSponsoredTracks(props);
  return <SponsoredTracksElement {...useSponsoredTracksProps} {...props} />;
};
