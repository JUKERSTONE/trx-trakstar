import React from 'react';
import {View, Text} from 'react-native';
import {useSwipe} from './useSwipe';
import {SwipeElement} from '../../elements';

export const SwipeContainer = ({navigation, route, ...props}: any) => {
  const {...useSwipeProps} = useSwipe({navigation, route});
  return <SwipeElement {...useSwipeProps} {...props} />;
};
