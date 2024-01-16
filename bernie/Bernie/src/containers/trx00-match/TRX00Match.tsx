import React from 'react';
import {View, Text} from 'react-native';
import {TRX00MatchElement} from '../../elements';
import {useTRX00Match} from './useTRX00Match';

export const TRX00MatchContainer = ({navigation, route, ...props}: any) => {
  const {...useTRX00MatchProps} = useTRX00Match({navigation, route});
  return <TRX00MatchElement {...useTRX00MatchProps} {...props} />;
};
