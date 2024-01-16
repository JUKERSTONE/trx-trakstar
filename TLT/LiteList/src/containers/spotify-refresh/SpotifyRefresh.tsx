import React from 'react';
import {View, Text} from 'react-native';
import {useSpotifyRefresh} from './useSpotifyRefresh';
import {SpotifyRefreshElement} from '../../elements';

export const SpotifyRefreshContainer = ({navigation}: any) => {
  const {...useSpotifyRefreshProps} = useSpotifyRefresh({
    navigation,
  });
  return <SpotifyRefreshElement {...useSpotifyRefreshProps} />;
};
