import React from 'react';
import {View, Text} from 'react-native';
import {LandingRecommendations} from '../../elements';
import {useLandingRecommendations} from './useLandingRecommendations';
// import {useInvestment} from '../../../app';

interface TLandingRecommendationsView {
  navigation: any;
}

export const LandingRecommendationsView: React.FC<
  TLandingRecommendationsView
> = ({navigation}) => {
  console.log(
    '🚀 ~ file: LandingRecommendations.tsx ~ line 14 ~ navigation',
    navigation,
  );
  const {...useProps} = useLandingRecommendations({
    navigation,
  });
  return <LandingRecommendations {...useProps} />;
};
