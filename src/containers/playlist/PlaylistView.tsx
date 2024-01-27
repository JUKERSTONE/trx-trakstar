import React from 'react';
import {View, Text} from 'react-native';
import {usePlaylist} from './usePlaylist';
import {PlaylistElement} from '../../elements';
import {PlaylistViewElement} from '../../elements/playlist/PlaylistView';

export const PlaylistViewContainer = ({navigation, ...props}: any) => {
  const {...usePlaylistProps} = usePlaylist({navigation});
  return <PlaylistViewElement {...usePlaylistProps} {...props} />;
};
