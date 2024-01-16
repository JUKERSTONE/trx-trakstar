import React from 'react';
import {View, Text} from 'react-native';
import {LandingTrending} from '../../../7.elements/landing-trending';
import {useLandingTrending} from './useLandingTrending';

export const LandingTrendingView = () => {
  const {...useProps} = useLandingTrending();
  return <LandingTrending {...useProps} />;
};
