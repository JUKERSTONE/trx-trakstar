import React from 'react';
import {View, Text} from 'react-native';
import {FindElement} from '../../elements';
import {useFind} from './useFind';

export const FindContainer = ({navigation, route, ...props}: any) => {
  const {...useFindProps} = useFind({navigation, route});
  return <FindElement {...useFindProps} {...props} />;
};
