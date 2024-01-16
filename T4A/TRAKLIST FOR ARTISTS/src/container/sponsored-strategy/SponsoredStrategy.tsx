import React from 'react';
import {View, Text} from 'react-native';
import {SponsoredStrategyElement} from '../../elements';
import {useSponsoredStrategy} from './useSponsoredStrategy';

export const SponsoredStrategyContainer = (props: any) => {
  console.log(
    '🚀 ~ file: SponsoredStrategy.tsx:7 ~ SponsoredStrategyContainer ~ props:',
    props,
  );
  const {...useSponsoredStrategyProps} = useSponsoredStrategy(props);
  return <SponsoredStrategyElement {...useSponsoredStrategyProps} {...props} />;
};
