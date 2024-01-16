import React from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {PayWallContainer} from '../containers';

export const PaywallScreen = ({...props}) => {
  return <PayWallContainer {...props} />;
};
