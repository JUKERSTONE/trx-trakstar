import React from 'react';
import {View, Text} from 'react-native';
import {LandingNewRelease} from '../../elements';
import {useLandingNewRelease} from './useLandingNewRelease';
// import {useInvestment} from '../../../0.app';

interface TLandingNewReleaseView {
  navigation: any;
}

export const LandingNewReleaseView: React.FC<TLandingNewReleaseView> = ({
  navigation,
}) => {
  const {...useProps} = useLandingNewRelease({navigation});
  return <LandingNewRelease {...useProps} />;
};
