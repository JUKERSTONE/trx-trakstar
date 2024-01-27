import React from 'react';
import {View, Text} from 'react-native';
import {LandingTrending} from '../../elements';
import {useLandingTrakListWeek} from './useLandingTrakListWeek';

export const LandingTrakListWeekView = () => {
  const {...useProps} = useLandingTrakListWeek();
  return <LandingTrending {...useProps} />;
};
