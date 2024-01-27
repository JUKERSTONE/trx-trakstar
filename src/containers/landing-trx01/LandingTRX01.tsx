import React from 'react';
import {View, Text} from 'react-native';
import {LandingTRX01Element} from '../../elements';
import {useLandingTRX01} from './useLandingTRX01';

export const LandingTRX01Container = ({navigation, route, ...props}: any) => {
  const {...useLandingTRX01Props} = useLandingTRX01({navigation, route});
  return <LandingTRX01Element {...useLandingTRX01Props} {...props} />;
};
