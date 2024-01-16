import React from 'react';
import {View, Text} from 'react-native';
import {RegenElement} from '../../elements';
import {useRegen} from './useRegen';

export const RegenContainer = ({navigation, route, ...props}: any) => {
  const {...useRegenProps} = useRegen({navigation, route});
  return <RegenElement {...useRegenProps} {...props} />;
};
