import React from 'react';
import {View, Text} from 'react-native';
import {useTRXDistribution} from './useTRXDistribution';
import {TRXDistributionElement} from '../../elements';

export const TRXDistributionContainer = ({navigation, ...props}: any) => {
  const {...useTRXDistributionProps} = useTRXDistribution({navigation});
  return <TRXDistributionElement {...useTRXDistributionProps} />;
};
