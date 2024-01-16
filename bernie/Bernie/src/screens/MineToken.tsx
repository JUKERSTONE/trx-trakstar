import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {MineTokenContainer} from '../containers';
import {ScreenWrapper} from '../elements';

export const MineTokenScreen = ({...props}) => {
  const {width, height} = Dimensions.get('window');
  return (
    <ScreenWrapper>
      <MineTokenContainer {...props} />
    </ScreenWrapper>
  );
};
