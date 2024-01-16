import React from 'react';
import {View, Text} from 'react-native';
import {ConnectElement} from '../../elements';
import {useOnboardIsland} from './useOnboardIsland';
import {OnboardIslandElement} from '../../elements/onboard-island';

export const OnboardIslandContainer = ({navigation, ...props}: any) => {
  const {...useOnboardIslandProps} = useOnboardIsland({navigation});
  return <OnboardIslandElement {...useOnboardIslandProps} {...props} />;
};
