import {View, Text, Button} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {SwipeContainer} from '../containers';

export const SwipeScreen = ({...props}) => {
  return <SwipeContainer {...props} />;
};
