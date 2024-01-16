import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {NFTRequestsContainer} from '../containers';
import {ScreenWrapper} from '../elements';

export const NFTRequestsScreen = ({...props}) => {
  return (
    <ScreenWrapper>
      <NFTRequestsContainer {...props} />
    </ScreenWrapper>
  );
};
