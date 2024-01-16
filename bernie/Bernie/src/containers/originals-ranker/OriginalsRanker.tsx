import React from 'react';
import {View, Text} from 'react-native';
import {OriginalsRankerElement} from '../../elements';
import {useOriginalsRanker} from './useOriginalsRanker';

export const OriginalsRankerContainer = ({
  navigation,
  route,
  ...props
}: any) => {
  const {...useOriginalsRankerProps} = useOriginalsRanker({navigation, route});
  return <OriginalsRankerElement {...useOriginalsRankerProps} {...props} />;
};
