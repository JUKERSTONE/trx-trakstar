import React from 'react';
import {View, Text} from 'react-native';
import {LandingTRX02Element} from '../../elements';
import {useLandingTRX02} from './useLandingTRX02';

export const LandingTRX02Container = ({navigation, route, ...props}: any) => {
  const {...useLandingTRX02Props} = useLandingTRX02({navigation, route});
  return <LandingTRX02Element {...useLandingTRX02Props} {...props} />;
};
