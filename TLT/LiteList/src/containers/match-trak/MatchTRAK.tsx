import React from 'react';
import {View, Text} from 'react-native';
import {useMatchTRAK} from './useMatchTRAK';
import {MatchTRAKElement} from '../../elements';

export const TapeContainer = ({navigation, route, ...props}: any) => {
  const {...useTapeProps} = useMatchTRAK({navigation, route});
  return <MatchTRAKElement {...useTapeProps} {...props} />;
};
