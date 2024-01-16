import React from 'react';
import {View, Text} from 'react-native';
import {LandingListenAgainElement} from '../../elements';
import {useLandingListenAgain} from './useLandingListenAgain';

export const LandingListenAgainContainer = ({
  navigation,
  route,
  ...props
}: any) => {
  const {...useLandingTRX02Props} = useLandingListenAgain({navigation, route});
  return <LandingListenAgainElement {...useLandingTRX02Props} {...props} />;
};
