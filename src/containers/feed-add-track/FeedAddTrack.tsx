import React from 'react';
import {View, Text} from 'react-native';
import {FeedAddTrackElement} from '../../elements';
import {useFeedAddTrack} from './useFeedAddTrack';

export const FeedAddTrackContainer = ({navigation, route, ...props}: any) => {
  const {...useFeedAddTrackProps} = useFeedAddTrack({navigation, route});
  return <FeedAddTrackElement {...useFeedAddTrackProps} {...props} />;
};
