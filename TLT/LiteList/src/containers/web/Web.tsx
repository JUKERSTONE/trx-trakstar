import React from 'react';
import {View, Text} from 'react-native';
import {WebElement} from '../../elements';
import {useWeb} from './useWeb';

export const WebContainer = ({navigation, ...props}: any) => {
  const {...useWebProps} = useWeb({navigation});
  return <WebElement {...useWebProps} {...props} />;
};
