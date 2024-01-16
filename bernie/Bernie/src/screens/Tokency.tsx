import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {TokencyContainer} from '../containers';
import {ScreenWrapper} from '../elements';

export const TokencyScreen = ({...props}) => {
  return (
    <ScreenWrapper>
      <TokencyContainer {...props} />
    </ScreenWrapper>
  );
};
