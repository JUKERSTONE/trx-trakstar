import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {VerifyNFTContainer} from '../containers';
import {ScreenWrapper} from '../elements';

export const VerifyNFTScreen = ({...props}) => {
  return (
    <ScreenWrapper>
      <VerifyNFTContainer {...props} />
    </ScreenWrapper>
  );
};
