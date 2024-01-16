import React from 'react';
import {View, Text} from 'react-native';
import {LandingTrending} from '../../elements';
import {useLandingTrending} from './useLandingTrending';

export const LandingTrendingView = () => {
  const {...useProps} = useLandingTrending();
  return <LandingTrending {...useProps} />;
};
