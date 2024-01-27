import React from 'react';
import {View, Text} from 'react-native';
import {LandingFeatures} from '../../elements';
import {useLandingFeatures} from './useLandingFeatures';

export const LandingFeaturesView = ({...props}) => {
  const {...featuresProps} = useLandingFeatures({...props});
  return <LandingFeatures {...featuresProps} />;
};
