import React from 'react';
import {View, Text} from 'react-native';
import {TrackCard} from '../../../7.elements/track-card/TrackCard';
import {useTrackCard} from './useTrackCard';
import {useInvestment} from '../../../0.app';

interface TTrackCardView {
  index: number;
  track: any;
  images: any;
  colors: any;
  navigation: any;
}

export const TrackCardView: React.FC<TTrackCardView> = ({...props}) => {
  const {handleTrackPress} = useTrackCard(props.navigation);
  const {...useInvestmentProps} = useInvestment(props);
  return <TrackCard {...props} {...useInvestmentProps} />;
};
