import React from 'react';
import {View, Text} from 'react-native';
import {PortfolioElement} from '../../elements';
import {usePortfolio} from './usePortfolio';

export const PortfolioContainer = ({navigation, ...props}: any) => {
  const {...usePortfolioProps} = usePortfolio({navigation});
  return <PortfolioElement {...usePortfolioProps} {...props} />;
};
