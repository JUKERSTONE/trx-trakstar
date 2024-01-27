import React from 'react';
import {View, Text} from 'react-native';
import {BeRealElement} from '../../elements';
import {useBeReal} from './useBeReal';

export const BeRealContainer = ({navigation, route, ...props}: any) => {
  const {...useBeRealProps} = useBeReal({navigation, route});
  return <BeRealElement {...useBeRealProps} {...props} />;
};
