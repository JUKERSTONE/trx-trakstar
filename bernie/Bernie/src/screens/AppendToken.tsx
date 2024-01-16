import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {SetTokenContainer} from '../containers';
import {ScreenWrapper} from '../elements';

export const AppendTokenScreen = () => {
  const {width, height} = Dimensions.get('window');
  return (
    <ScreenWrapper>
      <SetTokenContainer />
    </ScreenWrapper>
  );
};
