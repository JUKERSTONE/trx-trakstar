import React from 'react';
import {View, Text} from 'react-native';
import {Track} from '../../../7.elements/track/Track';
import {useTrack} from './useTrack';

interface TTrackView {
  navigation: any;
  route: any;
  track?: any;
}

export const TrackView: React.FC<TTrackView> = ({...props}) => {
  const {track} = props;
  console.log('🚀 ~ file: Track.tsx ~ line 14 ~ track', track);
  const {...useProps} = useTrack(track.id);
  return <Track {...props} track={track} {...useProps} />;
};
