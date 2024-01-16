import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useSwipeStack} from './useSwipeStack';
import Swiper from '../../../7.elements/stack';

export const SwipeStackView = ({...props}) => {
  const {...useProps} = useSwipeStack(props);
  return <Swiper {...props} {...useProps} />;
};
