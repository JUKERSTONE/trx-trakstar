import React from 'react';
import {View, Text} from 'react-native';
import {useLandingPlaylists} from './useLandingPlaylists';
import {LandingPlaylists} from '../../elements/landing-playlists';
// import {useInvestment} from '../../../0.app';

interface LandingPlaylistsProps {
  navigation: any;
}

export const LandingPlaylistsContainer: React.FC<LandingPlaylistsProps> = ({
  navigation,
}) => {
  const {...useLandingPlaylistsProps} = useLandingPlaylists({navigation});
  return <LandingPlaylists {...useLandingPlaylistsProps} />;
};
