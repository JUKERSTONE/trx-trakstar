import React from 'react';
import {View, Text} from 'react-native';
import {usePlaylist} from './usePlaylist';
import {PlaylistElement} from '../../elements';

export const PlaylistContainer = ({navigation, ...props}: any) => {
  const {...usePlaylistProps} = usePlaylist({navigation});
  return <PlaylistElement {...usePlaylistProps} {...props} />;
};
