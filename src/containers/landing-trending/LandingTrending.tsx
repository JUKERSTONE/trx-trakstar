import React from 'react';
import {View, Text} from 'react-native';
import {LandingTrendingElement} from '../../elements';
import {useLandingTrending} from './useLandingTrending';

export const LandingTrendingContainer = ({
  navigation,
  route,
  ...props
}: any) => {
  const {...useLandingTRX02Props} = useLandingTrending({navigation, route});
  return <LandingTrendingElement {...useLandingTRX02Props} {...props} />;
};
