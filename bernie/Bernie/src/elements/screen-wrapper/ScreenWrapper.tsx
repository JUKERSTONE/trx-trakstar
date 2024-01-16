import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';

export const ScreenWrapper = ({children}: any) => {
  return <View style={styles.screen}>{children}</View>;
};
