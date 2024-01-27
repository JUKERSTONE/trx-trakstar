import React from 'react';
import {View, Text} from 'react-native';
import {useTape} from './useTape';
import {TapeElement} from '../../elements';

export const TapeContainer = ({navigation, route, ...props}: any) => {
  const {...useTapeProps} = useTape({navigation, route});
  return <TapeElement {...useTapeProps} {...props} />;
};
