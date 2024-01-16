import React from 'react';
import {View, Text} from 'react-native';
import {LandingRecommendations} from '../../../7.elements/landing-recommendations/LandingRecommendations';
import {useLandingRecommendations} from './useLandingRecommendations';
import {useInvestment} from '../../../0.app';

interface TLandingRecommendationsView {
  navigation: any;
}

export const LandingRecommendationsView: React.FC<TLandingRecommendationsView> =
  ({navigation}) => {
    const {...useProps} = useLandingRecommendations({
      navigation,
    });
    const {...useInvestmentProps} = useInvestment({
      navigation,
    });
    return <LandingRecommendations {...useProps} {...useInvestmentProps} />;
  };
