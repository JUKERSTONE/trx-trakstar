import React from 'react';
import {View, Text} from 'react-native';
import {InstructionsElement} from '../../elements';
import {useInstructions} from './useInstructions';

export const InstructionsContainer = ({navigation, route, ...props}: any) => {
  const {...useInstructionsProps} = useInstructions({navigation, route});
  return <InstructionsElement {...useInstructionsProps} {...props} />;
};
