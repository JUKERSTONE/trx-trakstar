import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {TrackSelect} from '../../../7.elements/track-select/TrackSelect';
import {useTrackSelect} from './useTrackSelect';
import {useInvestment} from '../../../0.app';

export const TrackSelectView = ({...props}) => {
  const {...useProps} = useTrackSelect(props.navigation);
  const {...useInvestmentProps} = useInvestment(props);
  return <TrackSelect {...useProps} {...useInvestmentProps} />;
};
