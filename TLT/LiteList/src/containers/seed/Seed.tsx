import React from 'react';
import {View, Text} from 'react-native';
import {SeedElement} from '../../elements';
import {useSeed} from './useSeed';
import {useSelector} from 'react-redux';

export const SeedContainer = ({navigation, route, ...props}: any) => {
  const {...useSeedProps} = useSeed({navigation, route});
  return <SeedElement {...useSeedProps} {...props} />;
};
